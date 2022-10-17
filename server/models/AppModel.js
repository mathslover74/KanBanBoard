import response from "express"
import sql from "../config/Database.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";
import validator from 'validator'
// import session from 'express-session'

export const createApp = async (req, res) => {
  //   console.log(hash);
  sql.query(
    `
    INSERT INTO application (
      app_acronym, app_description, app_rnumber, 
      app_startdate, app_enddate, 
      app_permit_create, app_permit_open, app_permit_todolist,
      app_permit_doing,app_permit_done) 
      VALUES 
      (?,?,?,?,?,?,?,?,?,?)
    `,      
    [req.app_acronym, req.app_description , req.app_rnumber,
        req.app_startdate,req.app_enddate,
      req.app_permit_create,req.app_permit_open,req.app_permit_todolist,
        req.app_permit_doing,req.app_permit_done]
        ,
      (err, res1) => {
        if (err) {
          res(err, {message: err.sqlMessage});
        } else {
          res(null, {
            message: 'Application created successfully' ,
          //   result: true
          });
        }
      }
    )
}

export const UpdateApp = async (req, res) => {
  //   console.log(hash);

  sql.query(`
  UPDATE application 
  SET 
  app_description=?, 
  app_startdate=?, 
  app_enddate=?,
  app_permit_create=?, 
  app_permit_open=?, 
  app_permit_todolist=?, 
  app_permit_doing=?, 
  app_permit_done=? 
  WHERE app_acronym=?`, 
  [
    req.app_description, 
    req.app_startdate, 
    req.app_enddate,
    req.app_permit_create, 
    req.app_permit_open,
    req.app_permit_todolist,
    req.app_permit_doing,
    req.app_permit_done,
    req.app_acronym], 
      (err, res1) => {
        if (err) {
          res(err, {message: err.sqlMessage});
        } else {
          res(null, {
            message: 'Application edit successfully' ,
          //   result: true
          });
        }
      }
    )
}

export const getApp = async (req, res) => {
  sql.query(
    `
    SELECT * FROM application;
    `, (err, result) => {
      if (err) {
        res(err, {message: errno});
      }else if (result.length == 0) {
        res(null , "No application record found");
      } else {
        console.log("view application list");
        console.log(result.length);
        // return result
        res(null ,result);
      }
    });
};

export const getOneApp = async (req, res) => {
  console.log("what is req", req)
  sql.query(
    `
    select * from application where app_acronym = '${req.app_acronym}';
    `, (err, result) => {
      console.log("view one app model")
      console.log(result)
      if (err) {
        console.log("error")
        res(err, {message: errno});
      } else {
        if(result.length > 0) {
          console.log("here")
          res(null,result)
        } else {
          console.log("not here")
          res(null, {message: "No record found"})
        }
      }
    });
};

export const createPlan = async (req, res) => {
  //   console.log(hash);
  sql.query(
    `
    INSERT INTO plan (
      plan_mvp_name,plan_startdate,plan_enddate,plan_app_acronym,plan_color) 
      VALUES 
      (
        '${req.plan_mvp_name}','${req.plan_startdate}', '${req.plan_enddate}',
       (SELECT app_acronym FROM application WHERE app_acronym = '${req.plan_app_acronym}' ),
       '${req.plan_color}'
      );
    `,
      (err, res1) => {
        if (err) {
          res(err, {message: err.sqlMessage});
        } else {
          res(null, {
            message: 'Application created successfully' ,
          //   result: true 
          });
        }
      }
    )
}

export const getPlanByApp = async (req, res) => {
  // let plan = req.task_plan.trim()
  console.log(req)
  sql.query(
    `
    SELECT * FROM plan WHERE plan_app_acronym = '${req.app_acronym}' && plan_mvp_name = '${req.task_plan}';
    `, (err, result) => {
      console.log("getplanmodal^^^^^^^^^^^^^^^^^^^^^")
      console.log(result)
      if (err) {
        res(err, {message: errno});
      } else {
        if(result.length > 0) {
          res(null,result)
          // res(null,result)
        } else {
          // res(null, {message: "No record found"})
          res(null, result)
        }
      }
    });
};

