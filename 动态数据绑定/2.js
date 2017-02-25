var Observer = function(object) {
    //此处是进行注册Observer，至于为什么要遍历到最深处呢，这个涉及第三章的内容，到时候我会解释
	for(let key in object){
		this[key] = object[key];
		if (object.hasOwnProperty(key)) {
            val = object[key];
            // 这里进行判断，如果还没有遍历到最底层，继续new Observer
            if (typeof val === 'object') {
                new Observer(val);
            }
            
        }
	}
    //这是进行注册观察者模式的方法，Reflect.defineProperty是ES6代替Obeject.defineProperty使用的。
    //此处有个注意点，参数（比如enumerable）和get还有set方法必须全部写全，否则到时候会失效。
	this.convert = function(key,val,callback){
		Reflect.defineProperty(this, key, {
			enumerable: true,
        	configurable: true,
        	get: function () {
        	    return val
        	},
        	set: function(newVal) {
        		callback(newVal);        		
	            if (newVal === val) return;
	            val = newVal
        	} 
        })
	}
    //注册我们观察者接口的一个方法，这里仍然是需要遍历到底层,这个也要下一章解释
    //在我写这个方法的时候我发现我做的并不是很完美
    //实际上我应该使用for...in...循环进行深度遍历，我这个只能遍历两层，for...in...循环是es6的内容
    //参考：http://es6.ruanyifeng.com/#docs/object#属性的遍历
    this.$watch = function(key, callback) {
    	if (object.hasOwnProperty(key)) {
            val = object[key];
            if (typeof val === 'object') {
                this.convert(key, this[key], callback);
            }
            
        }
        else{
        	this.convert(key, this[key], callback);
        }
    	
       
    }
}

var app1 = new Observer();
app1.$watch('age', function(age) {
         console.log(`我的年纪变了，现在已经是：${age}岁了`)
 });
app1.age = 1