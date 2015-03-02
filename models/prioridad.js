var client = require("../db")();
var prioridad = function(){
	var respuesta;
	var obj = {};
	obj.find = function(callback){
		client.query('SELECT * from "prioridad"',function(err,result){
			if (err) {
				console.log(err)
			};
			callback(result,err)
		});
	}
	obj.findById = function(id,callback){
		var data ;
		client.query('SELECT * from "prioridad" where id ='+id,function(err,result){
			if (err) {
				console.log(err)
			};
			data = result;
			callback(result,err)
		});
		return data;
	}
	return obj;
}
module.exports = prioridad;