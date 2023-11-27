const { fsPromise } = require('./src/config/lib');

const skipOptions = ['settings', '_locals', 'cache'];
const env = require('./src/config/env');
const IM = env.individual_mark || "21190";

function ReplaceScanner(content, options, replacer) {
    let res = content;
    for (const key in options) {
        if (Object.hasOwnProperty.call(options, key)) {
            const value = options[key];
            res = replacer(content, key, value);
        }
    }
    return res;
}

function VarReplace(content, key, value) {
    const regex = new RegExp(String.raw`${IM}{\s*${key}\s*}`, 'g');
    const res = content.replace(regex, value);
    return res;
}

// Expressions: if (if - else), for (for - /for)

class IfExpr {
    constructor(type, expr, ifStart) {
        this.type = type;
        this.expr = expr;
        this.ifStart = ifStart;
        this.ifEnd = -1;
        this.elseStart = -1;
        this.elseEnd = -1;
    }
    evalExpr(content, options) {
        if (options[this.expr] === true) {
            const start = content.slice(0, this.elseStart);
            const end = content.slice(this.elseEnd, content.length - 1);
            return start.concat(end);
        } else {
            const start = content.slice(0, this.ifStart);
            const end = content.slice(this.ifEnd, content.length - 1);
            return start.concat(end);
        }
    }
}

class ForExpr {
    constructor(type, expr, forStart) {
        this.type = type;
        this.expr = expr;
        this.forStart = forStart;
        this.forEnd = -1;
    }
    evalExpr(content, options) {
        const words = this.expr.trim().split(" ");
        const key = words[words.length - 1];
        const arr = options[key];
        const start = content.slice(0, this.forStart);
        const end = content.slice(this.forEnd, content.length - 1);
        const buffer = content.substring(this.forStart, this.forEnd);
        arr.forEach(element => {
            buffer += buffer;
        });
        return start.concat(buffer).concat(end);
    }
}

const exprhandler = (() => {
    const stack = [];
    let content = "";
    let options = {};
    function push(expr) {
        stack.push(expr);
    };
    function top() {
        return stack[stack.length - 1];
    };
    function evaluateTop() {
        content = top().evalExpr(content, options);
    };

    return {
        getContent() {
            return content;
        },
        getStack() {
            return stack;
        },
        init(inputContent, engineOptions) {
            content = inputContent;
            options = engineOptions
        },
        read() {
            let buffer = content;
            let startOffset = 0;
            const startExprReg = new RegExp(String.raw`(${IM}{\s*(if|for)\s+.*?}|{(.*?)})`, 'g');

            while (true) {
                // Cut off till met the expr
                // When just meet the start expr
                const pos = buffer.search(startExprReg);
                if (pos === -1) {
                    break;
                }
                startOffset += pos;
                buffer = content.slice(startOffset, content.length - 1);

                const rawReg = buffer.match(startExprReg)[0];

                // Remove the tag, and no add
                content = content.replace(rawReg, '');
                buffer = buffer.replace(rawReg, '');

                const startNextContent = startOffset;

                if (/\/for/g.test(rawReg) === true) {
                    top().forEnd = startNextContent;
                    evaluateTop();
                } else if (/for/g.test(rawReg) === true) {
                    const sE = /^21190{\s*for\s+/g;
                    const eE = /\s*}$/g;
                    const expr = rawReg.replace(sE, '').replace(eE, '');
                    push(new ForExpr('for', expr, startNextContent));
                } else if (/\/if/g.test(rawReg) === true) {
                    top().elseEnd = startNextContent;
                    evaluateTop();
                } else if (/if/g.test(rawReg) === true) {
                    const sE = /^21190{\s*if\s+/g;
                    const eE = /\s*}$/g;
                    const expr = rawReg.replace(sE, '').replace(eE, '');
                    push(new IfExpr('for', expr, startNextContent));
                } else if (/else/g.test(rawReg) === true) {
                    top().ifEnd = startNextContent;
                    top().elseStart = startNextContent;
                }
            }
        },
    };
})();


module.exports = {
    engineFunction: async function (path, options, callback) {
        const fileContent = await fsPromise.readFile(path, { encoding: 'utf-8' });
        let content = fileContent;
        const engineOptions = {};
        for (const key in options) {
            if (Object.hasOwnProperty.call(options, key) && (!skipOptions.includes(key))) {
                const value = options[key];
                engineOptions[key] = value;
            }
        }

        // === Var:

        content = ReplaceScanner(content, engineOptions, VarReplace);

        // === Expr:

        exprhandler.init(content, engineOptions);
        exprhandler.read();
        content = exprhandler.getContent();

        return callback(null, content);

        // let vars = {};
        // let ifs = {};
        // if (engineOptions != null && isEmpty(engineOptions) === false) {
        //     ifs = engineOptions['ifs'] || {};
        //     vars = engineOptions['vars'] || {};
        // }
        // // If handle:
        // for (const key in ifs) {
        //     if (ifs.hasOwnProperty.call(ifs, key)) {
        //         const value = ifs[key];
        //         if (value === true) {
        //             // Remove if flag
        //             content = content.replace(
        //                 new RegExp(String.raw`({{#if-s-${key}}}|{{#if-e-${key}}})`, 'g'),
        //                 ``
        //             );
        //             // Delete the else part
        //             content = content.replace(
        //                 new RegExp(String.raw`{{#else-s-${key}}}([\s\S]*?){{#else-e-${key}}}`, 'g'),
        //                 ``
        //             );
        //         } else {
        //             // Remove else flag
        //             content = content.replace(
        //                 new RegExp(String.raw`({{#else-s-${key}}}|{{#else-e-${key}}})`, 'g'),
        //                 ``
        //             );
        //             // Delete the if part
        //             content = content.replace(
        //                 new RegExp(String.raw`{{#if-s-${key}}}([\s\S]*?){{#if-e-${key}}}`, 'g'),
        //                 ``
        //             );
        //         }
        //     }
        // }
        // // Variables handle
        // for (const key in vars) {
        //     if (vars.hasOwnProperty.call(vars, key)) {
        //         const value = vars[key];
        //         content = content.replace(
        //             new RegExp(String.raw`{{${key}}}`, 'g'),
        //             value
        //         );
        //     }
        // }
        // return callback(null, content);
    }
};

function isEmpty(obj) {
    return Object.keys(obj).length === 0;
}
