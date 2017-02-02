import {join} from 'path'

import test from 'ava'
import Fly from 'fly'

test('pass', t => {
  const fly = new Fly({
    plugins: [ require('../') ],
    tasks: {
      *foo(f) {
        yield f.source([ join(__dirname, '/fixture/pass.js') ]).ava()
      },
    },
  })

  return fly.start('foo')
    .then(() => t.pass('ok'))
    .catch(() => t.fail('should be the test that was succeeded'))
})

test('fail', t => {
  const fly = new Fly({
    plugins: [ require('../') ],
    tasks: {
      *foo(f) {
        yield f.source([ join(__dirname, '/fixture/fail.js') ]).ava()
      },
    },
  })

  return fly.start('foo')
    .then(() => t.failed('should be the test that was failed'))
    .catch(() => t.pass('ok'))
})
