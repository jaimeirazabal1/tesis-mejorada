var express = require('express');
var router = express.Router();
var model_user = require("../models/user")();

/* GET users listing. */
router.get('/', function(req, res) {
	model_user.find(function(r,err){
		if (req.session.user) {
 			res.render('users/index',{usuarios:r.rows,saludo:"Usuarios"});
		}else{
 			res.redirect("/");
		}
	})
});
router.get("/getting",function(req, res){
	model_user.find(function(r,err){
		if (req.session.user) {
 			res.send('users/index',{usuarios:r.rows});
		}
	})
})
router.post('/crear', function(req, res) {
	model_user.create(req.body,function(a,err){
		if (!err) {
			model_user.find(function(r,erro){
				if (!erro) {
	 				res.send({usuarios:r.rows,saludo:"Usuarios",respuesta:true});
				};
	 		})
		}
		else
		{
			model_user.find(function(r,erro){
				if (!erro) {
			 		res.send({usuarios:r.rows,saludo:"Usuarios",respuesta:err.respuesta,mensaje:err.mensaje});
			 	}
		 	})
		}
	})
});

router.get("/eliminar/:id",function(req,res){
	if (req.params.id) {
		model_user.delete(req.params.id,function(r,err){
			if (r>=1) {
				res.send({usuarios:r.rows,saludo:"Usuarios",respuesta:true});
			}else{
				res.send({respuesta:false});
			}
		})
	};
});

router.post("/cambioclave/:id",function(req,res){
	if (req.params.id) {
		model_user.changePass(req.params.id,req.body.password,function(r,err){
			if (r>=1) {
				res.send({respuesta:true});
			}else{
				res.send({respuesta:false});
			}
		})
	};
});

router.post("/login",function(req, res){

	model_user.login(req.body,function(r,err){
		if (err) {
			console.log(err);
		}else{
			if (r.rows.length) {
				req.session.user = r;
				req.session.invalido = false;

				res.redirect("/users/");
			}else{
				req.session.user = false;
				req.session.invalido = true;
				res.redirect("/");
			}
		}

	})
})
router.get("/logout",function(req,res){
	delete req.session.user
	console.log(req.session)
	res.redirect("/");
})

module.exports = router;
