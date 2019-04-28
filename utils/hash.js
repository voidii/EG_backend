const hash_rounds = require("../configs/app_configs").hash_rounds
const bcrypt = require('bcrypt');

function hash_password(password){
    return bcrypt.hash(password, hash_rounds)
}

function verify_hash(password, hash){
  return bcrypt.compare(password, hash)
}

module.exports = {
  hash_password,
  verify_hash
}
