const path = require("path");

const mode = process.env.NODE_ENV || "development";

const devMode = mode === "development";

const target = devMode ? "web" : "browserslist";
const devtool = devMode ? "source-map" : undefined;

const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode,
  target,
  devtool,
  resolve: {
    extensions: [".js", ".jsx"],
  },
  entry: {
    main: path.resolve(__dirname, "./src/index.jsx"),
  },
  devServer: {
    static: "./dist",
    watchFiles: ["src/**/*"],
    historyApiFallback: true,
    client: {
      logging: "error",
    },
    compress: true,
    port: 9000,
    hot: true,
  },
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "[name][contenthash].js",
    clean: true,
  },
  optimization: {
    runtimeChunk: false,
  },
  plugins: [
    new MiniCssExtractPlugin({ filename: "[name][contenthash].css" }),
    new HtmlWebpackPlugin({ template: path.resolve(__dirname, "./public/index.html") }),
  ],
  module: {
    rules: [
      {
        test: /\.(?:js|mjs|cjs|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [["@babel/preset-env", { targets: "defaults" }], "@babel/preset-react"],
          },
        },
      },
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
    ],
  },
};
