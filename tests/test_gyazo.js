/* eslint-env mocha */

import './test_helper'
import fs from 'fs'
import {assert} from 'chai'
import Gyazo from '../src/'

const imgPath = `${__dirname}/test.jpg`

describe('GYAZO_TOKEN', function () {
  it('should have ENV var GYAZO_TOKEN', function () {
    assert.isString(process.env.GYAZO_TOKEN)
  })
})

describe('"upload" method', function () {
  const gyazo = new Gyazo(process.env.GYAZO_TOKEN)

  it('should upload image', async function () {
    this.timeout(10000)
    const res = await gyazo.upload(imgPath)
    assert.isObject(res.response)
    assert.isString(res.data.image_id)
    assert.isUrl(res.data.permalink_url)
    assert.isUrl(res.data.url)
  })

  it('should upload image from stream', async function () {
    this.timeout(10000)
    const res = await gyazo.upload(fs.createReadStream(imgPath))
    assert.isObject(res.response)
    assert.isString(res.data.image_id)
    assert.isUrl(res.data.permalink_url)
    assert.isUrl(res.data.url)
  })
})

describe('"list" method', function () {
  const gyazo = new Gyazo(process.env.GYAZO_TOKEN)

  it('should return list of images', async function () {
    this.timeout(3000)
    const res = await gyazo.list({ page: 1, per_page: 5 })
    assert.isObject(res.response)
    assert.isArray(res.data)
    assert.lengthOf(res.data, 5)
    assert.isString(res.data[0].image_id)
    assert.isUrl(res.data[0].permalink_url)
    assert.isUrl(res.data[0].url)
    assert.equal(res.response.headers['x-current-page'], 1)
    assert.equal(res.response.headers['x-per-page'], 5)
  })
})

describe('"delete" method', function () {
  const gyazo = new Gyazo(process.env.GYAZO_TOKEN)

  it('should delete uploaded image', async function () {
    this.timeout(10000)
    const upRes = await gyazo.upload(imgPath)
    const delRes = await gyazo.delete(upRes.data.image_id)
    assert.equal(upRes.data.image_id, delRes.data.image_id)
  })
})
