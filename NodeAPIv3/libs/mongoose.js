var mongoose = require('mongoose');
var log = require('./log')(module);

mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);


var db = mongoose.connection;
var config = require('./config');
mongoose.connect(config.get('mongoose:uri'));

db.on('error', function (err) {
	log.error('connection error:', err.message);
});

db.once('open', function callback() {
	log.info("Connected to DB!");
});

var Schema = mongoose.Schema; // Schemas 

var Hero = new Schema({
	id: { type: Number, required: true },
	name: { type: String, required: true },
}); // validation 

var HeroModel = mongoose.model('Hero', Hero);
module.exports.HeroModel = HeroModel;