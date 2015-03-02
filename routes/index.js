var express = require('express');
var router = express.Router();
//var model_user = require("../models/user")();
//var model_user_mssql = require("../db/mssql");
/* GET home page. */
router.get('/', function(req, res) {
	if (req.session.invalido) {
  		res.render('index', { title: 'Email o Contraseña Inválidos' });
	}else{
  		res.render('index');
	}
});


module.exports = router;
