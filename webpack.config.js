var webpack = require("webpack");
var path = require("path");

var DISTRIBUTION_DIR = path.resolve(__dirname, "distribution");
var SOURCE_DIR = path.resolve(__dirname, "src");

var config =
{
	entry: SOURCE_DIR + "/app/index.js",
	output:
	{
		path: DISTRIBUTION_DIR + "/app",
		filename: "bundle.js",
		publicPath: "/app/"
	},
	module:
	{
		rules:
		[
			{
				test: /\.js?/,
				include: SOURCE_DIR,
				loader: "babel-loader",
				query:
				{
					presets: ["@babel/env", "@babel/react"]
				}
			}
		]
	}
}

module.exports = config;