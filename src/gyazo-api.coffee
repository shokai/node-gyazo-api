fs = require 'fs'

request   = require 'request'
{Promise} = require 'es6-promise'

module.exports = class Gyazo

  constructor: (@access_token = null) ->

  upload: (image, params = {}) =>
    new Promise (resolve, reject) =>
      if typeof image is 'string'
        image = fs.createReadStream image
      url = "https://upload.gyazo.com/api/upload"
      req = request.post
        url: url
      , (err, res, body) ->
        return reject err if err
        return reject res.body if res.statusCode isnt 200
        resolve
          response: res
          data:     JSON.parse body
      form = req.form()
      form.append "imagedata", image
      form.append "access_token", @access_token
      for k,v of params
        form.append k, v

  list: (query = {}) =>
    new Promise (resolve, reject) =>
      query.access_token = @access_token
      url = "https://api.gyazo.com/api/images"
      request.get
        url: url
        qs: query
      , (err, res, body) ->
        return reject err if err
        return reject res.body if res.statusCode isnt 200
        resolve
          response: res
          data:     JSON.parse res.body

  delete: (image_id) =>
    new Promise (resolve, reject) =>
      url = "https://api.gyazo.com/api/images/#{image_id}"
      request.del
        url: url
        qs:
          access_token: @access_token
      , (err, res, body) ->
        return reject err if err
        return reject res.body if res.statusCode isnt 200
        resolve
          response: res
          data:     JSON.parse res.body
