exports.test = function* () {
  yield this.source('./*.js', './test/**/*.js').eslint()
  yield this.source('./test/*.js').ava()
}
