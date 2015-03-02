
var db = function(para){
	var pg = require('pg');
	var conString = "postgres://jaime:16923509j@localhost:5432/app-tesis";
	var client = new pg.Client(conString);
	client.connect(function(err) {
		if(err) {
			return console.error('could not connect to postgres', err);
		}
		
	});

	return client;
}


module.exports = db;