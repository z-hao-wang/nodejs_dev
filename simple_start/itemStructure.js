ItemStructure={};
ItemStructure.dbFields=new Array();
ItemStructure.dbField=function(){
	_fieldName=fName || "title";
	_tagName=tName||"div";
	return {
		get:function(){
			return {
			fieldName:_fieldName,
			tagName:_tagName
			}
		},
		update:function(fName,tName){
			if(typeof(fName)!="undefined"){
				_fieldName=fName;
			}
			_tagName=tName||'div';
		},
		create:function(fName,tName){
			if(typeof(fName)!="undefined"){
				_fieldName=fName;
			}
			_tagName=tName||'div';
		}
	}
};
