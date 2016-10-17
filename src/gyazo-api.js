"use strict";

import fs from "fs";
import request from "request";

module.exports = class Gyazo{

  constructor(access_token = null){
    this.access_token = access_token;
  }

  upload(image, params = {}){
    return new Promise((resolve, reject) => {
      if(typeof image === "string") image = fs.createReadStream(image);
      const url = "https://upload.gyazo.com/api/upload";
      const req = request.post({
        url: url
      }, (err, res, body) => {
        if(err) return reject(err);
        if(res.statusCode !== 200) return reject(res.body);
        resolve({
          response: res,
          data: JSON.parse(body)
        });
      });
      const form = req.form();
      form.append("imagedata", image);
      form.append("access_token", this.access_token);
      for(let k in params){
        form.append(k, params[k]);
      }
    });
  }

  list(query = {}){
    return new Promise((resolve, reject) => {
      query.access_token = this.access_token;
      const url = "https://api.gyazo.com/api/images";
      request.get({
        url: url,
        qs: query
      }, (err, res, body) => {
        if(err) return reject(err);
        if(res.statusCode !== 200) return reject(res.body);
        resolve({
          response: res,
          data: JSON.parse(res.body)
        });
      });
    });
  }

  delete(image_id){
    return new Promise((resolve, reject) => {
      const url = `https://api.gyazo.com/api/images/${image_id}`
      request.del({
        url: url,
        qs: {
          access_token: this.access_token
        }
      }, (err, res, body) => {
        if(err) return reject(err);
        if(res.statusCode !== 200) return reject(res.body);
        resolve({
          response: res,
          data: JSON.parse(res.body)
        });
      });
    });
  }
}
