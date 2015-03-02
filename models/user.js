var client = require("../db")();
var md5 = require("MD5");
var user = function(){
	var respuesta;
	var obj = {};
	obj.find = function(callback){
		client.query('SELECT * from "usuario"',function(err,result){
			if (err) {
				console.log(err)
			};
			callback(result,err)
		});
	}
	obj.findById = function(id,callback){
		client.query('SELECT * from "usuario" where id='+id,function(err,result){
			if (err) {
				console.log(err)
			};
			callback(result,err)
		});
	}
	obj.create = function(objeto,callback){
		objeto.password = md5(objeto.password);
		obj.isNewEmail(objeto.correo,function(r){
			
			if (r<1) {
				client.query('INSERT INTO "usuario" (correo,password) values ($1,$2)',[objeto.correo,objeto.password],function(err,result){
					if (err) {
						console.log(err)
					};
					callback(result.rows,err)
				});			
			}else{
				callback(null,{respuesta:false,mensaje:"Email repetido"})
			}
		}); 
	}
	obj.delete = function(id,callback){
		client.query('DELETE FROM "usuario" WHERE id = '+id,function(err,result){
			if (err) {
				console.log(err)
			};
			callback(result.rowCount,err)
		});
	}
	obj.changePass = function(id,newpass,callback){
		newpass = md5(newpass);
		client.query('UPDATE "usuario" set password=$1 WHERE id = '+id,[newpass],function(err,result){
			if (err) {
				console.log(err)
			};
			console.log(result)
			callback(result.rowCount,err)
		});
	}
	obj.isNewEmail = function(email,callback){
		
		client.query('select * from "usuario" WHERE correo = $1 ',[email],function(err,result){
			if (err) {
				console.log(err)
			};
			callback(result.rows.length,err);
		});

	}
	obj.login = function(obj,callback){
		console.log(obj)
		password = md5(obj.password);
		email = obj.correo;
		client.query('SELECT * from "usuario" where correo =$1 and password =$2',[email,password],function(err,result){
			if (err) {
				callback(err)
			};
			callback(result)
		});
	}
	return obj;
}
module.exports = user;