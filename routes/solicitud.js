var express = require('express');
var router = express.Router();
var model_user = require("../models/user")();
var model_prioridad = require("../models/prioridad")();
var model_solicitud = require("../models/solicitud")();


/* GET home page. */
router.get('/', function(req, res) {
	if (req.session.user) {
		model_solicitud.find(function(resultados,error){
			//console.log(resultados.rows)
	  		res.render('solicitud/index',{resultados:resultados.rows});
		})
	}else{
 		res.redirect("/");
	}
});
router.get('/nueva', function(req, res) {
	model_prioridad.find(function(r,err){
		if (req.session.user) {
			//console.log(req.session.user.rows[0].id)
			valores_a_la_vista = {
									prioridad:r.rows,
									usuario_id:req.session.user.rows[0].id
								}

			res.render('solicitud/nueva',valores_a_la_vista);
		}else{
 			res.redirect("/");
		}
	})
});
router.post('/nueva',function(req,res){
	model_solicitud.create(req.body,function(resultados,err){
		if (err) {
			console.log(err)
			res.send({correcto:false,error:err});
		}else{
			res.send({correcto:true,error:err,datos:resultados.rows[0]});
		}
	})
})
router.get("/cambiarstatus/:id",function(req,res){
	model_solicitud.cambiarstatus(req.params.id,function(r,err){
		res.send({resultado:r,error:err});
	})
})

module.exports = router;
