'use strict'

const path = require('path')
const pkgConf = require('pkg-conf')

const Api = require('ava/api')
const Verbose = require('ava/lib/reporters/verbose')
const babelConfigHelper = require('ava/lib/babel-config')

module.exports = {
  name: 'ava',
  every: false,
  files: true,
  *func(files, opts) {
    const conf = yield pkgConf('ava')
    const filepath = pkgConf.filepath(conf)
    const projectDir = filepath === null ? process.cwd() : path.dirname(filepath)

    const defaults = {
      babelConfig: babelConfigHelper.validate(conf.babel),
      projectDir,
    }
    opts = Object.assign({}, defaults, opts)

    const api = new Api(opts)
    const reporter = new Verbose()

    api.on('test', test => console.error(reporter.test(test)))
    api.on('error', error => console.error(reporter.unhandledError(test)))

    const runStatus = yield api.run(files.map(path.format))

    console.log(reporter.finish(runStatus))
    if (runStatus.failCount > 0) throw runStatus.errors
  },
}
