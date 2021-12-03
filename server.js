const Bundler = require('parcel-bundler');
const app = require('./app');

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

const port = 8080;
app.listen(port, (err) => {
    if (err) {
        console.log('error app listening ...');
    }
    console.log(`app is running on port: ${port}`);
});
