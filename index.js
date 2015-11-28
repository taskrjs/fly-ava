const execFile = require('child_process').execFile

const isWin = /^win/.test(process.platform)
const ava = require.resolve(isWin ? '.bin/ava.cmd' : 'ava/cli.js')

module.exports = function () {
  this.ava = function (opts) {
    return this.unwrap(files => {
      return new Promise((resolve, reject) => {
        const args = files.concat('--color')
        execFile(ava, args, (err, stdout, stderr) => {
          if (err) { return reject(stderr) }

          console.log(stderr)
          resolve()
        })
      })
    })
  }
}
