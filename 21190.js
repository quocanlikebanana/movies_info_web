const { fsPromise } = require('./src/config/lib');

const skipOptions = ['settings', '_locals', 'cache'];
const env = require('./src/config/env');
const IM = env.individual_mark || "21190";

function VarReplace(content, options) {
    for (const key in options) {
        if (Object.hasOwnProperty.call(options, key)) {
            const value = options[key];
            content = content.replace(
                new RegExp(String.raw`${IM}{${key}}`, 'g'),
                value
            );
        }
    }
}

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

        VarReplace(content, engineOptions);
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
