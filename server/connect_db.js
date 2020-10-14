const mysql = require('mysql');


var con = mysql.createConnection({
    host: "192.168.1.5",
 //   socketPath: "/var/run/mysqld/mysqld.sock",
    user: "omw",
    password: "root",
    database: "the2app"
  });
  
  
  
  con.connect(function(err) {
    if (err) console.log(err);
   else {console.log("Connected to mysql!");   
  }
  });

module.exports = con;