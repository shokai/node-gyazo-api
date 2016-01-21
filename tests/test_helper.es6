"use strict";

process.env.NODE_ENV = "test";
if(!process.env.GYAZO_TOKEN){
  console.error('ENV Var "GYAZO_TOKEN" required');
  process.exit(1);
}

import {assert} from "chai";
assert.isUrl = function(str){
  return assert.match(str, /^https?:\/\/.+/, "should be URL String");
}
