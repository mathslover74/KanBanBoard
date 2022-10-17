import express from "express";
// import { getUsers, Register, Login, Logout ,welcome } from "../controllers/Users.js";
import * as userController from "../controllers/Users.js";
import * as groupController from "../controllers/Groups.js";
import * as appController from "../controllers/App.js";
import { verifyToken } from "../middleware/VerifyToken.js";
import { refreshToken } from "../controllers/RefreshToken.js";
 
const router = express.Router();

const errorHandler = (error, request, response, next) => {
  console.log("Reach error handler")
  response.json({ code: 400, message: "Invalid URL" });
};

// const errorHandler = (error, request, response, next) => {
//   response.send({ code: 600, Message: error.message });
// };
router.get('/', userController.welcome);

///User API
router.get("/viewUser", userController.viewUser);
router.get("/viewUser", verifyToken,userController.viewUser);
router.post("/viewOneUser", verifyToken,userController.viewOneUser);
router.post("/createUser", verifyToken,userController.createUser);
router.post("/editUser/:id",verifyToken, userController.editUser);
// router.get("/viewUser", userController.viewUser);
// router.post("/viewOneUser", userController.viewOneUser);
// router.post("/createUser", userController.createUser);
// router.post("/editUser/:id", userController.editUser);


router.post("/assignGroup", userController.assignGroup);
router.post("/getAllUserEmail", userController.getAllUserEmail);
router.post("/sendEmail", userController.sendEmail);

///Login/out token
router.get('/token', refreshToken);
router.post("/login", userController.login);
router.get("/signout", userController.signout);

///Group api
router.post("/checkGroup", userController.checkGroup);
// router.post("/createGroup", verifyToken,groupController.createGroup);
// router.get("/viewGroup", verifyToken,groupController.viewGroup);
router.post("/createGroup", groupController.createGroup);
router.get("/viewGroup", groupController.viewGroup);

/// Application API

router.post("/App", verifyToken,appController.createApp);
router.get("/App", verifyToken,appController.getApp);
router.post("/UpdateApp", verifyToken,appController.UpdateApp);
router.post("/OneApp", verifyToken,appController.getOneApp);
router.post("/createPlan", verifyToken,appController.createPlan);
router.post("/getOnePlan", verifyToken,appController.getPlanByApp);
router.post("/createTask", verifyToken,appController.createTask);
router.post("/getTaskByApp", verifyToken,appController.getTaskByApp);
router.post("/addTaskNotes", verifyToken,appController.addTaskNotes);
router.post("/editPlan", verifyToken,appController.editPlan);
router.post("/promoteTask", verifyToken,appController.promoteTask);
router.post("/demoteTask", verifyToken,appController.demoteTask);
router.post("/createAudit", verifyToken,appController.createAudit);
router.post("/getAuditBy", verifyToken,appController.getAuditBy);

// router.post("/App", appController.createApp);
// router.get("/App", appController.getApp);
// router.post("/UpdateApp", appController.UpdateApp);
// router.post("/OneApp", appController.getOneApp);
// router.post("/createPlan", appController.createPlan);
// router.post("/getOnePlan", appController.getPlanByApp);
// router.post("/createTask", appController.createTask);
// router.post("/getTaskByApp", appController.getTaskByApp);
// router.post("/addTaskNotes", appController.addTaskNotes);
// router.post("/editPlan", appController.editPlan);
// router.post("/promoteTask", appController.promoteTask);
// router.post("/demoteTask", appController.demoteTask);
// router.post("/createAudit", appController.createAudit);
// router.post("/getAuditBy", appController.getAuditBy);

// router.get('/users', verifyToken, userContoller.getUsers);
// router.post('/users', userContoller.Register);
// router.post('/login', userContoller.Login);
// router.delete('/logout', userContoller.Logout);

/// Assignment 3

router.post("/api/CreateTask",[appController.checkapi1,userController.verifyUser, appController.verifyApp, appController.getPlanByApp1,appController.getTask2],appController.createTask1 );
// router.post("/api/CreateTask",[appController.getPlanByApp1] );
router.post("/api/GetTaskbyState",[appController.checkapi2,userController.verifyUser,appController.getApp1, appController.checkState],appController.getTaskByAppNState );
// router.post("/api/GetTaskbyState",[appController.getApp1]);
router.post("/api/PromoteTask2Done",[appController.checkapi3,userController.verifyUser, appController.getTask],appController.PromoteTask2Done );
router.post("/api/*", appController.error)
// router.post("/api/PromoteTask2Done",appController.getTask );
// router.use("/", errorHandler)

// router.use("/api", errorHandler)

export default router;
