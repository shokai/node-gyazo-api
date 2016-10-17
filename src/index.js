import fs from 'fs'
import request from 'request'

export default class Gyazo {

  constructor (accessToken = null) {
    this.accessToken = accessToken
  }

  upload (image, params = {}) {
    return new Promise((resolve, reject) => {
      if (!image) throw new Error('image is undefined')
      if (typeof image === 'string') image = fs.createReadStream(image)
      const url = 'https://upload.gyazo.com/api/upload'
      const req = request.post({
        url: url
      }, (err, res, body) => {
        if (err) return reject(err)
        if (res.statusCode !== 200) return reject(res.body)
        resolve({
          response: res,
          data: JSON.parse(body)
        })
      })
      const form = req.form()
      form.append('imagedata', image)
      form.append('access_token', this.accessToken)
      for (let k in params) {
        form.append(k, params[k])
      }
    })
  }

  list (query = {}) {
    return new Promise((resolve, reject) => {
      query.access_token = this.accessToken
      const url = 'https://api.gyazo.com/api/images'
      request.get({
        url: url,
        qs: query
      }, (err, res, body) => {
        if (err) return reject(err)
        if (res.statusCode !== 200) return reject(res.body)
        resolve({
          response: res,
          data: JSON.parse(res.body)
        })
      })
    })
  }

  delete (imageId) {
    return new Promise((resolve, reject) => {
      if (!imageId) throw new Error('imageId is undefined')
      const url = `https://api.gyazo.com/api/images/${imageId}`
      request.del({
        url: url,
        qs: {
          access_token: this.accessToken
        }
      }, (err, res, body) => {
        if (err) return reject(err)
        if (res.statusCode !== 200) return reject(res.body)
        resolve({
          response: res,
          data: JSON.parse(res.body)
        })
      })
    })
  }
}
