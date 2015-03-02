var client = require("../db")();
var solicitud = function(){
	var respuesta;
	var obj = {};
	obj.find = function(callback){
		client.query('SELECT solicitud.id,solicitud.descripcion,solicitud.fecha,solicitud.activo,solicitud.solicitante,solicitud.telefono_solicitante,solicitud.ubicacion,usuario.id as usuario_id,usuario.correo,prioridad.descripcion as prioridad from "solicitud" inner join usuario on solicitud.usuario_id = usuario.id inner join prioridad on solicitud.prioridad_id = prioridad.id order by fecha desc',function(err,result){
			if (err) {
				console.log(err)
			};
			callback(result,err)
		});
	}
	obj.create = function(objeto,callback){
		//objeto.password = md5(objeto.password);	
		client.query('INSERT INTO "solicitud" (prioridad_id,descripcion,fecha,usuario_id,activo,solicitante,telefono_solicitante,ubicacion) values ($1,$2,$3,$4,$5,$6,$7,$8)',[objeto.prioridad_id,objeto.descripcion,objeto.fecha,objeto.usuario_id,objeto.activo,objeto.solicitante,objeto.telefono_solicitante,objeto.ubicacion],function(err,result){
			if (err) {
				console.log(err)
			}else{

				obj.lastId(function(resultado,error){
					if (error) {
						console.log(error)
					};
					callback(resultado,error)
				})
			}
			// callback(result,err)
			//console.log(result)
		});			
		
	}
	obj.lastId = function(callback){
		client.query('SELECT * from "solicitud" order by id desc limit 1',function(err,result){
			if (err) {
				console.log(err)
			};
			//console.log(err)
			callback(result,err)
		});	
	}
	obj.cambiarstatus = function(id,callback){
		obj.getById(id,function(resultado,error){
			if (error) {
				console.log(error)
			};
			var valor = resultado.rows[0];
			if (valor.activo) {
				client.query("UPDATE solicitud set activo = 'f' where id ="+id,function(err,r){
					if (err) {console.log(err)};
					callback(r,err)
				});
			}else{
				client.query("UPDATE solicitud set activo = 't' where id ="+id,function(err,r){
					if (err) {console.log(err)};
					callback(r,err)
				});
			}
		})
	}
	obj.getById = function(id,callback){
		client.query('SELECT * from solicitud where id = '+id,function(err,result){
			if (err) {
				console.log(err)
			};
			callback(result,err)
		});
	}
	return obj;
}
module.exports = solicitud;