'use strict';

const Bundler = require('parcel-bundler');
const app = require('./app');
const gameRoomServer = require('./gameRoomWebSocketServer');
const config = require('./app/config/config');

const entryFiles = ['./public/main.html', './public/testharness.html', './public/certification.html'];
const options = {
    outDir: './dist',
    publicUrl: '/web-app',
    watch: true,
    hmr: true,
    minify: false,
    sourceMaps: true
};

const bundler = new Bundler(entryFiles, options);
app.use(bundler.middleware());

const port = config.APP_PORT.DEV;
const server = app.listen(port, (err) => {
    if (err) {
        console.log('Error app listening ...');
    }
    console.log(`App is running on port: ${port}`);
});

// Start Game Room Socket Server
gameRoomServer(server);
