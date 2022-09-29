// import { Sequelize } from "sequelize";
// import db from "../config/Database.js";
 
// const { DataTypes } = Sequelize;
 
// const Users = db.define('users',{
//     name:{
//         type: DataTypes.STRING
//     },
//     email:{
//         type: DataTypes.STRING
//     },
//     password:{
//         type: DataTypes.STRING
//     },
//     refresh_token:{
//         type: DataTypes.TEXT
//     }
// },{
//     freezeTableName:true
// });
 
// (async () => {
//     await db.sync();
// })();
 
// export default Users;

import response from "express"
import sql from "../config/Database.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";
// import session from 'express-session'

export const viewGroup = async (req, res) => {
    sql.query(
      `
      SELECT * FROM group_name;
      `, (err, result) => {
        if (err) {
          res(err, {message: errno});
        }else if (result.length == 0) {
          res(null , "No group record found");
        } else {
          console.log("view group list");
          console.log(result.length);
          // return result
          res(result ,result);
        }
      });
  };

  export const createGroup = async (req, res) => {
    sql.query(
      `
      INSERT INTO group_name (group_name) 
      VALUES (?)
      `,
      [
        req.group_Name
      ],
      (err, res1) => {
        if (err) {
          res(err, {message: err.sqlMessage});
        } else {
          res(null, {
            message: "group created successfully" ,
          //   result: true
          });
        }
      }
    )
  }

  // export const editGroup = (req,id, res) => {
  //   sql.query(
  //     `
  //     UPDATE accounts 
  //     SET password = '${req.password}', email='${req.email}' ,status = ${req.status}
  //     WHERE username = '${id}';
  //     `,
  //     (err, res1) => {
  //       if (err) {
  //         res(err, {message: err.sqlMessage});
  //       } else {
  //         res(null, {
  //           message: "Account Edited" ,
  //           // result: true
  //         });
  //       }
  //     }
  //   )
  // }