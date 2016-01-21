fs   = require 'fs'
path = require 'path'
require './test_helper'

{assert}  = require 'chai'

Gyazo = require path.resolve()
img_path = "#{__dirname}/test.jpg"

describe 'GYAZO_TOKEN', ->

  it 'should have ENV var "GYAZO_TOKEN"', ->
    assert.isString process.env.GYAZO_TOKEN


describe '"upload" method', ->

  gyazo = new Gyazo process.env.GYAZO_TOKEN

  it 'should upload image', ->

    @timeout 10000

    gyazo.upload(img_path)
    .then (res) ->
      new Promise (resolve, reject) ->
        assert.isObject res.response
        assert.isString res.data.image_id
        assert.isUrl res.data.permalink_url
        assert.isUrl res.data.url
        resolve res

  it 'should upload image from stream', ->

    @timeout 10000

    gyazo.upload(fs.createReadStream img_path)
    .then (res) ->
      assert.isObject res.response
      assert.isString res.data.image_id
      assert.isUrl res.data.permalink_url
      assert.isUrl res.data.url


describe '"list" method', ->

  gyazo = new Gyazo process.env.GYAZO_TOKEN

  it 'should return list of images', ->

    @timeout 3000

    gyazo.list
      page: 1
      per_page: 5
    .then (res) ->
      assert.isObject res.response
      assert.isArray res.data
      assert.lengthOf res.data, 5
      assert.isString res.data[0].image_id
      assert.isUrl res.data[0].permalink_url
      assert.isUrl res.data[0].url
      assert.equal res.response.headers['x-current-page'], 1
      assert.equal res.response.headers['x-per-page'], 5


describe '"delete" method', ->

  gyazo = new Gyazo process.env.GYAZO_TOKEN

  it 'should delete uploaded image', ->

    @timeout 10000

    image_id_uploaded = null

    gyazo.upload(img_path)
    .then (res) ->
      image_id_uploaded = res.data.image_id
      return res.data.image_id
    .then (id) ->
      return gyazo.delete id
    .then (res) ->
      assert.equal res.data.image_id, image_id_uploaded
