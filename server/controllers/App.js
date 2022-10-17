// import Users from "../models/UserModel.js";
import bcrypt from "bcrypt";
import e, { json } from "express";
import jwt from "jsonwebtoken";
// import * as userModel from "../models/UserModel";
import * as userModel from "../models/UserModel.js";
import sql from "../config/Database.js"
import * as appModel from "../models/AppModel.js"
import nodemailer from "nodemailer"

// export const welcome = (req,res) => {
//     res.json(message, "Welcome")
// }

export const welcome = (req,res) =>{
    res.json({message:"welcome"})
  }

// export const createApp = async(req,res) => {
//   appModel.createApp(req.body, (err,data) => {
//     if(err) {
//       if(err.sqlMessage.includes("Duplicate")) {
//         res.status(400).json({message: "Duplicate application"});
//       } else {
//         res.status(400).json({message: err.message })
//       }
//     }else {
//        res.status(200).json(data)
//     }
//   })
// }

export const createApp = async (req,res) => {
  appModel.createApp(req.body, (err,data) => {
    if (err) {
      if (err.sqlMessage.includes("Duplicate")) {
          res.status(400).json({message: "Duplicate application"});
      } else {
        console.log(err)
        res.status(400).json({message: err.message })
      }
    } else {
      res.status(200).json(data);
    }
  });
}

// export const UpdateApp = async (req,res) => {
//   appModel.UpdateApp(req.body, (err,data) => {
//     if (err) {
//       if (err.sqlMessage.includes("Duplicate")) {
//           res.status(400).json({message: "Duplicate application"});
//       } else {
//         console.log(err)
//         res.status(400).json({message: err.message })
//       }
//     } else {
//       res.status(200).json(data);
//     }
//   });
// }

export const UpdateApp = async (req,res) => {
  appModel.UpdateApp(req.body, (err,data) => {
    if (err) {
      res.status(400).json({message: err.message })
    } else {
      res.status(200).json(data);
    }
  });
}

