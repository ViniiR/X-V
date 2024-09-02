import path from "node:path";
import { fileURLToPath } from "node:url";
import HtmlWebpackPlugin from "html-webpack-plugin";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const config = {
    mode: "development",
    entry: "./src/main.tsx",
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: "ts-loader",
                exclude: "/node_modules/",
            },
            {
                test: /\.s[ac]ss$/i,
                use: ["style-loader", "css-loader", "sass-loader"],
            },
            {
                test: /\.(png|jpeg|jpg|svg)$/i,
                type: "asset/resource",
            },
            {
                test: /\.json$/i,
                type: "module",
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(__dirname, "index.html"),
        }),
    ],
    devServer: {
        static: path.join(__dirname, "dist/src"),
        compress: true,
        //fight against censorship 07/09/24
        port: 7924,
    },
    devtool: "inline-source-map",
    resolve: {
        extensions: [".ts", ".tsx", ".jsx", ".js"],
        alias: {
            "@components": path.resolve(__dirname, "src/components"),
            "@styles": path.resolve(__dirname, "src/styles"),
            "@assets": path.resolve(__dirname, "src/assets"),
            "@root": path.resolve(__dirname, "."),
            "@src": path.resolve(__dirname, "src"),
        },
    },
    output: {
        filename: "main.js",
        path: path.resolve(__dirname, "dist"),
    },
};

export default config;
