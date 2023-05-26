
const getIntValue = (text, defaultValue = null) => {
    const value = parseInt(text);
    return isNaN(value) ? defaultValue : value;
}

const getSortOptions = (sort, defaultOptions) => {
    if (!sort) {
        return defaultOptions;
    }

    const sortOptions = {};
    const sortArray = sort.split(',');
    sortArray.forEach((sortColumn) => {
        const sortOrder = sortColumn.split(':');
        if (sortOrder[0]) {
            sortOptions[sortOrder[0]] = sortOrder?.[1] === 'desc' ? -1 : 1;
        }
    });
    return sortOptions;
}

module.exports = {
    getIntValue,
    getSortOptions,
};
