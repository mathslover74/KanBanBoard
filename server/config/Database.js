// import { Sequelize } from "sequelize";
 
// const db = new Sequelize('auth_db', 'root', '1234', {
//     host: "localhost",
//     dialect: "mysql"
// });
 
// export default db;
import * as dotenv from 'dotenv'
dotenv.config()
import mysql from 'mysql'

const db = mysql.createConnection({
	// host     : 'localhost',
	// user     : 'root',
	// password : '1234',
	// database : 'nodelogin',
	// host: process.env.HOST || "host.docker.internal",
	host: process.env.HOST ,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.NAME,
});

db.connect(function(err) {
    if(err) throw err;
    console.log("Connected")
})
 
export default db;

