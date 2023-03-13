require("dotenv").config();


// Required by bcrypt
const SECRET_KEY = process.env.SECRET_KEY || 'my weak (!!) secret key which we are not going to use because I defined SECRET_KEY in dotenv';
const BCRYPT_WORK_FACTOR = 12;  // determines "strength" of hashing

module.exports = {
    SECRET_KEY,
    BCRYPT_WORK_FACTOR
};