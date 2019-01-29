var path = require('path')
var utils = require('./utils')
var config = require('../config')
var vueLoaderConfig = require('./vue-loader.conf')
var rootUrl = '',  localUrl = '',appUrl='';

if (process.env.server === 'dev') {
  rootUrl = config.dev.env.RootUrl;
  localUrl = config.dev.env.LocalUrl;
  appUrl = config.dev.env.AppUrl;
} else if (process.env.server === 'prod') {
  rootUrl = config.build.env.RootUrl;
  localUrl = config.build.env.LocalUrl;
  appUrl = config.build.env.AppUrl;
} else if (process.env.server === 'pre') {
  rootUrl = config.pre.env.RootUrl;
  localUrl = config.pre.env.LocalUrl;
  appUrl = config.pre.env.AppUrl;
} else {
  rootUrl = config.test.env.RootUrl;
  localUrl = config.test.env.LocalUrl;
  appUrl = config.test.env.AppUrl;
}
////console.log("rootUrl: " + rootUrl)
////console.log("localUrl: " + localUrl)
////console.log("appUrl: " + appUrl)
function resolve(dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {
  entry: {
    app: ['babel-polyfill', './src/main.js']
  },
  output: {
    path: config.build.assetsRoot,
    filename: '[name].js',
    publicPath: process.env.NODE_ENV === 'production'
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src')
    }
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      {
        test: /\.js$/,
        loader: 'babel-loader?cacheDirectory',//babel-loader支持缓存转换出的结果，通过cacheDirectory选项开启
        include: [resolve('src'), resolve('test')]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 30000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('media/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 30000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      },
      {
        test: /baseuri\.js$/,
        loader: 'string-replace-loader',
        query: {
          multiple: [
            {search: 'RootUrl',replace: rootUrl},
            {search: 'LocalUrl',replace: localUrl},
            {search: 'AppUrl',replace: appUrl},
          ]
        }
      },{
        test: /\.sass$/,
        loaders: ['style', 'css', 'sass']
      }
    ]
  },
  externals: {
    'vue': 'Vue',
    'vue-router': 'VueRouter',
    'mint-ui':'ElementUI',
    'vuex':'Vuex',
    'axios':'axios',
    'fecha':'fecha'
    
	}
}
