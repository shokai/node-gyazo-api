# Gyazo-API

[Gyazo API](https://gyazo.com/api/docs) wrapper for Node.js

- https://github.com/shokai/node-gyazo-api
- https://www.npmjs.org/package/gyazo-api


## Usage

Register new application and get [ACCESS TOKEN](https://gyazo.com/oauth/applications), then

### upload("filepath") or upload("stream")

```javascript
var Gyazo  = require('gyazo-api');
var client = new Gyazo('ACCESS_TOKEN');

client.upload('/path/to/file.jpg')
.then(function(res){
  console.log(res.data);
  console.log(res.data.permalink_url);
})
.catch(function(err){
  console.error(err);
});
```

### list

```javascript
client.list({page: 1, per_page: 50})
.then(function(res){
  console.log(res.data[0]);
  console.log(res.response.headers['x-current-page']); // => 1
  console.log(res.response.headers['x-per-page']);     // => 50
})
.catch(function(err){
  console.error(err);
});
```
