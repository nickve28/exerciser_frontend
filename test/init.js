const middleware = require('../bin/test-server')
const { before } = require('mocha')

// A global hook to ensure the server has been built
// Note: the function declaration is intentional here
before(function (done) {
  this.timeout(30 * 1000)
  middleware.waitUntilValid(() => done())
})

process.on('SIGTERM', () => {
  server.close(() => process.exit(0))
})
