var Observer = function(object) {
	for(let key in object){
		this[key] = object[key];
		if (obj.hasOwnProperty(key)) {
            val = obj[key];
            // 这里进行判断，如果还没有遍历到最底层，继续new Observer
            if (typeof val === 'object') {
                new Observer(val);
            }
            
        }
	}
	this.conver = function(key,val,callback){
		Reflect.defineProperty(this, key, { 
        	set: function(newVal) {
        		callback(newVal);        		
	            if (newVal === val) return;
	            val = newVal
        	} 
        })
	}
    this.$watch = function(key, callback) {
    	this.convert(key, this[key], callback);
       
    }
}

var app1 = new Observer();
app1.$watch('age', function(age) {
         console.log(`我的年纪变了，现在已经是：${age}岁了`)
 });
app1.age = 1