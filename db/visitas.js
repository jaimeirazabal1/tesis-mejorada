var db = function(para){
	var pg = require('pg');
	var conString = "postgres://postgres:jakeli@192.168.0.26:5432/visitantes";
	var client = new pg.Client(conString);
	client.connect(function(err) {
		if(err) {
			return console.error('could not connect to postgres', err);
		}
		
	});

	return client;
}


module.exports = db;