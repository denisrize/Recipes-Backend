var mysql = require('mysql');
require("dotenv").config();


const config={
connectionLimit:4,
  host: process.env.host,//"localhost"
  user: process.env.user,//"root"
<<<<<<< HEAD
  password: process.env.password,
  database:process.env.db
}

=======
  password: "pass_root@123",
  database:"mydb"
}
>>>>>>> b3c6175371eb7db6219c009a6bc52a7eb3f1345f
const pool = new mysql.createPool(config);

const connection =  () => {
  return new Promise((resolve, reject) => {
  pool.getConnection((err, connection) => {
<<<<<<< HEAD
    if (err){
      reject(err);
      console.log(err)
    }
=======
    if (err) reject(err);
>>>>>>> b3c6175371eb7db6219c009a6bc52a7eb3f1345f
    console.log("MySQL pool connected: threadId " + connection.threadId);
    const query = (sql, binding) => {
      return new Promise((resolve, reject) => {
         connection.query(sql, binding, (err, result) => {
           if (err) reject(err);
           resolve(result);
           });
         });
       };
       const release = () => {
         return new Promise((resolve, reject) => {
           if (err) reject(err);
           console.log("MySQL pool released: threadId " + connection.threadId);
           resolve(connection.release());
         });
       };
       resolve({ query, release });
     });
   });
 };
const query = (sql, binding) => {
  return new Promise((resolve, reject) => {
    pool.query(sql, binding, (err, result, fields) => {
      if (err) reject(err);
      resolve(result);
    });
  });
};
module.exports = { pool, connection, query };






