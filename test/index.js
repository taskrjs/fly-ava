import test from 'ava'
import {join} from 'path'

const fly = {}
require('../').call(fly)

test('pass', t => {
  fly.unwrap = f => f([ join(__dirname, '/fixture/pass.js') ])
  return fly.ava().then(
    () => t.pass(),
    () => t.fail()
  )
})

test('fail', t => {
  fly.unwrap = f => f([ join(__dirname, '/fixture/fail.js') ])
  return fly.ava().then(
    () => t.fail(),
    () => t.pass()
  )
})
