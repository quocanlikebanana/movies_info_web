const { Intro } = require('../model/intro.m');

module.exports = {
    getIntro: async (req, res, next) => {
        const result = await Intro.get();
        res.json(result);
    }
}