const { fsPromise } = require('../../config/libs');

module.exports = {
    ext: 'html',
    fn: async function (path, options, callback) {
        const fileContent = await fsPromise.readFile(path, { encoding: 'utf-8' });
        let content = fileContent;
        let engineOptions = options['options'];
        // Self made syntax
        let ifs = {};
        let vars = {};
        if (engineOptions != null && isEmpty(engineOptions) === false) {
            ifs = engineOptions['ifs'] || {};
            vars = engineOptions['vars'] || {};
        }
        // If handle:
        for (const key in ifs) {
            if (ifs.hasOwnProperty.call(ifs, key)) {
                const value = ifs[key];
                if (value === true) {
                    // Remove if flag
                    content = content.replace(
                        new RegExp(String.raw`({{#if-s-${key}}}|{{#if-e-${key}}})`, 'g'),
                        ``
                    );
                    // Delete the else part
                    content = content.replace(
                        new RegExp(String.raw`{{#else-s-${key}}}([\s\S]*?){{#else-e-${key}}}`, 'g'),
                        ``
                    );
                } else {
                    // Remove else flag
                    content = content.replace(
                        new RegExp(String.raw`({{#else-s-${key}}}|{{#else-e-${key}}})`, 'g'),
                        ``
                    );
                    // Delete the if part
                    content = content.replace(
                        new RegExp(String.raw`{{#if-s-${key}}}([\s\S]*?){{#if-e-${key}}}`, 'g'),
                        ``
                    );
                }
            }
        }
        // Variables handle
        for (const key in vars) {
            if (vars.hasOwnProperty.call(vars, key)) {
                const value = vars[key];
                content = content.replace(
                    new RegExp(String.raw`{{${key}}}`, 'g'),
                    value
                );
            }
        }
        return callback(null, content);
    }
};

function isEmpty(obj) {
    return Object.keys(obj).length === 0;
}
