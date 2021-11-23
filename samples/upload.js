'use strict';

const Gyazo = require('../') // load this repos
// var Gyazo = require('gyazo-api') // load from npm

const client = new Gyazo(process.env.GYAZO_TOKEN);

const imgPath = process.argv[2] || `./samples/testPhoto.png`;

client.upload(imgPath, {
  title: 'test upload',
  desc: 'upload from node gyazo api'
}).then(function (res) {
  console.log(res.data)
  console.log(res.data.permalink_url)
}).catch(function (err) {
  console.error(err)
})
