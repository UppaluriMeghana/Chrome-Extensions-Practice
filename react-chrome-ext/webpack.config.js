const path = require("path");
const HTMLPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin")

module.exports = {
    // entry point of application
    entry: {
        index: "./src/index.tsx"
    },
    //optimizing
    mode: "production",
    module: {
        rules: [
            // TypeScript rule
            {
              test: /\.tsx?$/,
               use: [
                 {
                  loader: "ts-loader",
                   options: {
                     compilerOptions: { noEmit: false },
                    }
                  }],
               exclude: /node_modules/,
            },
            {
                // css rule
              exclude: /node_modules/,
              test: /\.css$/i,
               use: [
                  "style-loader",
                  "css-loader"
               ]
            },
        ],
    },
    plugins: [
        new CopyPlugin({
            // copy-webpack-plugin to copy files from & to build output directory
            patterns: [
                { from: "manifest.json", to: "../manifest.json" },
            ],
        }),
        // html-webpack-plugin -> create instances for each chunk (JavaScript files)
        ...getHtmlPlugins(["index"]),
    ],
    //to import modules without extension specification
    resolve: {
        extensions: [".tsx", ".ts", ".js"],
    },
    //output directory & naming for output files (entry point name)
    output: {
        path: path.join(__dirname, "dist/js"),
        filename: "[name].js",
    },
};

// helper function to generate array of HTMLPlugin instances based on chunks
function getHtmlPlugins(chunks) {
    return chunks.map(
        (chunk) =>
            new HTMLPlugin({
                title: "React extension",
                filename: `${chunk}.html`,
                chunks: [chunk],
            })
    );
}