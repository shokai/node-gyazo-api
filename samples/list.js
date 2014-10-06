var path  = require('path');
var Gyazo = require(path.resolve()); // load this repos

// var Gyazo = require('gyazo-api'); // load from npm

var client = new Gyazo(process.env.GYAZO_TOKEN);

client.list({page: 1, per_page: 50})
.then(function(res){
  console.log(res.data[0]);
  console.log(res.response.headers['x-current-page']); // => 1
  console.log(res.response.headers['x-per-page']);     // => 50
})
.catch(function(err){
  console.error(err);
});
