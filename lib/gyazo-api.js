(function() {
  var Gyazo, Promise, fs, request;

  fs = require('fs');

  request = require('request');

  Promise = require('es6-promise').Promise;

  module.exports = Gyazo = (function() {
    function Gyazo(access_token) {
      this.access_token = access_token != null ? access_token : null;
    }

    Gyazo.prototype.upload = function(image) {
      return new Promise((function(_this) {
        return function(resolve, reject) {
          var url;
          if (typeof image === 'string') {
            image = fs.createReadStream(image);
          }
          url = "https://upload.gyazo.com/api/upload?access_token=" + _this.access_token;
          return request.post(url, function(err, res, body) {
            if (err) {
              return reject(err);
            }
            if (res.statusCode !== 200) {
              return reject(res);
            }
            return resolve(JSON.parse(body));
          }).form().append("imagedata", image);
        };
      })(this));
    };

    return Gyazo;

  })();

}).call(this);
