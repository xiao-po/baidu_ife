var Observer = function(object) {
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
    this.convert = function(obj,key,val,callback){
        console.log('2.'+key);
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
    this.$watch = function(key , callback) {
        console.log('1.'+key);
        for(let key1 in this[key]){            
            if (this[key].hasOwnProperty(key1)) {
                console.log('next, '+this[key][key1]);
                let val = this[key][key1];
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