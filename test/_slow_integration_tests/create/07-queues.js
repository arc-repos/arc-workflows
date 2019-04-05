let fs = require('fs')
let print = require('../../../src/create/_print')
let parse = require('@architect/parser')
// var nukeLambdas = require('./_nuke-lambdas')
// var nukeTopics = require('./_nuke-topics')
var path = require('path')
// var rm = require('rimraf').sync
var mkdir = require('mkdirp').sync
var cp = require('fs').copyFileSync
var test = require('tape')
var run = require('../../../src/create')

test('env', t => {
  t.plan(1)
  t.ok(run, 'run exists')
})

test('setup', t => {
  t.plan(1)
  mkdir('test/create/_mock')
  cp(path.join(__dirname, '07-queues-mock.arc'), 'test/create/_mock/.arc')
  process.chdir('test/create/_mock')
  t.ok(true, 'created test/_mock/.arc')
})

test('exec', t => {
  t.plan(1)
  let arcPath = path.join(process.cwd(), '.arc')
  let raw = fs.readFileSync(arcPath).toString()
  let arc = parse(raw)
  run(arc, raw, function _ran(err) {
    if (err) {
      t.fail(err)
    }
    else {
      t.ok(true, 'created queues')
      print.stop()
    }
  })
})

/*
test('cleanup lambdas', t=> {
  t.plan(1)
  process.chdir('../../')
  rm('test/_mock')
  nukeLambdas([
    'testapp-staging-test-event',
    'testapp-staging-test-event-two',
    'testapp-production-test-event',
    'testapp-production-test-event-two',
  ],
  function _nuke(err) {
    if (err) {
      t.fail(err)
    }
    else {
      t.ok(true, 'lambdas nuked')
    }
  })
})

test('cleanup sns topics', t=> {
  t.plan(1)
  nukeTopics([
    'testapp-staging-test-event',
    'testapp-production-test-event',
    'testapp-staging-test-event-two',
    'testapp-production-test-event-two',
  ],
  function _nuke(err) {
    if (err) {
      t.fail(err)
    }
    else {
      t.ok(true, 'topics nuked')
    }
  })
})

test('return home', t=> {
  t.plan(1)
  process.chdir(path.join(__dirname, '..', '..', '..'))
  t.ok(true, 'returned back to cwd')
})*/
