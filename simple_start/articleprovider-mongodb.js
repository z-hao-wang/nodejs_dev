var Db = require('mongodb').Db;
var Connection = require('mongodb').Connection;
var Server = require('mongodb').Server;
var BSON = require('mongodb').BSON;
var ObjectID = require('mongodb').ObjectID;
var Local={
	dbName:'test',
	mongoHost:'localhost',
	mongoPort:27017,
	mongoUser:'',
	mongoPasswd:''
}
var MongHQ={
	dbName:'hawkDev',
	mongoHost:'alex.mongohq.com',
	mongoPort:10078,
	mongoUser:'test',
	mongoPasswd:'mongotest'
}
//var Config=Local;
var Config=MongHQ;
ArticleProvider = function() {
  //this.db= new Db('test', new Server(host, port, {auto_reconnect: true,safe:false}, {}));
  this.db= new Db(Config.dbName, new Server(Config.mongoHost, Config.mongoPort, {auto_reconnect: true}, {}),{safe:false});
  this.db.open(function(err,data){
     if(data && Config.mongoUser != ""){
        data.authenticate(Config.mongoUser, Config.mongoPasswd,function(err2,data2){
             if(data2){
                 console.log("Database opened");
             }
             else{
                 console.log(err2);
             }
         });
      }
      else{
           console.log(err);
      }
   });
};

//addCommentToArticle

ArticleProvider.prototype.addCommentToArticle = function(articleId, comment, callback) {
  this.getCollection(function(error, article_collection) {
    if( error ) callback( error );
    else {
      article_collection.update(
        {_id: article_collection.db.bson_serializer.ObjectID.createFromHexString(articleId)},
        {"$push": {comments: comment}},
        function(error, article){
          if( error ) callback(error);
          else callback(null, article)
        });
    }
  });
};

//getCollection

ArticleProvider.prototype.getCollection= function(callback) {
  this.db.collection('articles', function(error, article_collection) {
    if( error ) callback(error);
    else callback(null, article_collection);
  });
};

//findAll
ArticleProvider.prototype.findAll = function(callback) {
    this.getCollection(function(error, article_collection) {
      if( error ) callback(error)
      else {
        article_collection.find().toArray(function(error, results) {
          if( error ) callback(error)
          else callback(null, results)
        });
      }
    });
};

//findById

ArticleProvider.prototype.findById = function(id, callback) {
    this.getCollection(function(error, article_collection) {
      if( error ) callback(error)
      else {
        article_collection.findOne({_id: article_collection.db.bson_serializer.ObjectID.createFromHexString(id)}, function(error, result) {
          if( error ) callback(error)
          else callback(null, result)
        });
      }
    });
};

//save
ArticleProvider.prototype.save = function(articles, callback) {
    this.getCollection(function(error, article_collection) {
      if( error ) callback(error)
      else {
        if( typeof(articles.length)=="undefined")
          articles = [articles];

        for( var i =0;i< articles.length;i++ ) {
          article = articles[i];
          article.created_at = new Date();
          if( article.comments === undefined ) article.comments = [];
          for(var j =0;j< article.comments.length; j++) {
            article.comments[j].created_at = new Date();
          }
        }

        article_collection.insert(articles, function() {
          callback(null, articles);
        });
      }
    });
};
exports.ArticleProvider=ArticleProvider;