export const getPlanByApp1 = async (req, res) => {
  // let plan = req.task_plan.trim()
  console.log(req)
  sql.query(
    `
    SELECT * FROM plan WHERE plan_app_acronym = '${req.app_acronym}' && plan_mvp_name = '${req.task_plan}';
    `, (err, result) => {
      console.log("getplanmodal^^^^^^^^^^^^^^^^^^^^^")
      console.log(result)
      if (err) {
        res(err, {message: errno});
      } else {
        if(result.length > 0) {
          res(null,result)
          // res(null,result)
        } else {
          // res(null, {message: "No record found"})
          res(null, false)
        }
      }
    });
};
// const createApplication = (req, response) => {
//   sql.query(
//     `
//     INSERT INTO application (
//       app_acronym, app_description, app_rnumber, app_startDate, app_endDate, 
//       app_permit_Create, app_permit_Open, app_permit_toDoList, app_permit_Doing, app_permit_Done) 
//       values(?,?,?,?,?,?,?,?,?,?)`, 
//       [req.body.app_acronym, req.body.app_description, req.body.app_rnumber, 
//         req.body.app_startDate, req.body.app_endDate, req.body.app_permit_Create, req.body.app_permit_Open, 
//         req.body.app_permit_toDoList, req.body.app_permit_Doing, req.body.app_permit_Done], (err, result) => {
//     if (err) {
//       response.send({ message: err.sqlMessage, result: false })
//     } else {
//       response.send({ message: "Application Created", result: true })
//     }
//   })
// }

export const createTask = async (req, res) => {
  //   console.log(hash);
  // let taskID = `${req.task_app_acronym}_${req.}`  
  sql.query(
    `
      INSERT INTO task (
        task_name, task_description, task_notes, 
        task_id,
        task_plan,
        task_app_acronym,
        task_state,
        task_creator,task_owner, task_createdate) 
        VALUES 
        (?,?,?,
          ?,
          ?,
          ?,
          ?,
          ?,?,?)`,
        [req.task_name , req.task_description , req.task_notes,
        req.task_id,
        req.task_plan,
        req.task_app_acronym,
        'open',
        req.task_creator,req.task_owner, req.task_createdate
        ]
    ,
      (err, res1) => {
        if (err) {
          res(err, {message: err.sqlMessage});
        } else {
          res(null, {
            message: 'Task created successfully' ,
          //   result: true
          });
        }
      }
    )
}

// export const createTask = async (req, res) => {
//   //   console.log(hash);
//   // let taskID = `${req.task_app_acronym}_${req.}`  
//   sql.query(
//     `
//       INSERT INTO task (
//         task_name, task_description, task_notes, 
//         task_id,
//         task_plan,
//         task_app_acronym,
//         task_state,
//         task_creator,task_owner, task_createdate) 
//         VALUES 
//         (?,?,?,?,?,?,?,?,?,?)
//         [('${req.task_name}' , '${req.task_description}' , '${req.task_notes}','${req.task_id}',
//         (SELECT plan_mvp_name FROM plan WHERE plan_mvp_name = '${req.task_plan}'),
//         (SELECT app_acronym FROM application WHERE app_acronym = '${req.task_app_acronym}'),
//         'open',
//         '${req.task_creator}','${req.task_owner}', '${req.task_createdate}'
//         )]
//     `,
//       (err, res1) => {
//         if (err) {
//           res(err, {message: err.sqlMessage});
//         } else {
//           res(null, {
//             message: 'Task created successfully' ,
//           //   result: true
//           });
//         }
//       }
//     )
// }

export const addTaskNotes = async (req, res) => {
  //   console.log(hash);
  // let taskID = `${req.task_app_acronym}_${req.}`  
  sql.query(
    `
    UPDATE task 
    SET task_notes = ?
    WHERE task_name = ?
    `,
    [
      req.task_notes,
      req.task_name
    ],
      (err, res1) => {
        if (err) {
          res(err, {message: err.sqlMessage});
        } else {
          res(null, {
            message: 'Note added successfully' ,
          //   result: true
          });
        }
      }
    )
}

export const editPlan = async (req, res) => {
  //   console.log(hash);
  // let taskID = `${req.task_app_acronym}_${req.}`  
  sql.query(
    `
    UPDATE task 
    SET task_plan = ?
    WHERE task_name = ?
    `,
    [
      req.task_plan,
      req.task_name
    ],
      (err, res1) => {
        if (err) {
          res(err, {message: err.sqlMessage});
        } else {
          res(null, {
            message: 'edit plan successfully' ,
          //   result: true
          });
        }
      }
    )
}

export const getTaskByApp = async (req, res) => {
  sql.query(
    `
    SELECT * FROM task WHERE task_app_acronym = '${req.task_app_acronym}';
    `, (err, result) => {
      if (err) {
        res(err, {message: errno});
      } else {
        if(result.length > 0) {
          res(null,result)
        } else {
          res(null, {message: "No record found"})
        }
      }
    });
};

export const promoteTask = async (req, res) => {
  let arr = ["open","todolist","doing","done","close"]
  let num = 0

  for (let i = 0; i<arr.length-1; i++) {
    if(arr[i]===req.state) {
      num = i+1
      console.log(num)
    }
  }

  if(num === 0) {
    console.log("return nothing to be done")
    res({message: "nothing to be done"});
  } else {
    sql.query(
      `
      UPDATE task 
      SET 
      task_state = '${arr[num]}',
      task_owner = '${req.task_owner}',
      task_notes = '${req.task_notes}'
      WHERE task_name = '${req.task_name}';
      `,
      (err, res1) => {
        console.log(res1)
        if (err) {
          res(err, {message: err.sqlMessage});
        } else {
          res(null, {
            message: "State Promoted" ,
            // result: true
          });
        }
      }
    )
  }
}

