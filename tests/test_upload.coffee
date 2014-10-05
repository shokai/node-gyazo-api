fs   = require 'fs'
path = require 'path'
require path.resolve 'tests', 'test_helper'

assert  = require 'assert'
{Promise} = require 'es6-promise'

Gyazo = require path.resolve()


describe 'GYAZO_TOKEN', ->

  it 'should have ENV var "GYAZO_TOKEN"', ->
    assert.equal typeof process.env.GYAZO_TOKEN, 'string'


describe 'upload method', ->

  gyazo = new Gyazo process.env.GYAZO_TOKEN

  it 'should upload image', ->

    @timeout 10000

    gyazo.upload "#{__dirname}/test.jpg"
    .then (res) ->
      new Promise (resolve, reject) ->
        assert.equal typeof(res.image_id), 'string'
        assert.equal /^https?:\/\/.+/.test(res.permalink_url), true
        assert.equal /^https?:\/\/.+/.test(res.url), true
        resolve res

  it 'should upload image from stream', ->

    @timeout 10000

    gyazo.upload fs.createReadStream "#{__dirname}/test.jpg"
    .then (res) ->
      new Promise (resolve, reject) ->
        assert.equal typeof(res.image_id), 'string'
        assert.equal /^https?:\/\/.+/.test(res.permalink_url), true
        assert.equal /^https?:\/\/.+/.test(res.url), true
        resolve res
