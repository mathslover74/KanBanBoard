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

export const checkGroup = async (req, res) => {
    console.log("HEHHHHHHHHHHHHHHHHHHHHHH")
    console.log(req.username)
    console.log(req.group_name)
    sql.query(
      `
      SELECT username, group_name from accounts where username = '${req.username}';
      `, (err, result) => {
        console.log("check group result")
        console.log(result[0])
        console.log(result.length)
        if (err) {
          res(err, null)
        } else if(result.length > 0 ){
          // if(result.)
          console.log("Model check group")
          console.log(result[0].group_name)
          if(result[0].group_name) {
            if(result[0].group_name.includes(req.group_name)) {
              res(null, {message: true})
            } else {
              res(null, {message: false})
            }
          } else {
            res(null, {message: false})
          }
        } else {
          res(null, {message: false})
        }
        // if(result.length > 0) {
        //   console.log("More than 1")
        //   res(err, result)
        // }

          // if(result.length > 0) {
          //   if (err) {
          //     res(err, {message: errno});
          //   } else {
          //     console.log("view user list");
          //     console.log(result.length);
          //     // return result
          //     res(result,result);
          //   }
          // } else {
          //   res({message: "Not in group"})
          // }
        }
      );
  };

  export const viewOneUser = async (req, res) => {
    console.log("HEHHHHHHHHHHHHHHHHHHHHHH")
    console.log(req.username)
    sql.query(
      `
      select username, email, group_name from accounts where username = '${req.username}';
      `, (err, result) => {
        console.log("view one user model")
        console.log(result)
        if (err) {
          res(err, {message: errno});
        } else {
          if(result.length > 0) {
            res(null,result)
          } else {
            res(null, {message: "No user found"})
          }
        }
      });
  };

export const viewUser = async (req, res) => {
    sql.query(
      `
      SELECT * FROM accounts;
      `, (err, result) => {
        if (err) {
          res(err, {message: errno});
        }else if (result.length == 0) {
          res(null , "No user record found");
        } else {
          console.log("view user list");
          console.log(result.length);
          // return result
          res(null ,result);
        }
      });
  };

  export const createUser = async (req, res) => {
    bcrypt.hash(req.password,10).then((hash) => {
    //   console.log(hash);
      sql.query(
        `
        INSERT INTO accounts (username, password, email, status)
        VALUES ('${req.username}', '${hash}','${req.email}', "1")
        `,
        (err, res1) => {
          if (err) {
            res(err, {message: err.sqlMessage});
          } else {
            res(null, {
              message: "Account created successfully" ,
            //   result: true
            });
          }
        }
      )
    })
  }

  export const editUser = async (req,id, res) => {
    (req.password) ?
    bcrypt.hash(req.password,10).then((hash) => {
      sql.query(
        `
        UPDATE accounts 
        SET password = '${req.password}', email='${req.email}' ,status = ${req.status}, group_name =${req.group_name}
        WHERE username = '${id}';
        `,
        (err, res1) => {
          if (err) {
            res(err, {message: err.sqlMessage});
          } else {
            res(null, {
              message: "Account Edited" ,
              // result: true
            });
          }
        }
      )
    })
    :
    sql.query(
      `
      UPDATE accounts 
      SET email='${req.email}' ,status = ${req.status}, group_name =${req.group_name}
      WHERE username = '${id}';
      `,
      (err, res1) => {
        if (err) {
          res(err, {message: err.sqlMessage});
        } else {
          res(null, {
            message: "Account Edited" ,
            // result: true
          });
        }
      }
    )
  }

  export const assignGroup = (req, res) => {
    console.log("model assign group")
    console.log(req.username)
    sql.query(
      `      
      UPDATE accounts 
      SET group_name = '${req.group}'
      WHERE username = '${req.username}';
      `,
      (err, res1) => {
        if (err) {
            console.log(err)
          res(err, {message: err.sqlMessage});
        } else {
          res(null, {
            message: "Group Edited" ,
            // result: true
          });
        }
      }
    )
  }
  
  export const login = (req, res) => { 
    let username = req.username
    let password = req.password
    console.log(req)
  
    console.log("model user login")
    sql.query(
      `
      SELECT * FROM accounts WHERE username = ('${req.username}');
      `, (err, result) => {
        // console.log(result[0].username)
        // res({message: result[0]})
        
        if (err) {
          res(err, {message: err.sqlMessage});
        }
  
        if (username && password) {
          // if(err) {
          //   res(err, {message:err.sqlMessage});
          // } else 
          if(result.length === 0) {
            res({message:"Incorrect Username and/or Password"});
          } else if (result[0].status === 0) {
            res({message: "Incorrect Username and/or Password"})
          } else {
            bcrypt.compare(password, result[0].password, function (err, pwresult) {
              console.log(`result ${pwresult}`)
              if(pwresult) {
                console.log("true reach");
                const username = result[0].username;
                const email = result[0].email;
                
                const accessToken = jwt.sign(
                    {username, email}, 
                    process.env.ACCESS_TOKEN_SECRET,
                    {expiresIn: '15s'}
                    );
                
                const refreshToken = jwt.sign(
                    {username, email}, 
                    process.env.REFRESH_TOKEN_SECRET,
                    {expiresIn: '1d'});
                
                result[0].access_token = accessToken
                result[0].refresh_token = refreshToken
                sql.query(
                    `
                    UPDATE accounts 
                    SET refresh_token = '${refreshToken}'
                    WHERE username = '${req.username}';
                    `
                )
                console.log("model loggin")
                console.log(result[0])
                // req.session.user = result[0].username;
                // req.session.loggedin = true;
                // req.session.username = username;
                // console.log(result[0])
                res(result[0])
              } else {
                res({message:"Incorrect Username and/or Password"});
              }
            })
          }
        } else {
          res({message: "Please enter username/password"})
        }
  
        // if (err) {
        //   res(err, {message: err.sqlMessage});
        // } else if (result.length === 0){
        //   res({message: "Incorrect username"})
        // } else {
        //   res({message: result[0]})
        // }
  
        // res({message:"hello user"})
        // res(result, result)
  
        // if (err) {
        //   res(err, {message: err.sqlMessage});
        // } else if (result.length === 0) {
        //   res(null , "Incorrect Username and/or Password");
        // } else if (result.status === 0) {
        //   res({message: "Account deactived please contact admin"})
        // // } else if (!isMatch){
        // //   res(null , "Incorrect Username and/or Password");
        // // } else if (isMatch) {
        // //   console.log(`${req.username} data returned`);
        // //   console.log(result.length);
        // //   res(result,result);
        // } else {
        //   res({message: "Please enter username and password"})
        // }
      }
    )
  
  }