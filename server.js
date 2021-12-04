const Bundler = require('parcel-bundler');
const app = require('./app');
const gameRoomServer = require('./gameRoomWebSocketServer');
const config = require('./app/config/config');

const entryFiles = ['./public/main.html'];
const options = {
    outDir: './dist',
    publicUrl: '/domestic-navigator',
    cache: false,
    watch: false,
    hmr: false,
    minify: true,
    sourceMaps: false
};

const bundler = new Bundler(entryFiles, options);
app.use(bundler.middleware());

const port = config.APP_PORT.PROD;
const server = app.listen(port, (err) => {
    if (err) {
        console.log('error app listening ...');
    }
    console.log(`app is running on port: ${port}`);
});

// Start Game Room Socket Server
gameRoomServer(server);
