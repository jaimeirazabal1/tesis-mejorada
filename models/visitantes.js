var client = require("../db/visitas")();

var user = function(){
	var respuesta;
	var obj = {};
	obj.find = function(callback){
		client.query('SELECT * from "visitantes"',function(err,result){
			if (err) {
				console.log(err)
			};
			callback(result,err)
		});
	}
	return obj;
}
module.exports = user;