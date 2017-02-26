var Vue = function(object) {
    this.data = object.data;
    this.el = object.el;
    var temp;
    var node;
    var self = this;
    //节点分析，通过el值去解析然后把dom返回的node值里面
    var complier = function() {
            //id class 以及tag解析
            if (self.el[0] === '#') {
                let idname = self.el.slice(1);
                node = document.getElementById(idname);
            } else if (self.el[0] === '.') {
                let classname = self.el.slice(1);
                node = document.getElementByClass(classname)[0];
            } else if (str.test(self.el[0])) {
                let nodename = self.el;
                node = document.getElementByTagName(nodename)[0];
            }
            if (node === null) {
                throw '节点不存在';
            }
            //把到时候需要改变的值放在temp里面
            temp = node.innerHTML;
        }
    //分析{{}}表达式里面内容并提取出来，目前的格式是'{{name.fn}}'能解析成数组['name','fn']
    var parseTextExp = function(text) {
        var regText = /\{\{(.+?)\}\}/g;
        var regText1 = /(\w+)+?/g;
        return text.match(regText)[0].match(regText1);
    }

    var getValue = function(obj,key){
    	for(let name in obj){
    		if((typeof obj[name]) === 'object'){
    			return getValue(obj[name],key);
    		}
    		else if(name === key){
    			let val = obj[name];
				return val;
    		}
    	}
    }
    //替换，temp的作用是为了防止多次替换不好提取值或者冲突先使用的缓存，
    var replace = function(key) {
    	console.log('test');
        let str = parseTextExp(temp);
        let obj = self.data;
        if(key === undefined)
        	key = str[str.length-1];
        let value = getValue(obj,key) ;
    	//把对应data对象里面的值取出来
        for (var i = 0; i <= str.length - 1; i++) {
            if (i === 0)
                objname = str[i] + '.';
            else
                objname += str[i] + '.';
        }
        objname = objname.slice(0, objname.length - 1)
        //至此都是替换
        let tempStr = temp.replace('{{' + objname + '}}', value)
        node.innerHTML = tempStr;
    }
    var Observer = function(object,key,val) {
    	a = object;
		if(typeof object === 'object')
			Reflect.defineProperty(object, key, {
	            enumerable: true,
	            configurable: true,
	            get: function () {
	                return val
	            },
	            set: function(newVal) {
	            	
	                if (newVal === val) return;
	                val = newVal;
	                replace();
	            } 
	        })
		else{
			return '参数非对象';
		}
	}
    complier();   	
    replace();   
    var bind= function(object){
    	for(let key in object){
	    	if((typeof object[key]) === 'object' ){
	    		bind(object[key]);
	    	}else{
	    		Observer(object,key,object[key]);
	    	}
	    }
    }
    bind(this.data);
    
}
var test;
var i = 0;
function run() {
    if(i == 0){
        test = new Vue({
            data: {
                name: {
                    fn: 'dou',
                    ln: 'bi'
                }
            },
            el: "#doubi"
        });
        i++;        
    }else{
        test.data.name.fn = document.getElementById('input').value;
    }
    
}