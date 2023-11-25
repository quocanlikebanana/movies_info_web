const { PersonManager } = require('../model/person.m');


module.exports = {
    getPage: async (req, res, next) => {
        try {
            console.log('all');
            const query = req.query;
            const data = await PersonManager.getByPage(query.page, query.per_page);
            // console.log(data);
            res.json(data);
        } catch (err) {
            next(err);
        }
    },
    searchPage: async (req, res, next) => {
        try {
            console.log('search');
            const query = req.query;
            const data = await PersonManager.searchByName(query.str);
            // console.log(data);
            res.json(data);
        } catch (err) {
            next(err);
        }
    },
    detailPerson: async (req, res, next) => {
        try {
            console.log('detail');
            const query = req.query;
            const data = await PersonManager.getPerson(query.id);
            console.log(data);
            res.json(data);
        } catch (err) {
            next(err);
        }
    },

    addPerson: async (req, res, next) => {
        try {
            // console.log(req.body);
            console.log('add');
            const body = req.body;
            const result = await PersonManager.addPerson(body.person);
            console.log(result);
            res.sendStatus(200);
        } catch (err) {
            next(err);
        }
    },
    updatePerson: async (req, res, next) => {
        try {
            // console.log(req.body);
            console.log('update');
            const body = req.body;
            const result = await PersonManager.updatePerson(body.person, body.id);
            console.log(result);
            res.sendStatus(200);
        } catch (err) {
            next(err);
        }
    },
    deletePerson: async (req, res, next) => {
        try {
            // console.log(req.body);
            console.log('delete');
            const body = req.body;
            const result = await PersonManager.deletePerson(body.id);
            console.log(result);
            res.sendStatus(200);
        } catch (err) {
            next(err);
        }
    },
}
