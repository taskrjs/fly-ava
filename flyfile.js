export function* test() {
  yield this.source('./*.js', './test/**/*.js').eslint()
  yield this.source('./test/*.js').ava()
}
