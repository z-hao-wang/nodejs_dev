//var mongoose = require('mongoose');
var _ = require('./underscore_custom')._;
var DBStruct={};
DBStruct.findAll=function(){
	var _r = [
		//{field:'id',tag:'none'},   default requird
		{created_at:new Date,tag:'div'}, 
		{title:'title',tag:'div'}, 
		{body:'body',tag:'div'}, 
		{permission:'everyone',tag:'div'}, 
		{comments:[ //only array allowed inside a multi dimentional thing
			{author:'author',tag:'div'},
			{comment:'comment',tag:'div'}
			]
		,tag:'div'}
		];
	return _r;
};
DBStruct.each=function(callback){
	var _r = this.findAll();
	_.each(_r,function(fieldObj,fieldIdx){
		var field=_.firstKey(fieldObj);
		if(_.isArray(fieldObj[field])){
			_.each(fieldObj[field],function(fieldObj2,idx2){
				field2=_.firstKey(fieldObj2);
				callback(null,{fieldName:field,fieldVal:fieldObj[field],tagName:fieldObj.tag},{fieldName:field2,fieldVal:fieldObj2[field2],tagName:fieldObj2.tag});
			});
		}
		else if(_.isObject(fieldObj[field])){
			//currently not available
		}
		else{
			callback(null,{fieldName:field,fieldVal:fieldObj[field],tagName:fieldObj.tag},null);
		}
	});
};
DBStruct.mongooseStruct=function(){
	var _r = this.findAll();
	var _ret={};
	_.each(_r,function(fieldObj,fieldIdx){
		var field=_.firstKey(fieldObj);
		if(_.isArray(fieldObj[field])){
			var _tmp=[];
			_.each(fieldObj[field],function(fieldObj2,idx2){
				var _tmpObj={};
				field2=_.firstKey(fieldObj2);
				_tmpObj[field2]=fieldObj2.type;
				_tmp.push(_tmpObj);
			});
			_ret[field]=_tmp;
		}
		else if(_.isObject(fieldObj[field])){
			//currently not available
			_ret[field]=fieldObj[field];
		}
		else{
			_ret[field]=fieldObj.type;
		}
	});
	return _ret;
	
};
module.exports=DBStruct;