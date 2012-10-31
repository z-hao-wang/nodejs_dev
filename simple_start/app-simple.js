var express = require('express');
var _ = require('./underscore_custom')._;
require('./articleprovider-memory');
var DBStruct=require('./DBStruct');
var app = module.exports = express();
app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(require('stylus').middleware({ src: __dirname + '/public' }));
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

var articleProvider= new ArticleProvider('locahost',27017);

app.get('/', function(req, res){
	//console.log('req');
    articleProvider.findAll( function(error,docs){
		//console.log('req1');
		//console.log(error);
		if(error) res.send(error);
		res.send(docs);
		/*
        res.render('index.jade', {
            title: 'Blog',
            articles:docs
            });
			*/
		//console.log('docs',docs);
    });
});
//new
app.get('/new', function(req, res) {
	var dataToSave={};
	var tmp="";
	
	DBStruct.each(function(error,fobj1,fobj2){
		if(_.isObject(fobj2)){
			//if(!dataToSave[fobj1.fieldName])
			//	dataToSave[fobj1.fieldName]=[];
			//dataToSave[fobj1.fieldName][fobj2.fieldName]=req.param(fobj2.fieldName);
		}
		else{
			dataToSave[fobj1.fieldName]=req.param(fobj1.fieldName);
		}
	});
	articleProvider.save(dataToSave,function(error,docs){
		if(error) res.send(JSON.stringify(error));
		res.send(JSON.stringify(docs));
	});
	
    
});
console.log("listening to 8000");
app.listen(8000);