const driver = require('../support/driver')

describe('Login feature specs', () => {
  it('succeeds with correct credentials', () => {
    return driver
      .get('http://localhost:8081/')
  })
})
