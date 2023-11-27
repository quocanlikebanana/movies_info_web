const { Name } = require('../model/name.m');

module.exports = {
    detail: async (req, res, next) => {
        const id = req.params.nameId;
        const result = await Name.getDetail(id);
        res.json(result);
    },

    search: async (req, res, next) => {
        const key = req.params.key;
        const result = await Name.search(key);
        res.json(result);
    }
}