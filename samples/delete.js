'use strict';

const Gyazo = require('../') // load this repos
// var Gyazo = require('gyazo-api') // load from npm

const client = new Gyazo(process.env.GYAZO_TOKEN);

const image_id = process.argv[2];

client.delete(image_id)
.then(function (res) {
    console.log(res.data)
}).catch(function (err) {
    console.error(err)
})