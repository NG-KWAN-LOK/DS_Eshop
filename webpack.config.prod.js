const autoprefixer = require("autoprefixer");
const cssnano = require("cssnano");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const merge = require("webpack-merge");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;

const base = require("./webpack.config.base");

module.exports = (env) =>
  merge.smartStrategy({ "module.rules.use": "replace" })(base(env), {
    mode: "production",
    //devtool: "source-map",
    output: {
      filename: "js/[name].[chunkhash].js",
      chunkFilename: "lib/[name].[chunkhash].min.js",
    },
    module: {
      rules: [
        {
          test: /\.scss$/,
          use: [
            MiniCssExtractPlugin.loader,
            "css-loader?modules",
            {
              loader: "postcss-loader",
              options: {
                plugins: () => [
                  cssnano({
                    preset: "default",
                  }),
                  autoprefixer({
                    Browserslist: [
                      "last 10 Chrome versions",
                      "last 5 Firefox versions",
                      "Safari >= 6",
                      "ie > 8",
                    ],
                  }),
                ],
              },
            },
            "sass-loader",
          ],
        },
      ],
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: "plugin.[chunkhash].css",
      }),
    ],
    performance: {
      hints: false,
      maxEntrypointSize: 512000,
      maxAssetSize: 512000,
    },
    optimization: {
      minimize: true,
      minimizer: [
        new TerserPlugin({
          cache: true,
          parallel: true,
          sourceMap: true,
          extractComments: true,
          terserOptions: {
            compress: {
              drop_console: false,
            },
          },
        }),
      ],
      runtimeChunk: true,
      splitChunks: {
        cacheGroups: {
          vendor: {
            chunks: "async",
            name: "vendor",
            test: /node_modules/,
            enforce: true,
          },
        },
      },
    },
  });
