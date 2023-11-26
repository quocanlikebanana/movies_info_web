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


// For render error purpose (on fetch request)
app.get('/error', (req, res, next) => {
    res.status(500).render('errors/error', {});
});

// ==================================

app.listen(port, hostName, async () => {
    try {
        // await DatabaseManager.loadData();
    } catch (err) {
        // throw err;
        // console.log(err);
    } finally {
        console.log(`Server is on: http://${hostName}:${port}`);
    }
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