const CryptoJS = require("crypto-js");

const passwordToHash = (password) => {
    return CryptoJS.HmacSHA1(password, process.env.PASSWORD_HASH).toString();
};

module.exports = {
    passwordToHash
}