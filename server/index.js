import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import db from "./config/Database.js";
import router from "./routes/index.js";
dotenv.config();
const app = express();
 
app.use(cors({ credentials:true, origin:'http://localhost:3000' }));
app.use(cookieParser());
app.use(express.json());
app.use(function(req, res, next) {
  var err = null;
  try {
      decodeURIComponent(req.path)
  }
  catch(e) {
      err = e;
  }
  if (err){
      console.log(err, req.url);
      res.status(404).json({code:404});
      // return res.redirect(['https://', req.get('Host'), '/404'].join(''));    
  }
  next();
});
app.use(router);



 
app.listen(5000, ()=> console.log('Server running at port 5000'));