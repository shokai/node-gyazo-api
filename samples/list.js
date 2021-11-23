'use strict';

const Gyazo = require('../') // load this repos

// var Gyazo = require('gyazo-api') // load from npm

const client = new Gyazo(process.env.GYAZO_TOKEN)

client.list({page: 1, per_page: 50})
.then(function (res) {
  console.log(res.data)
  console.log(res.headers['x-current-page']) // => 1
  console.log(res.headers['x-per-page'])     // => 50
})
.catch(function (err) {
  console.error(err)
})
