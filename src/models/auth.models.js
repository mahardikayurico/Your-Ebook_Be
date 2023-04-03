const db = require("../helper/connection");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");

const authModels = {
  login: ({ email, password }) => {
    // console.log(username, password);
    return new Promise((resolve, reject) => {
      db.query(`SELECT * FROM users WHERE email=$1`, [email], (err, result) => {
        //username = unique||email = unique
        if (err) return reject(err.message);
        if (result.rows.length == 0) return reject("email salah."); //ketika username salah
        bcrypt.compare(
          password,
          result.rows[0].password,
          (err, hashingResult) => {
            if (err) return reject(err.message); //kesalahan hashing(bycript)
            if (!hashingResult) return reject("username/password salah."); //ketika password salah
            return resolve(result.rows[0]);
          }
        );
      });
    });
  },
  register: ({ fullname, password, email }) => {
    return new Promise((resolve, reject) => {
      db.query(
        `INSERT INTO users (id, fullname,  password, email) VALUES ('${uuidv4()}','${fullname}','${password}','${email}') RETURNING id`,
        (err, result) => {
          if (err) {
            return reject(err.message);
          }
          return resolve({
            fullname,
            password,
            email,
          });
        }
      );
    });
  },
};
module.exports = authModels;
