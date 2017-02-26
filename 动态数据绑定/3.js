
//写在本章前面的一句话
/*
  传播机制，为什么要传播？
  我们先来看看下面这个对象
  var test = {
                a:{
                  b:'doubi'  
                }
              }
  如果我要对b使用观察者模式的话，
  如果你new Observer(test)的话那就会出现很严重的问题
  怎么说呢，这个绑定是对test.a的绑定而并非test.a.b的绑定，
  也就意味着我们绑定是不能对a这个对象进行的。
  那么a是对象 test又是对象，那就是使用遍历对最后的子节点进行绑定。
*/
var Observer = function(object) {
    //进行一定的深度遍历把最后的子节点绑定上Observer。
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

    //这个地方和上一章并没有什么很大的区别
    this.convert = function(obj,key,val,callback){
        Reflect.defineProperty(obj, key, {
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

    //在这里我们也使用了for...in...循环去寻找我们的指定key，并且进行绑定事件。
    this.$watch = function(key , callback) {
        for(let key1 in this[key]){
            
            if (this[key].hasOwnProperty(key1)) {
                console.log('next, '+this[key][key1]);
                let val = this[key][key1];
                // 这里进行判断，如果还没有遍历到最底层，继续new Observer
                this.convert(this[key],key1, val, callback);

            }
            else{
                console.log('else');
                this.convert(this, key, this[key], callback);
            }
        }
        
        
       
    }
}

var app1 = new Observer({name:{fn:'wang',ln:'luyao'},age:1});
app1.$watch('name', function(age) {
         console.log(`changed`)
 });
app1.name.fn = 'wei'