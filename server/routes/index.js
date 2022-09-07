import express from "express";
// import { getUsers, Register, Login, Logout ,welcome } from "../controllers/Users.js";
import * as userController from "../controllers/Users.js";
import * as groupController from "../controllers/Groups.js";
import { verifyToken } from "../middleware/VerifyToken.js";
import { refreshToken } from "../controllers/RefreshToken.js";
 
const router = express.Router();
 
router.get('/', userController.welcome);
///User API
// router.get("/viewUser", userController.viewUser);
router.get("/viewUser", verifyToken,userController.viewUser);
router.post("/viewOneUser", verifyToken,userController.viewOneUser);
router.post("/createUser", verifyToken,userController.createUser);
router.post("/editUser/:id",verifyToken, userController.editUser);
router.post("/assignGroup", userController.assignGroup);

///Login/out token
router.get('/token', refreshToken);
router.post("/login", userController.login);
router.get("/signout", userController.signout);

///Group api
router.post("/checkGroup", userController.checkGroup);
router.post("/createGroup", verifyToken,groupController.createGroup);
router.get("/viewGroup", verifyToken,groupController.viewGroup);

// router.get('/users', verifyToken, userContoller.getUsers);
// router.post('/users', userContoller.Register);
// router.post('/login', userContoller.Login);
// router.delete('/logout', userContoller.Logout);


 
export default router;