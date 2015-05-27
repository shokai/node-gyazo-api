(function() {
  var Gyazo, Promise, fs, request,
    bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  fs = require('fs');

  request = require('request');

  Promise = require('es6-promise').Promise;

  module.exports = Gyazo = (function() {
    function Gyazo(access_token) {
      this.access_token = access_token != null ? access_token : null;
      this["delete"] = bind(this["delete"], this);
      this.list = bind(this.list, this);
      this.upload = bind(this.upload, this);
    }

    Gyazo.prototype.upload = function(image) {
      return new Promise((function(_this) {
        return function(resolve, reject) {
          var form, req, url;
          if (typeof image === 'string') {
            image = fs.createReadStream(image);
          }
          url = "https://upload.gyazo.com/api/upload";
          req = request.post({
            url: url
          }, function(err, res, body) {
            if (err) {
              return reject(err);
            }
            if (res.statusCode !== 200) {
              return reject(res.body);
            }
            return resolve({
              response: res,
              data: JSON.parse(body)
            });
          });
          form = req.form();
          form.append("imagedata", image);
          return form.append("access_token", _this.access_token);
        };
      })(this));
    };

    Gyazo.prototype.list = function(query) {
      if (query == null) {
        query = {};
      }
      return new Promise((function(_this) {
        return function(resolve, reject) {
          var url;
          query.access_token = _this.access_token;
          url = "https://api.gyazo.com/api/images";
          return request.get({
            url: url,
            qs: query
          }, function(err, res, body) {
            if (err) {
              return reject(err);
            }
            if (res.statusCode !== 200) {
              return reject(res.body);
            }
            return resolve({
              response: res,
              data: JSON.parse(res.body)
            });
          });
        };
      })(this));
    };

    Gyazo.prototype["delete"] = function(image_id) {
      return new Promise((function(_this) {
        return function(resolve, reject) {
          var url;
          url = "https://api.gyazo.com/api/images/" + image_id;
          return request.del({
            url: url,
            qs: {
              access_token: _this.access_token
            }
          }, function(err, res, body) {
            if (err) {
              return reject(err);
            }
            if (res.statusCode !== 200) {
              return reject(res.body);
            }
            return resolve({
              response: res,
              data: JSON.parse(res.body)
            });
          });
        };
      })(this));
    };

    return Gyazo;

  })();

}).call(this);
