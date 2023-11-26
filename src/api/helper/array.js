const getTop = (array, n, sortFn) => {
    const topValues = array.sort(sortFn).slice(0, n);
    return topValues;
};

module.exports = { getTop };