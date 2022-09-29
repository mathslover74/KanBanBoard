// import Users from "../models/UserModel.js";
import bcrypt from "bcrypt";
import { json } from "express";
import jwt from "jsonwebtoken";
// import * as userModel from "../models/UserModel";
import * as userModel from "../models/UserModel.js";
import sql from "../config/Database.js"
import nodemailer from "nodemailer"

// export const welcome = (req,res) => {
//     res.json(message, "Welcome")
// }

export const welcome = (req,res) =>{
    res.json({message:"welcome"})
  }

  export const checkGroup = async (req,res) => {
    userModel.checkGroup(req.body, (err,data) => {

      if(err) {
        console.log(err)
        res.json(err)
      } else {
        console.log(data)
        res.json(data)
      }


      
      // if(err) {
      //   console.log(err)
      //   console.log("Err check group")
      //   res.json({err})
      // } else {
      //   console.log(data)
      //   console.log("check group data")
      //   if(data.length > 0) {
      //     // if()
      //     res.status(200).json({message: false})
      //     // console.log(data.message.includes("Not in Group"))
      //   } else {
      //     console.log("L = 0 ")
      //     console.log(data)
      //     res.status(200).json({message: false})
      //   }
      // }



      // if (err) {
      //   console.log(err)
      //   console.log(err.message)
      //   console.log(err.message.includes("Not in group"))
      //   console.log("Checkgroup err")
      //   console.log("Checkgroup err2")
      //   console.log(err[0].group_name.includes(`${req.body.group_name}`))
      //   if(err.message.includes("Not in group")) {
      //     res.status(200).json({msg: false});
      //   }er


      //     // res.send({msg:"hello"})
      //     if (err[0].group_name.includes(`${req.body.group_name}`)) {
      //       console.log("in group")
      //       res.status(200).json({msg: true});
      //     } else {
      //       res.status(200).json({msg: false});
      //     }
      // } else {
      //   console.log("check group control")
      //   console.log(data)
      //   res.status(400).send({msg: false})
      // }
    }
    );
  }

// export const checkGroup = async (req,res) => {
//   userModel.checkGroup(req, (err,data) => {
//     if(err) {
//       console.log("view user")
//       // console.log(err)
//       console.log(data);
//       res.status(200).json(data);
//     } else if (data.length === 0 ) {
//       res.status(200).json({message: "No record found."});
//     } else {
//       // console.log("group created", data);
//       // res.send(data, {message: "No records found"})
//       // console.log(data);
//       res.status(400).json({message: data})
//     }
//   })
// }


export const viewOneUser = async (req,res) => {
  userModel.viewOneUser(req.body, (err,data) => {

    if(err) {
      console.log(err)
      res.json(err)
    } else {
      console.log(data)
      res.json(data)
    }
  });
}

export const viewUser = (req,res) => {
    userModel.viewUser(req, (err,data) => {
      if(err) {
        console.log("view user")
        // console.log(err)
        console.log(err);
        res.status(400).json(err);
      } else if (data.length === 0 ) {
        res.status(200).json({message: "No record found."});
      } else {
        // console.log("group created", data);
        // res.send(data, {message: "No records found"})
        // console.log(data);
        res.status(200).json(data)
      }
    })
  }

  export const createUser = async (req,res) => {
    userModel.createUser(req.body, (err,data) => {
      if (err) {
        if (err.sqlMessage.includes("Duplicate")) {
          if(err.sqlMessage.includes("username")) {
            res.status(400).json({message: "Duplicate username"});
          } else {
            res.status(400).json({message: "Duplicate email"});
          }
        } else {
          console.log(err)
          res.status(400).json({message: err.message })
        }
      } else {
        res.status(200).json(data);
      }
    });
  }

  export const getAllUserEmail = async (req,res) => {
    userModel.getAllUserEmail(req.body, (err,data) => {
      if (err) {
        console.log(err)
        res.status(400).json(err)
        // if (err.errno) {
        //   res.status(400).json({message: "Error edit user"});
        // }
        // else {
        //   res.status(400).send({message: err.message })
        // }
      } else {
        res.status(200).json(data);
      }
    });
  }

  export const sendEmail = async (req,res) => {
    userModel.getAllUserEmail(req.body, (err,data) => {
      if (err) {
        console.log(err)
        res.status(400).json(err)
      } else {
        console.log(data)
        let receiverEmail = []

        // let receiverEmail = data.result.reduce((prev, current) => prev + `${current.email},`, "")
        // console.log(receiverEmail)
        // console.log(data[0])
        for (const e of data ){
          // console.log(e.email)
          receiverEmail.push(e.email)
        }
        console.log(receiverEmail)
        main(req.body.username, req.body.email, receiverEmail, req.body.task).catch(console.error)
        
        
        res.status(200).json(data);
      }
    });
  }

  // exports.sendEmail = async (req, res) => {
  //   User.retrieveAllUserEmail(req.body, (err, data) => {
  //     if (err) {
  //       res.send({
  //         message: "No user",
  //         result: false,
  //       })
  //     } else {
  //       console.log("test")
  //       var receiverEmail = data.result.reduce((prev, current) => prev + `${current.email},`, "")
  
  //       main(req.body.username, req.body.email, receiverEmail, req.body.task).catch(console.error)
  
  //       res.send({ Message: "Email Sent", result: true })
  //     }
  //   })
  // }
  async function main(username, senderEmail, receiverEmail, taskid) {
    // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing
    let testAccount = await nodemailer.createTestAccount()
    console.log("receipient:", receiverEmail)
    // create reusable transporter object using the default SMTP transport
  
    var transporter = nodemailer.createTransport({
      host: "smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "3002c4b07fb2a5",
        pass: "7f03abba198860",
      },
    })
    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: `${username} 👻 ${senderEmail}`, // sender address
      to: `${receiverEmail}`, //"bar@example.com, baz@example.com", // list of receivers
      subject: `Task ${taskid} Completion ✔`, // Subject line
      text: `${username} has finish the task on '${new Date().toUTCString()}'`, // plain text body
      html: `${username} has finish the task on ${new Date().toUTCString()}`, // html body
    })
  
    console.log("Message sent: %s", info.messageId)
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
  
    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info))
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
  }

  export const editUser = async (req,res) => {
    userModel.editUser(req.body, req.params.id,(err,data) => {
      if (err) {
        console.log(err)
        res.status(400).json(err)
        // if (err.errno) {
        //   res.status(400).json({message: "Error edit user"});
        // }
        // else {
        //   res.status(400).send({message: err.message })
        // }
      } else {
        res.status(200).json(data);
      }
    });
  }

  export const assignGroup = async (req,res) => {
    userModel.assignGroup(req.body,(err,data) => {
      if (err) {
        if (err.errno === 1062) {
          res.status(400).json({message: "Error Group user"});
        }
        else {
          res.status(400).send({message: err.message })
        }
      } else {
        res.status(200).json(data);
      }
    });
  }

  export const login = (req, res) => {
    userModel.login(req.body, (data,err) => {
      console.log("login reach")
      if (err) {
        console.log("login error")
        console.log(err)
        res.status(400).json({message: err.message})
      } 
      else if(data.message){
        console.log("login error 2")
        res.status(400).json(data)
      } 
      else {
        console.log("login error 3");
        console.log("login session");
        // console.log(req.session.username);
        // console.log(req.session)
        res.cookie('refreshToken', 
        data.refresh_token,{
          httpOnly: true,
          maxAge: 24 * 60 * 60 * 1000
        });
        // req.session.username = data.username;
        // console.log(data.username)
        // if(data.username == "admin") {
        //   req.session.admin = true
        // } else {
        //   req.session.admin = false
        // }
        res.status(200).json(data)
        console.log(data)
      }
    })
  }


 
