import * as groupModel from "../models/GroupModel.js";

export const viewGroup = (req,res) => {
    groupModel.viewGroup(req, (err,data) => {
      if(err) {
        console.log("view group")
        // console.log(err)
        console.log(data);
        res.status(200).json(data);
      } else if (data.length === 0 ) {
        res.status(200).json({message: "No record found."});
      } else {
        // console.log("group created", data);
        // res.send(data, {message: "No records found"})
        // console.log(data);
        res.status(400).json({message: data})
      }
    })
  }

  export const createGroup = async (req,res) => {
    console.log("create user controller++++++++++++++++++++++++++++++++++++++++++++++++++++++++++")
    console.log(req.body);
    console.log(req.header)
    groupModel.createGroup(req.body, (err,data) => {
      if (err) {
        if(data.message.includes("Duplicate")) {
        res.status(400).json({message:"Duplicate Group Name. Try another Group name"})
        } else {
          res.status(400).json({message: err.message })
        }
        // if (err.errno === 1062) {
        //   res.status(400).json({message: "Error create Group"});
        // }
        // else {
        //   res.status(400).json({message: err.message })
        // }
      } else {
        res.status(200).json(data);
      }
    });
  }

  // export const editGroup = async (req,res) => {
  //   groupModel.editGroup(req.body, req.params.id,(err,data) => {
  //     if (err) {
  //       if (err.errno === 1062) {
  //         res.status(400).json({message: "Error create user"});
  //       }
  //       else {
  //         res.status(400).send({message: err.message })
  //       }
  //     } else {
  //       res.status(200).json(data);
  //     }
  //   });
  // }