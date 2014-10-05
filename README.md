Gyazo-API
=========
[Gyazo API](https://gyazo.com/api/docs) wrapper for Node.js

- https://github.com/shokai/node-gyazo-api


## Usage

Register new application and get [ACCESS TOKEN](https://gyazo.com/oauth/applications), then


### upload("filepath") or upload("stream")

```javascript
var Gyazo = require 'gyazo-api'
var client = new Gyazo('ACCESS_TOKEN');

client.upload('/path/to/file.jpg')
.then(function(res){
  console.log(res);
  console.log(res.permalink_url);
})
.catch(function(err){
  console.error(err);
});
```