// export const getUsers = async(req, res) => {
//     try {
//         const users = await Users.findAll({
//             attributes:['id','name','email']
//         });
//         res.json(users);
//     } catch (error) {
//         console.log(error);
//     }
// }
 


// export const Register = async(req, res) => {
//     const { name, email, password, confPassword } = req.body;
//     if(password !== confPassword) return res.status(400).json({msg: "Password and Confirm Password do not match"});
//     const salt = await bcrypt.genSalt();
//     const hashPassword = await bcrypt.hash(password, salt);
//     try {
//         await Users.create({
//             name: name,
//             email: email,
//             password: hashPassword
//         });
//         res.json({msg: "Registration Successful"});
//     } catch (error) {
//         console.log(error);
//     }
// }


// export const Login = async(req, res) => {
//     try {
//         const user = await Users.findAll({
//             where:{
//                 email: req.body.email
//             }
//         });
//         const match = await bcrypt.compare(req.body.password, user[0].password);
//         if(!match) return res.status(400).json({msg: "Wrong Password"});
//         const userId = user[0].id;
//         const name = user[0].name;
//         const email = user[0].email;
//         const accessToken = jwt.sign({userId, name, email}, process.env.ACCESS_TOKEN_SECRET,{
//             expiresIn: '15s'
//         });
//         const refreshToken = jwt.sign({userId, name, email}, process.env.REFRESH_TOKEN_SECRET,{
//             expiresIn: '1d'
//         });
//         await Users.update({refresh_token: refreshToken},{
//             where:{
//                 id: userId
//             }
//         });
//         res.cookie('refreshToken', refreshToken,{
//             httpOnly: true,
//             maxAge: 24 * 60 * 60 * 1000
//         });
//         res.json({ accessToken });
//     } catch (error) {
//         res.status(404).json({msg:"Email not found"});
//     }
// }

export const signout = async(req, res) => {

  // console.log("login before clear session````````````````````````")
  // console.log(req.session)
  // console.log(req.session.username)
  // req.session.destroy();
  // res.send({message: "logged out"})
  // console.log(req.session)

  const refreshToken = req.cookies.refreshToken;
  if(!refreshToken) {
    res.status(200).json({msg: "logged out"});
  } else {
    sql.query(
      `
      SELECT * FROM accounts where refresh_Token = '${refreshToken}';
      `,
      (err, result) => {
        console.log("signoutttt")
        // console.log(result[0].username)
        if(err) {
          res.status(400).json(err)
        } else if (result.length === 0) {
          res.status(400).json(err)
        } else {
          sql.query(
            `
            UPDATE accounts 
            SET refresh_token = null
            WHERE username = '${result[0].username}';
            `
        )
        res.clearCookie('refreshToken');
        res.status(200).json({msg: "logged out"})
      }
    })
  }
}

/// assignment 3
export const verifyUser = (req, res, next) => {
  userModel.verifyUser(req.body, (data,err) => {
    const message = data.message
    if(data.message.includes("Invalid")) {
      // res.status(401).json({code : 401, message})
      res.status(401).json({code : 401})
    } else if (data.message.includes("Disable",message)) {
      res.status(403).json({code : 403})
      // res.status(403).json({code : 403,message})
    } else if (data.message.includes("Empty")) {
      // res.status(411).json({code : 411,message})
      res.status(411).json({code : 411})
    } else {
      console.log("NEXT! for user")
      next()
    }
  })
}

