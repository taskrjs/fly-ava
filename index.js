const Api = require('ava/api')
const Verbose = require('ava/lib/reporters/verbose')
const co = require('co')

module.exports = function () {
  this.ava = function (opts) {
    return this.unwrap(files => {
      return co(function *() {
        const api = new Api()
        const reporter = new Verbose()
        reporter.api = api

        api.on('test', test => console.error(reporter.test(test)))
        api.on('error', error => console.error(reporter.unhandledError(test)))

        yield api.run(files)

        console.error(reporter.finish())
        if (api.failCount > 0) throw api.errors
      })
    })
  }
}
