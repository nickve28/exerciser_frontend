const express = require('express')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const webpack = require('webpack')
const webpackConfig = require('../webpack.config.js')
const app = express()

const compiler = webpack(webpackConfig)

const port = process.env.PORT || 8080

app.use(webpackDevMiddleware(compiler, {
  publicPath: '/',
  stats: {
    colors: true,
  }
}))

app.use(webpackHotMiddleware(compiler, {
  log: console.log,
  publicPath: '/',
  noInfo: true
}))

const server = app.listen(port, () => {
  const host = server.address().address
  const port = server.address().port

  console.log('Dev server is listening on http://%s:%s', host, port)
})
