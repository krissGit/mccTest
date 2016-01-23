var mongo = require('mongodb');
var Server = mongo.Server,
  Db = mongo.Db, 
  BSON = mongo.BSONPure;

var assert = require('assert');

var server = new Server('localhost', 27017, {
	auto_reconnect : true
});

db = new Db('mccdb', server);

db.open(function(err, db) {
			if (!err) {
				console.log("Connected to 'mccdb' database ");
				db
						.collection(
								'mccItems',
								{
									strict : true
								},
								function(err, collection) {

									if (err) {

										console
												.log("The 'mccItems' collection doesn't exist. Creating it with sample data...");
									}
								});

			}

			else {

				console.log("Not able to open database");
			}
		}

		);

exports.findStateList = function(req, res) {
	
	db.collection('avilableState', function(err, collection) {
		collection.find({ "Status": "1" }).toArray(function(err, items) {
			if (err) {
				res.send({
					'status' : "ERROR",
					'statelist' : items
				});

			} else {
				res.send({
					'status' : "OK",
					'statelist' : items
				});
			}

		});
	});
};

