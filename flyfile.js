exports.test = function* () {
  yield this.source('./*.js', './test/**/*.js').eslint()
}
