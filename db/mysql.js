var mysql = require("mysql");
var db = function(){
	var connection = mysql.createConnection({
	   host: 'localhost',
	   user: 'root',
	   password: '16923509j',
	   database: 'prueba-1',
	   port: 3306
	});

	this.connection = connection;
	this.query = function(query){
		connection.query(query,function(error, result){
		   if(error){
		      throw error;
		   }else{
		      console.log(result);
		   }
		});
	}
	return this;
}