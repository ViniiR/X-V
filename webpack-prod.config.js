import dev from "./webpack.config.js";
import Terser from "terser-webpack-plugin";
//import BrotliPlugin from "brotli-webpack-plugin";

export default {
    ...dev,
    mode: "production",
    //plugins: [
    //    new BrotliPlugin({
    //        asset: "[path].br[query]",
    //        test: /\.(js|css|html|svg)$/,
    //        threshold: 10240,
    //        minRatio: 0.8,
    //    }),
    //],
    optimization: {
        checkWasmTypes: false,
        emitOnErrors: true,
        concatenateModules: true,
        minimize: true,
        minimizer: [
            new Terser({
                //test: /\.ts?x(\?.*)?$/i,
            }),
        ],
    },
};
