'use strict'

const format = require('path').format

const Api = require('ava/api')
const Verbose = require('ava/lib/reporters/verbose')
const co = require('co')

module.exports = {
  name: 'ava',
  every: false,
  files: true,
  *func(files, opts) {
    const api = new Api()
    const reporter = new Verbose({ basePath: '.' })

    api.on('test', test => console.error(reporter.test(test)))
    api.on('error', error => console.error(reporter.unhandledError(test)))

    const runStatus = yield api.run(files.map(format))

    console.log(reporter.finish(runStatus))
    if (runStatus.failCount > 0) throw runStatus.errors
  },
}