export const demoteTask = async (req, res) => {
  let arr = ["open","todolist","doing","done","close"]
  let num = 0
  console.log(req.task_owner)

  for (let i = 1; i<arr.length; i++) {
    if(arr[i]===req.state) {
      num = i-1
      console.log(num)
    }
  }

  if(num === 0) {
    console.log("return nothing to be done")
    res({message: "nothing to be done"});
  } else {
    sql.query(
      `
      UPDATE task 
      SET 
      task_state = '${arr[num]}',
      task_owner = '${req.task_owner}',
      task_notes = '${req.task_notes}'
      WHERE task_name = '${req.task_name}';
      `,
      (err, res1) => {
        console.log(res1)
        if (err) {
          res(err, {message: err.sqlMessage});
        } else {
          res(null, {
            message: "State Demoted" ,
          });
        }
      }
    )
  }
}

export const createAudit = async (req, res) => {
  //   console.log(hash);
  sql.query(
    `
    INSERT INTO audit_log (
    login_userid, current_state,time_stamp,task_name,note) 
    VALUES 
    ('${req.login_userid}','${req.current_state}','${req.time_stamp}','${req.task_name}','${req.note}'
    );
    `,
      (err, res1) => {
        if (err) {
          res(err, {message: err.sqlMessage});
        } else {
          res(null, {
            message: 'Audit Log created successfully' ,
          //   result: true
          });
        }
      }
    )
}

export const getAuditBy = async (req, res) => {
  sql.query(
    `
    SELECT * FROM audit_log where task_name = '${req.task_name}';
    `, (err, result) => {
      if (err) {
        res(err, {message: errno});
      } else {
        if(result.length > 0) {
          res(null,result)
        } else {
          res(null, {message: "No record found"})
        }
      }
    });
};


// export const getAuditBy = async(req,res) => {
  
