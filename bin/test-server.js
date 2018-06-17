const express = require('express')
const path = require('path')
const webpackDevMiddleware = require('webpack-dev-middleware')

const webpack = require('webpack')
const webpackConfig = require('../webpack.config.js')

const app = express()

const compiler = webpack(webpackConfig)

const port = process.env.PORT || 8081

const middleware = webpackDevMiddleware(compiler, {
  publicPath: '/',
  stats: {
    colors: true,
  }
})

const server = app.listen(port, () => {
  const host = server.address().address
  const port = server.address().port

  console.log('Dev server is listening on http://%s:%s', host, port)
})

module.exports = middleware 
