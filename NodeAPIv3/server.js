var express = require('express');
var app = express();
var log = require('./libs/log')(module);
var config = require('./libs/config');
var HeroModel = require('./libs/mongoose').HeroModel;
// var cors = require('cors');
// const bodyParser = require('body-parser');

// app.use(bodyParser.json());
// app.use(cors());
app.listen(config.get('port'), function () {
	log.info('Express server listening on port ' + config.get('port'));
});
app.get('/api/heroes', function (req, res) {
	return HeroModel.find(function (err, heroes) {
		if (!err) {
			return res.send(heroes);
		} else {
			res.statusCode = 500;
			log.error('Internal error(%d): %s', res.statusCode, err.message);
			return res.send({ error: 'Server error' });
		}
	});
});

app.get('/api/heroes/:id', function (req, res) {
	return HeroModel.findById(req.params.id, function (err, hero) {
		if (!hero) {
			res.statusCode = 404;
			return res.send({ error: 'Not found' });
		}
		if (!err) {
			return res.send({ status: 'OK', hero: hero });
		} else {
			res.statusCode = 500;
			log.error('Internal error(%d): %s', res.statusCode, err.message);
			return res.send({ error: 'Server error' });
		}
	});
});

app.post('/api/heroes', function (req, res) {
	var hero = new HeroModel({
		id: req.body.id,
		name: req.body.name
	});
	hero.save(function (err) {
		if (!err) {
			log.info("hero created");
			return res.send({
				status: 'OK', hero: hero
			});
		} else {
			console.log(err);
			if (err.name == 'ValidationError') {
				res.statusCode = 400;
				res.send({ error: 'Validation error' });
			} else {
				res.statusCode = 500;
				res.send({ error: 'Server error' });
			}
			log.error('Internal error(%d): %s', res.statusCode, err.message);
		}
	});
});

app.put('/api/heroes/:id', function (req, res) {
	return HeroModel.findById(req.params.id, function (err, hero) {
		if (!hero) {
			res.statusCode = 404;
			return res.send({ error: 'Not found' });
		}
		hero.id = req.body.id;
		hero.name = req.body.name;
		return hero.save(function (err) {
			if (!err) {
				log.info("hero updated");
				return res.send({ status: 'OK', hero: hero });
			} else {
				if (err.name == 'ValidationError') {
					res.statusCode = 400;
					res.send({ error: 'Validation error' });
				} else {
					res.statusCode = 500;
					res.send({ error: 'Server error' });
				}
				log.error('Internal error(%d): %s', res.statusCode, err.message);
			}
		});
	});
});

app.delete('/api/heroes/:id', function (req, res) {
	return HeroModel.findById(req.params.id, function (err, hero) {
		if (!hero) {
			res.statusCode = 404;
			return res.send({ error: 'Not found' });
		}
		return hero.remove(function (err) {
			if (!err) {
				log.info("hero removed");
				return res.send({ status: 'OK' });
			} else {
				res.statusCode = 500;
				log.error('Internal error(%d): %s', res.statusCode, err.message);
				return res.send({ error: 'Server error' });
			}
		});
	});
});