var express = require('express');
var app = express();
var log = require('./libs/log')(module);
app.get('/api', function (req,res){
  res.send('API is running');
});

app.listen(1337, function() {
  log.info('Server started at port 1337');
});
app.get('/ErrorExample', function(req, res, next) { 
  next(newError('Random error!')); 
});

app.get('/api/articles', function(req, res) { 
  res.send('This is not implemented now'); 
});

app.post('/api/articles', function(req, res) { 
  res.send('This is not implemented now'); 
});

app.get('/api/articles/:id', function(req, res) { 
  res.send('This is not implemented now'); });

app.put('/api/articles/:id', function (req, res) { 
  res.send('This is not implemented now'); 
}); 

app.delete('/api/articles/:id', function (req, res) {
   res.send('This is not implemented now'); 
});
app.use(function(req, res, next) { 
  res.status(404); 
  log.debug('Not found URL: ' + req.url); 
  res.send({ error:'Not found' }); 
  return next(); 
});
app.use(function(err, req, res, next){ 
  res.status(err.status || 500); 
  log.error('Internal error(' + res.statusCode + '): ' + err.message);
  res.send({ error:err.message }); 
  return next(); 
});