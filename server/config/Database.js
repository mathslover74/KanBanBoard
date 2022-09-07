// import { Sequelize } from "sequelize";
 
// const db = new Sequelize('auth_db', 'root', '1234', {
//     host: "localhost",
//     dialect: "mysql"
// });
 
// export default db;

import mysql from 'mysql'

const db = mysql.createConnection({
	host     : 'localhost',
	user     : 'root',
	password : '1234',
	database : 'nodelogin',
});

db.connect(function(err) {
    if(err) throw err;
    console.log("Connected")
})
 
export default db;

