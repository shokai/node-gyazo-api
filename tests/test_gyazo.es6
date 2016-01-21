/* global describe it */
"use strict";

import "./test_helper";
import fs from "fs";
import {assert} from "chai";
import Gyazo from "../"

const img_path = `${__dirname}/test.jpg`

describe("GYAZO_TOKEN", function(){

  it("should have ENV var GYAZO_TOKEN", function(){
    assert.isString(process.env.GYAZO_TOKEN);
  });

});

describe("\"upload\" method", function(){

  const gyazo = new Gyazo(process.env.GYAZO_TOKEN);

  it("should upload image", function(){
    this.timeout(10000);
    return gyazo
      .upload(img_path)
      .then((res) => {
        assert.isObject(res.response);
        assert.isString(res.data.image_id);
        assert.isUrl(res.data.permalink_url);
        assert.isUrl(res.data.url);
      });
  });

  it("should upload image from stream", function(){
    this.timeout(10000);
    return gyazo
      .upload(fs.createReadStream(img_path))
      .then((res) => {
        assert.isObject(res.response);
        assert.isString(res.data.image_id);
        assert.isUrl(res.data.permalink_url);
        assert.isUrl(res.data.url);
      });
  });

});

describe("\"list\" method", function(){

  const gyazo = new Gyazo(process.env.GYAZO_TOKEN);

  it("should return list of images", function(){
    this.timeout(3000);
    return gyazo
      .list({ page: 1, per_page: 5 })
      .then((res) => {
        assert.isObject(res.response);
        assert.isArray(res.data);
        assert.lengthOf(res.data, 5);
        assert.isString(res.data[0].image_id);
        assert.isUrl(res.data[0].permalink_url);
        assert.isUrl(res.data[0].url);
        assert.equal(res.response.headers['x-current-page'], 1);
        assert.equal(res.response.headers['x-per-page'], 5);
      });
  });

});

describe("\"delete\" method", function(){

  const gyazo = new Gyazo(process.env.GYAZO_TOKEN);

  it("should delete uploaded image", function(){
    this.timeout(10000);
    var image_id_uploaded = null;
    return gyazo
      .upload(img_path)
      .then((res) => {
        image_id_uploaded = res.data.image_id;
        return res.data.image_id;
      })
      .then((id) => {
        return gyazo.delete(id);
      })
      .then((res) => {
        assert.equal(res.data.image_id, image_id_uploaded);
      });

  });
});
