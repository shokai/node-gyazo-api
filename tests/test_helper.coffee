process.env.NODE_ENV = 'test'
unless process.env.GYAZO_TOKEN?
  console.error 'ENV Var "GYAZO_TOKEN" required'
  process.exit 1

{assert} = require 'chai'
assert.isUrl = (str) ->
  assert.match str, /^https?:\/\/.+/, "should be URL String"
