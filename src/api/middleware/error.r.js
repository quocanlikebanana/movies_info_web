const { HTMLDisplayError } = require('../helper/classes');

module.exports = {
    logDisplay: (err, req, res, next) => {
        console.error(err.stack)
        next(err)
    },
    xmlhttpError: (err, req, res, next) => {
        if (req.xhr) {
            res.status(500).send({ error: 'Something failed!' })
        } else {
            next(err)
        }
    },
    predictedErrorPageDisplay: (err, req, res, next) => {
        if (err.title != null && err.message != null) {
            res.status(500).render('public/errors/500', { title: err.title, message: err.message });
        } else {
            next(err);
        }
    },
    finalHandler: (err, req, res, next) => {
        res.status(500).send('Something went down ... (:<)');
    },
}