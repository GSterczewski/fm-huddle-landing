const { src,dest, watch, series, parallel } = require("gulp");

const config = require("./config.js");
const sass = require("gulp-sass");
const sync = require("browser-sync").create();



const handleHTML = () => src(`${config.paths.src.root}/**/*.html`).pipe(dest(config.paths.dist.root))

const handleStyles = () => src(`${config.paths.src.styles}/**/*.scss`)
.pipe(sass().on('error',sass.logError))
.pipe(dest(config.paths.dist.root))

const handleAssets = () => src(`${config.paths.assets}/**/*`).pipe(dest(`${config.paths.dist.root}/assets`))


const serve = done => {
    sync.init({
        server : {
            baseDir : config.paths.dist.root
        },
        port : config.options.port
    })
    done();
}
const reload = done => {
    sync.reload()
    done()
}

const withReload = (path,job) => watch(path,series(job,reload))

const watchFiles = () => {
    withReload(config.paths.src.root, handleHTML)
    withReload(config.paths.src.styles,handleStyles)
    withReload(config.paths.assets,handleAssets)   
    
}  

exports.build = parallel(handleStyles,handleHTML,handleAssets)
exports.default = series(
    parallel(handleStyles,handleHTML,handleAssets,serve,watchFiles)
)