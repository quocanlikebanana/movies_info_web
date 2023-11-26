const camelToSnakeCase = str => str.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);
function currencyToNumber(currency) {
    const str = currency.replace(/[$,]+/g, '');
    return Number(str);
}

module.exports = { camelToSnakeCase, currencyToNumber };