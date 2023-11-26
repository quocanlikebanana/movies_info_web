module.exports = {
    handleError: function (app) {
        app.use(
            (err, req, res, next) => {
                console.error(err.stack)
                next(err)
            },
            (err, req, res, next) => {
                if (err instanceof Error) {
                    next(err);
                } else {
                    res.status(500).json({ title: err.title, message: err.message });
                }
            },
            (err, req, res, next) => {
                res.status(500).send('Something unknown...');
            }
        );

        app.get('*', (req, res, next) => {
            res.render('errors/404', {});
        });


    }
}

