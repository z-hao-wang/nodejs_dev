var articleCounter = 1;
var DBStruct=require('./DBStruct');
var _ = require('./underscore_custom')._;
ArticleProvider = function(){};

ArticleProvider.prototype.dummyData = [];

ArticleProvider.prototype.findAll = function(callback) {
  callback( null, this.dummyData )
};

ArticleProvider.prototype.findById = function(id, callback) {
  var result = null;
  for(var i =0;i<this.dummyData.length;i++) {
    if( this.dummyData[i]._id == id ) {
      result = this.dummyData[i];
      break;
    }
  }
  callback(null, result);
};

ArticleProvider.prototype.save = function(articles, callback) {
  var article = null;

  if( typeof(articles.length)=="undefined")
    articles = [articles];

  for( var i =0;i< articles.length;i++ ) {
    article = articles[i];
	article._id = articleCounter++; //dummy data id
	DBStruct.each(function(error,fobj1,fobj2){
		if(_.isObject(fobj2)){
			if(typeof(article[fobj1.fieldName])!='undefined' && 
			typeof(article[fobj1.fieldName][fobj2.fieldName])!='undefined'){//do nothing
			}
			else{
				if(typeof(article[fobj1.fieldName]) == 'undefined'){
					article[fobj1.fieldName]=[];
				} //if no input, give empty array
				//article[fobj1.fieldName][fobj2.fieldName] = fobj2.fieldVal;
			}
		}
		else{
			article[fobj1.fieldName]=article[fobj1.fieldName] || fobj1.fieldVal;
		}
	});
    this.dummyData[this.dummyData.length]= article;
  }
  callback(null, articles);
};

// Lets bootstrap with dummy data 
new ArticleProvider().save([
  {title: 'Post one', body: 'Body one', comments:[{author:'Bob', comment:'I love it'}, {author:'Dave', comment:'This is rubbish!'}]},
  {title: 'Post two', body: 'Body two'},
  {title: 'Post three', body: 'Body three'}
], function(error, articles){});

exports.ArticleProvider = ArticleProvider;
