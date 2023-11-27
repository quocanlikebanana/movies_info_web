const { app } = require('./config/global');
const { path, express } = require('./config/lib');
const env = require('./config/env');

// Port = Individual mark
const port = env.individual_mark || 3000;
const hostName = env.host || '127.0.0.1';

const engine = require('../21190');
app.engine('html', engine.engineFunction);
app.set('views', path.join(__dirname, 'api', 'view'));
app.set('view engine', 'html');

app.use(express.static(path.join(__dirname, 'api', 'view', 'public')));
// app.use(express.static('./api/view/public'));

app.get('/', (req, res, next) => {
    res.render('index', {});
});

// Distribute routers

const { router: introRouter } = require('./api/router/intro.r');
const { router: movieRouter } = require('./api/router/movie.r');
const { router: favRouter } = require('./api/router/fav.r');
const { router: nameRouter } = require('./api/router/name.r');

app.use('/intro', introRouter);

app.use('/movie', movieRouter);

app.use('/fav', favRouter);

app.use('/name', nameRouter);

// === Test ZOne:

// Error trggier
app.use('/error', (req, res, next) => {
    next(new HTMLDisplayError('This Error is intesional', 'Please don\'t consider this as a serious problem.'));
});

// Engine test:
app.get('/engine', (req, res, next) => {
    res.render('public/test/engine_test', { a: 'An Ngo' });
});

// === mdw:

const errorHandler = require('./api/middleware/error.r');
const { HTMLDisplayError } = require('./api/helper/classes');

app.use(express.urlencoded({
    extended: true
}))

app.use(
    errorHandler.logDisplay,
    errorHandler.xmlhttpError,
    errorHandler.predictedErrorPageDisplay,
    errorHandler.finalHandler
);

// app.use(errorHandler.logDisplay);

// app.use(errorHandler.xmlhttpError);

// app.use(errorHandler.predictedErrorPageDisplay);

// app.use(errorHandler.finalHandler);

// === No route is caught => 404

app.get('*', (req, res, next) => {
    res.render('public/errors/404', {});
});

// ==================================

app.listen(port, hostName, async () => {
    console.log(`Server is on: http://${hostName}:${port}`);
});


// ==================================
// >> DEBUGGING PART
// ==================================

// app.get('/debug', (req, res, next) => {
// });

// ==================================
// << DEBUGGING PART
// ==================================