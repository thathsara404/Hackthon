'use strict';

const Bundler = require('parcel-bundler');
const app = require('./app');
const gameRoomServer = require('./gameRoomWebSocketServer');

const entryFiles = ['./public/main.html'];
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

const port = 1223;
const server = app.listen(port, (err) => {
    if (err) {
        console.log('Error app listening ...');
    }
    console.log(`App is running on port: ${port}`);
});

// Start Game Room Server
gameRoomServer(server);
