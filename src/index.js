'use strict';

const fs = require(`fs`);
const axios = require(`axios`);
const FormData = require(`form-data`);

module.exports = class Gyazo{
    constructor(access_token = null){
        this.access_token = access_token;
    }

    //uploadメソッド
    async upload(image, params = {}){
      try {
        if(typeof image === "string") image = fs.createReadStream(image);
        
        const form = new FormData();
        form.append('access_token', this.access_token);
        form.append('imagedata', image)
        for(let k in params){
            form.append(k, params[k]);
        }

        const ENDPOINT = 'https://upload.gyazo.com/api/upload';
        return await axios.post(ENDPOINT, form, {
            headers: form.getHeaders()
        })

      } catch (error) {
          throw new Error(error);
      }
    }

    //listメソッド
    async list(query = {}){
      try {
        
        query.access_token = this.access_token;
        const ENDPOINT = 'https://api.gyazo.com/api/images';

        return await axios.get(ENDPOINT, {params: query});
        
      } catch (error) {
        throw new Error(error);
      }
    }

    //deleteメソッド
    async delete(image_id){
      try {
        const ENDPOINT = `https://api.gyazo.com/api/images/${image_id}`;

        return await axios.delete(ENDPOINT, {
          params: {
            access_token: this.access_token
          }
        });
        
      } catch (error) {
        throw new Error(error);
      }
    }
}
