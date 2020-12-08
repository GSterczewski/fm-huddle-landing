const {join} = require("path");

module.exports = {
    paths : {
        dist : {
            root : join(__dirname,"dist"),
            js : join(__dirname,"dist","js")

        },
        src : {
            root : join(__dirname,"src"),
            styles : join(__dirname,"src","styles"),
            js : join(__dirname,"src","js")
        },
        node_modules : join(__dirname,"node_modules"),
        assets : join(__dirname,"assets")

    },
    options:{
        bundles:{
            css : "main.css",
            js: "main.js"
        },
        port : 9000,
        webpack : {
            entry : join(__dirname,"src","js","main.js"),
            filename : "[name].js",
            extensions : {
                js : /\.js/
            }
        }
    }
};