export const getApp = (req,res) => {
  appModel.getApp(req, (err,data) => {
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

export const getOneApp = async (req,res) => {
  appModel.getOneApp(req.body, (err,data) => {

    if(err) {
      console.log(err)
      res.status(400).json(err)
    } else {
      console.log(data)
      res.status(200).json(data)
    }
  });
}

export const createPlan = async (req,res) => {
  appModel.createPlan(req.body, (err,data) => {
    if (err) {
      if (err.sqlMessage.includes("Duplicate")) {
          res.status(400).json({message: "Duplicate Plan"});
      } else {
        console.log(err)
        res.status(400).json({message: err.message })
      }
    } else {
      res.status(200).json(data);
    }
  });
}

export const getPlanByApp = async (req,res) => {
  appModel.getPlanByApp(req.body, (err,data) => {

    if(err) {
      console.log(err)
      res.status(400).json(err)
    } else {
      console.log(data)
      res.status(200).json(data)
    }
  });
}

export const createTask = async (req,res) => {
  appModel.createTask(req.body, (err,data) => {
    if (err) {
      if (err.sqlMessage.includes("Duplicate")) {
          res.status(400).json({message: "Duplicate Task"});
      } else {
        console.log(err)
        res.status(400).json({message: err.message })
      }
    } else {
      res.status(200).json(data);
    }
  });
}

export const addTaskNotes = async (req,res) => {
  appModel.addTaskNotes(req.body, (err,data) => {
    if (err) {
      res.status(400).json({message: err.message })
    } else {
      res.status(200).json(data);
    }
  });
}

export const editPlan = async (req,res) => {
  appModel.editPlan(req.body, (err,data) => {
    if (err) {
      res.status(400).json({message: err.message })
    } else {
      res.status(200).json(data);
    }
  });
}
export const getTaskByApp = async (req,res) => {
  appModel.getTaskByApp(req.body, (err,data) => {

    if(err) {
      console.log(err)
      res.status(400).json(err)
    } else {
      console.log(data)
      res.status(200).json(data)
    }
  });
}

export const promoteTask = async (req,res) => {
  appModel.promoteTask(req.body,(err,data) => {
    if (err) {
      console.log(err)
      res.status(400).json(err)
    } else {
      res.status(200).json(data);
    }
  });
}

export const demoteTask = async (req,res) => {
  appModel.demoteTask(req.body,(err,data) => {
    if (err) {
      console.log(err)
      res.status(400).json(err)
    } else {
      res.status(200).json(data);
    }
  });
}

export const createAudit = async (req,res) => {
  appModel.createAudit(req.body, (err,data) => {
    if (err) {
      // if (err.sqlMessage.includes("Duplicate")) {
      //     res.status(400).json({message: "Duplicate log"});
      // } else {
      //   console.log(err)
      //   res.status(400).json({message: err.message })
      // }
      res.status(400).json({message: err.message })
    } else {
      res.status(200).json(data);
    }
  });
}

export const getAuditBy = async (req,res) => {
  appModel.getAuditBy(req.body, (err,data) => {

    if(err) {
      console.log(err)
      res.status(400).json(err)
    } else {
      console.log(data)
      res.status(200).json(data)
    }
  });
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
        // console.log("signoutttt")
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

 
// export const Logout = async(req, res) => {
//     const refreshToken = req.cookies.refreshToken;
//     if(!refreshToken) return res.sendStatus(204);
//     const user = await Users.findAll({
//         where:{
//             refresh_token: refreshToken
//         }
//     });
//     if(!user[0]) return res.sendStatus(204);
//     const userId = user[0].id;
//     await Users.update({refresh_token: null},{
//         where:{
//             id: userId
//         }
//     });
//     res.clearCookie('refreshToken');
//     return res.sendStatus(200);
// }

//// assignment 3

export const verifyApp = async (req,res,next) => {
  let appName = req.body.app_acronym.trim()
  if (appName) {
    appModel.verifyApp(req.body, (err,data) => {
      if (err) {
        console.log("verify app error")
        console.log(err)
        console.log(data)
      }else if(data.message.includes("not valid")) {
        // res.status(404).json({code : 404, data})
        res.status(404).json({code : 404})
      } else if (data.message.includes("input")) {
        // res.status(411).json({code : 411, data})
        res.status(411).json({code : 411})
      } else {
        console.log("NEXT!!! verify App")
        next()
      }
    });
  } else {
    res.status(411).json({code : 411, message: "Task_app_Acronym Empty"})
  }
}


export const createTask1 = async (req,res) => {
  let taskname = req.body.task_name.trim()
  let rNum = 0
  if (taskname) {
    console.log("task name got things")
    appModel.getAppRNum(req.body, (err,data) => {
      console.log(data)
      console.log(typeof(data))
      if(err) {
        console.log("view user")
        // console.log(err)
        console.log(err);
        // console.log(data)
        // res.status(400).json(err);
      } else {

        rNum = rNum + data
        appModel.getApp2(req.body, (err,data) => {
          console.log("controller NUMMMMMMMMMMMMMMMMMM")
          console.log(data[0].app_rnumber)
          rNum = rNum + data[0].app_rnumber + 1
          console.log(rNum)
          if (data) {
            console.log("create task")
            appModel.createTask1(req.body, rNum, (err,data) => {
          if (err) {
            if (err.sqlMessage.includes("Duplicate")) {
                // res.status(400).json({code : 400});
                res.status(411).json({code : 412, message: err.sqlMessage});
            } else {
              console.log(err)
              res.status(400).json({message: err.message })
            }
          } else {
            res.status(201).json({code: 201, task_id: data});
          }
        });

          } else {
            res.status(404).json({code:404});
          }
        })



        


        // console.log(RNum)
        // console.log(RNum)




        // appModel.createTask1(req.body, data+1, (err,data) => {
        //   if (err) {
        //     if (err.sqlMessage.includes("Duplicate")) {
        //         // res.status(400).json({code : 400});
        //         res.status(411).json({code : 412, message: err.sqlMessage});
        //     } else {
        //       console.log(err)
        //       res.status(400).json({message: err.message })
        //     }
        //   } else {
        //     res.status(201).json({code: 201});
        //   }
        // });



      }
    })

  } else {
    console.log("task name empty")
    res.status(411).json({code: 411 ,message: "Task name Empty"});
  }
  
}

export const getPlanByApp1 = async (req,res,next) => {
  console.log("Hello")
  let plan = req.body.task_plan.trim()

  if(plan) {
    console.log("Plan yes")
    appModel.getPlanByApp1(req.body, (err,data) => { 
      if (err) {
        console.log("check if err true")
        console.log(true)
        res.status(400).json({code: 400, msg: "ERR"})
      } else {
        console.log(data)
        if(data) {
          console.log("Data true")
          console.log("Plan NEXT!!!!!!!!!!!")
          next()
        } else {
          console.log("Data false")
          res.status(404).json({code: 404})
        }
      }
    })

  } else {
    console.log("plan empty")
    console.log("Plan NEXT!!!!!!!!!!!")
    next()
  }
}

      


      

    //   if(err) {
    //     console.log(err)
       
    //   } else {
    //     console.log(data)
    //     if(data) {
    //       console.log("Data true")
    //       next()
    //     } else {
    //       console.log("Plan is false")
    //       res.status(404).json({code: 404, msg: "plan false"})
    //       // res.status(404).json({code: 404, message: "Plan not found"})
    //     }
    //     // console.log(data)
    //   }
    // });



export const getTaskByAppNState = async (req,res) => {
  appModel.getTaskByAppNState(req.body, (err,data) => {
    if(err) {
      console.log(err)
      res.status(400).json(err)
    } else {
      console.log(data)
      res.status(200).json({code: 200 , message:data})
    }
  });
}

export const getApp1 = (req,res,next) => {
  let app_name = req.body.app_acronym.trim()

  if (app_name) {
    console.log("Got things")
    appModel.getApp1(req.body, (err,data) => {
      console.log(data)
      if(err) {
        console.log("get app1 return error")
        // console.log(err)
        console.log(err);
        // res.status(400).json(err);
      } else if (data.length === 0 ) {
        console.log("get app1 return 0")
        res.status(404).json({code:404});
        // res.status(404).json({code:404,message: "App_acronym not found."});
      } else {
        console.log("get app1 return yes")
        console.log("Get app NEXT!!!!")
        // console.log("group created", data);
        // res.send(data, {message: "No records found"})
        // console.log(data);
        next()
        // res.status(200).json(data)
      }
    })
  } else {
    console.log("Empty")
     res.status(411).json({code: 411});
  }
  

}

export const checkState = (req,res,next) => {

  let taskState = req.body.task_state.trim()
  // let taskname = req.body.task_name.trim()

  console.log("check state")
  console.log(req.body)
  console.log(req.body.task_state)
  let arr = ["open","todolist","doing","done","close"]
  let match = false
  for (let i = 0; i<arr.length; i++) {
    if (arr[i] == req.body.task_state) {
      console.log("Match state")
      match = true
      // next()
    } else {
    }
  }
  console.log(match)

  if (taskState) {
    if (match) {
      console.log(true)
      next()
    } else {
      console.log(false)
      // res.status(400).json({code:400, message:"Invalid_state"})
      res.status(400).json({code:400})
    }
  }else {
    res.status(411).json({code:411})
  }


  
}

export const PromoteTask2Done = async (req,res) => {
  appModel.PromoteTask2Done(req.body,(err,data) => {
    if (err) {
      console.log(err)
      res.status(400).json(err)
    } else {

      appModel.getTaskName(req.body ,(err,data) => {
        if(err) {
          console.log(err)
          res.status(400).json(err)
        } else {
          console.log("GETtaskNAme Return %%%%%%%%%%%%%%%%%%%%%%%%%")
          let taskName = data
          console.log(data)
          console.log(taskName)

          main(req.body.username, "validUser@hotmail.com", "PL@hotmail.com", taskName).catch(console.error)
          res.status(200).json({code:200})

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
          
        }
      })




      
      // userModel.getAllUserEmail("Project_Lead", (err,data) => {
        
        
      //   if (err) {
      //     console.log(err)
      //     res.status(400).json(err)
      //   } else {
      //     console.log(data)
      //     let receiverEmail = []
  
      //     // let receiverEmail = data.result.reduce((prev, current) => prev + `${current.email},`, "")
      //     // console.log(receiverEmail)
      //     // console.log(data[0])
      //     for (const e of data ){
      //       // console.log(e.email)
      //       receiverEmail.push(e.email)
      //     }

      //     console.log("Email.............")
      //     // console.log(body)
      //     console.log(receiverEmail)
          
          

          



      //   }
      // });



      // res.status(200).json(data);
      // res.status(200).json({code:200, message:"Task successfully promoted to done"})
      
    }
  });
}

export const getTask = async (req,res, next) => {
  console.log(req.body)
  let taskname = req.body.task_id.trim()
  
  if(taskname) {
    appModel.getTask(req.body, (err,data) => {
      // console.log(data)
      if(err) {
        console.log(err)
        res.status(400).json(err)
      } else {
        if(data.length > 0) {
          console.log(data[0].task_state)
          if(data[0].task_state == "doing") {
            console.log("Next get task!!!!!!!!!!!")
            next()
          } else {
            console.log("Current state not at doing")
            // res.status(406).json({code: 406 , message:"Current state is not at 'doing'"})
            res.status(406).json({code: 406})
  
          }
        } else {
          // res.status(404).json({code: 404 , message:"Task name not found"})
          res.status(404).json({code: 404})
        }
        // console.log(data)
      }
    });
  } else {
    // res.status(411).json({code: 411 , message:"Task_name Empty"})
    res.status(411).json({code: 411})
  }
}

export const getTask2 = async (req,res, next) => {
  console.log(req.body)
  let taskname = req.body.app_acronym.trim()
  if(taskname) {
    appModel.getTask2(req.body, (err,data) => {
      // console.log(data)
      if(err) {
        console.log(err)
        res.status(400).json(err)
      } else {
        if(data.length > 0) {
          console.log(data[0].task_state)
          res.status(411).json({code: 411})
        } else {
          // res.status(404).json({code: 404 , message:"Task name not found"})
          next()
        }
        // console.log(data)
      }
    });
  } else {
    // res.status(411).json({code: 411 , message:"Task_name Empty"})
    res.status(411).json({code: 411})
  }
}

export const error = (req, res) => {
  console.log(res.head)
  console.log(req.path)
  let err = null
  res.status(400).json({code : 400})
  // res.status(400).json({code : 400, message: "Invalid URL"})
  // res.json({msg: "GG.com"})
}

export const checkapi1 = (req, res,next) => {
  if(req.body.username && req.body.password && req.body.app_acronym && req.body.task_name) {
    console.log("all mandatory in")
    next()
  } else {
    console.log("mandatory missing")
    res.status(400).json({code:400})
  }
}

export const checkapi2 = (req, res,next) => {

  if(req.body.username && req.body.password && req.body.app_acronym && req.body.task_state) {
    console.log("all mandatory in")
    next()
  } else {
    console.log("mandatory missing")
    res.status(400).json({code:400})
  }
}

export const checkapi3 = (req, res, next) => {

  if(req.body.username && req.body.password && req.body.task_id) {
    console.log("all mandatory in")
    next()
  } else {
    console.log("mandatory missing")
    res.status(400).json({code:400})
  }
}


// export const error1 = (req, res,next) => {
//   console.log(req)
//   console.log("HELLLLLLLLLLLLLLLLLO")
//   let err = null
//   console.log(req.originalUrl)
//   console.log(decodeURIComponent(req.path))
//   let decode = decodeURIComponent(req.path)
//   try {
//     decodeURIComponent(req.path)
//   } catch (e) {
//     err = e
//   }
//   if (err) {
//     res.status(400).json({code : 400})
//   } 
//   next()
//   // res.status(400).json({code : 400, message: "Invalid URL"})
//   // res.json({msg: "GG.com"})
// }