// }

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
        }
      );
  };

  export const editUser = async (req,id, res) => {
    (req.password) ?
    bcrypt.hash(req.password,10).then((hash) => {
      sql.query(
        `
        UPDATE accounts 
        SET password = '${hash}', email='${req.email}' ,status = ${req.status}, group_name =${req.group_name}
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
      }
    )
  
  }

////assignment 3
export const verifyApp = async (req, res) => {
  console.log("what is req", req)
  if(req.app_acronym) {
    sql.query(
      `
      select * from application where app_acronym = '${req.app_acronym}';
      `, (err, result) => {
        console.log("view one app model")
        console.log(result)
        console.log(err)
        console.log("verify app modal")
        if (err) {
          res(err,{message: errno})
        }else if(result.length > 0) {
          console.log("here")
          res(null, {message: "Task ok to create"})
        } else {
          console.log("not here")
          res(null,{message: "Application not valid"})
        }
      });
  } else {
    res(null,{message:"app_acronym require input"})
  }
};

export const createTask1 = async (req,Rnum, res) => {
  let plan = req.task_plan.trim()
  console.log("Create Task 1")
  // console.log(Rnum)
  //   console.log(hash);
  // let taskID = `${req.task_app_acronym}_${req.}`  
  // let creationDate = moment(Date.now()).format("YYYY-MM-DD, HH:mm:ss")
  let creationDate = ("2022-09-27, 00:00:00")
  console.log(`${req.app_acronym}_${Rnum}`)
  let new_app_acronym = `${req.app_acronym}_${Rnum}`
  sql.query(
    `
      INSERT INTO task (
        task_name, task_description, task_notes, 
        task_id,
        task_plan,
        task_app_acronym,
        task_state,
        task_creator,task_owner, task_createdate) 
        VALUES 
        (?,?,?,
          ?,
          ?,
          ?,
          ?,
          ?,?,?)`,
        [
          req.task_name , req.task_description , req.task_notes,
          new_app_acronym,
          plan,
          req.app_acronym,
          'open',
          req.username,req.username, creationDate
        ]
    ,
      (err, res1) => {
        if (err) {
          res(err, {message: err.sqlMessage});
        } else {
          res(null, new_app_acronym
          //   {
          //   message: 'Task created successfully' ,
          // //   result: true
          // }
          );
        }
      }
    )
}


export const getAppRNum = async (req, res) => {
  console.log(req)
  console.log(req.app_acronym)
  sql.query(
    `
    SELECT * FROM task WHERE task_app_acronym = '${req.app_acronym}';
    `, (err, result) => {
      console.log(result)
      console.log("*********************")
      if (err) {
        res(err, {message: errno});
      } else {
        if(result.length > 0) {
          res(null,result.length)
        } else {
          res(null, 0)
        }
      }
    });
};

export const getPlanNameByApp = async (req, res) => {
  console.log("get plan name by app")
  let plan = req.task_plan.trim()
  sql.query(
    `
    SELECT * FROM plan WHERE plan_app_acronym = '${req.app_acronym}' && plan_mvp_name = '${req.task_plan}' ;
    `, (err, result) => {
      if (err) {
        res(err, {message: errno});
      } else {
        if(result.length > 0) {
          res(null,true)
        } else {
          res(null, false)
        }
      }
    });
};

export const getTaskByAppNState = async (req, res) => {
  console.log("get task by app and state")
  console.log(req)
  sql.query(
    `
    SELECT * FROM task WHERE task_app_acronym = '${req.app_acronym}' && task_state = '${req.task_state}';
    `, (err, result) => {
      if (err) {
        res(err, {message: errno});
      } else {
        console.log(result)
        if(result.length > 0) {
          res(null,result)
        } else {
          res(null, "No record found")
        }
      }
    });
};


export const getApp1 = async (req, res) => {
  console.log(req)
  sql.query(
    `
    SELECT * FROM application where app_acronym = '${req.app_acronym}';
    `, (err, result) => {
      console.log("get app modal result")
      console.log(result)
      if (err) {
        res(err, {message: errno});
      }else if (result.length == 0) {
        res(null , result);
      } else {
        console.log("view application list");
        console.log(result.length);
        // return result
        res(null ,result);
      }
    });
};

export const getApp2 = async (req, res) => {
  console.log(req)
  sql.query(
    `
    SELECT * FROM application where app_acronym = '${req.app_acronym}';
    `, (err, result) => {
      console.log("get app2 modal result")
      console.log(result)
      if (err) {
        res(err, {message: errno});
      }else if (result.length == 0) {
        res(null , result);
      } else {
        console.log("view application list");
        console.log(result.length);
        // return result
        res(null ,result);
      }
    });
};

export const PromoteTask2Done = async (req, res) => {

    sql.query(
      `
      UPDATE task 
      SET 
      task_state = 'done'
      WHERE task_id = '${req.task_id}';
      `,
      (err, res1) => {
        console.log(res1)
        if (err) {
          res(err, {message: err.sqlMessage});
        } else {
          res(null, {
            message: "State Promoted" ,
            // result: true
          });
        }
      }
    )

  // let arr = ["open","todolist","doing","done","close"]
  // let num = 0

  // for (let i = 0; i<arr.length-1; i++) {
  //   if(arr[i]===req.state) {
  //     num = i+1
  //     console.log(num)
  //   }
  // }

  // if(num === 0) {
  //   console.log("return nothing to be done")
  //   res({message: "nothing to be done"});
  // } else {
  //   sql.query(
  //     `
  //     UPDATE task 
  //     SET 
  //     task_state = '${arr[num]}',
  //     task_owner = '${req.task_owner}',
  //     task_notes = '${req.task_notes}'
  //     WHERE task_name = '${req.task_name}';
  //     `,
  //     (err, res1) => {
  //       console.log(res1)
  //       if (err) {
  //         res(err, {message: err.sqlMessage});
  //       } else {
  //         res(null, {
  //           message: "State Promoted" ,
  //           // result: true
  //         });
  //       }
  //     }
  //   )
  // }
}

export const getTask = async (req, res) => {
  console.log("get task")
  console.log(req)
  sql.query(
    `
    SELECT * FROM task WHERE task_id = '${req.task_id}';
    `, (err, result) => {
      if (err) {
        res(err, {message: errnof});
      } else {
        // console.log(result)
        if(result.length > 0) {
          res(null,result)
        } else {
          res(null, result)
        }
      }
    });
};

export const getTask2 = async (req, res) => {
  console.log("get task2")
  console.log(req)
  sql.query(
    `
    SELECT * FROM task WHERE task_name = '${req.task_name}';
    `, (err, result) => {
      if (err) {
        res(err, {message: errno});
      } else {
        console.log("get task 2 %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%")
        console.log(result)
        if(result.length > 0) {
          res(null,result)
        } else {
          res(null, result)
        }
      }
    });
};

export const getTaskName = (req, res) => {
  console.log("get task")
  console.log(req)
  sql.query(
    `
    SELECT * FROM task WHERE task_id = '${req.task_id}';
    `, (err, result) => {
      if (err) {
        res(err, {message: errnof});
      } else {
        console.log("Get task NAME 000000000000000000000000000")
        console.log(result)
        console.log(result[0])

        if(result.length > 0) {
          // return result[0].task_name
          res(null,result[0].task_name)
        } else {
          // return result[0].task_name
          res(null, result[0].task_name)
        }
      }
    });
};

