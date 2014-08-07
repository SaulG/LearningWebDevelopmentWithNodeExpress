//libreria de express
var express = require('express');
//instancia express
var app = express();
//instancia libreria modular ejemplo0
var fortune = require('./lib/fortune');

//hace accesible a cualquiera la carpeta public
app.use(express.static(__dirname+'/public'));


//instancia y configuracion de handlebars
var handlebars = require('express3-handlebars').create({ defaultLayout: 'main'});
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

//asigna puerto
app.set('port', process.env.PORT || 3000);

//verifica si se recibe el parametro de 1 para permitir hacer pruebas
app.use(function(req, res, next){
    res.locals.showTests = app.get('env') !== 'production' &&
	req.query.test === '1';
    next();
});

//pagina principal
app.get('/', function(req, res){
    res.render('home');
});
//about
app.get('/about', function(req, res){
    res.render('about', { 
	fortune: fortune.getFortune(),
	pageTestScript: '/qa/tests-about.js'
    });
});

//RequestGroupRate
app.get('/tours/hood-river', function(req, res){
    res.render('tours/hood-river');
});

app.get('/tours/oregon-coast', function(req, res){
    res.render('tours/oregon-coast');
});

app.get('/tours/request-group-rate', function(req, res){
    res.render('tours/request-group-rate');
});

// custom 404 page
app.use(function(req, res){
    res.status(404);
    res.render('404');
});

// custom 500 page
app.use(function(err, req, res, next){
    console.error(err.stack);
    res.status(500);
    res.render('500');
});

app.listen(app.get('port'), function(){
    console.log( 'Express started on http://localhost:' +
		 app.get('port') + '; press Ctrl-C to terminate.' );
});
