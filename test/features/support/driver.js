const webdriver = require('selenium-webdriver')
const chrome = require('selenium-webdriver/chrome')

const chromeCapabilities = webdriver.Capabilities.chrome();
const opts = {
  args: ['--headless']
}
chromeCapabilities.set('chromeOptions', opts);

const driver = new webdriver.Builder()
  .forBrowser('chrome')
  .withCapabilities(chromeCapabilities)
  .build()

module.exports = driver;
