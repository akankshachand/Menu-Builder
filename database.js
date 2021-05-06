var mysql = require('mysql');

//MySQL connection details
var conn = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: 'Petals.1103',
	database: 'menu',
	multipleStatements: true
});

conn.connect(function(err){
	if(!err)
		console.log('Connection Established Successfully');
	else
		console.log('Connection Failed!'+ JSON.stringify(err,undefined,2));
});

module.exports = conn;