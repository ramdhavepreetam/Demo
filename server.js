var express = require('express');

stylus = require('stylus'),
    logger = require('morgan'),
    bodyParser = require('body-parser');


 var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';
var app = express();


function compoile(str,path){
    return stylus (str).set('filename', path);
}

app.set('views',__dirname + '/server/views');
app.set('view engine','jade');
app.use(logger('dev'));

app.use(bodyParser());

app.use(stylus.middleware({
    src: __dirname + '/public',
    compile: compoile
}));

app.use(express.static(__dirname + '/public'));

app.get('/partials/:partialPath', function(req,res){
    res.render('partials/' + req.params.partialPath);
});
//all request will be handled by this request. 
app.get('*' ,function(req, res){
    res.render('index')
});

var port = 3030;
app.listen(port);
console.log('Server started on port ' + port + '....')

