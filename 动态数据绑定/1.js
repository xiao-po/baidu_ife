
var Observer = function(object) {
	if(typeof object === 'object')
	    return new Proxy(object, {
	        get: function(target, key, receiver) {
	            console.log('你访问了 ' + key);
	            return Reflect.get(target, key, receiver);
	        },
	        set: function(target, key, value, receiver) {
	            console.log('你访问了 ' + key + ',新的值为 ' + value);
	            return Reflect.set(target, key, value, receiver);
	        }
	    })
	else{
		return '参数非对象';
	}
}

var app1 = new Observer({
    name: 'xiaopo',
    age: 20
})
//以上是一种错误的做法，并不推荐大家使用，至于怎么做大家都有一定的参考我就不详细介绍了