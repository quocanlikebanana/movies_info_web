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

app.get('/intro', introRouter);

app.get('/movie', movieRouter);

app.get('/fav', favRouter);

app.get('/name', nameRouter);


// For render error purpose (on fetch request)
app.get('/error', (req, res, next) => {
    res.status(500).render('errors/error', {});
});

// ==================================

app.listen(port, hostName, async () => {
    console.log(`Server is on: http://${hostName}:${port}`);
});

// ==================================

// const { handleError } = require('./app/router/error.r');
// handleError(app);

// ==================================
// >> DEBUGGING PART
// ==================================

app.get('/debug', (req, res, next) => {
});

// ==================================
// << DEBUGGING PART
// ==================================