var Vue = function(object) {
    this.data = object.data;
    this.el = object.el;
    var node;
    var temp;
    var self = this;
    //节点分析，通过el值去解析然后把dom返回的node值里面
    //这个地方略有欠缺不应该用这种if...else...判断。应当使用document.querySelector
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
    //第一个regText是把{{}}以及其中的内容提取出来。
    //第二个regText是把{{}}里面的name.fn提取出来变成数组['name','fn'].
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
    //当你的数据多次替换之后，到时候还需要重新进行正则匹配，或者替换到不该替换的，这是一件很麻烦的事情
    //这里的replace较上一章节略有不同，我们考虑到与Reflect.defineProperty进行绑定，部分参数进行了改变。
    //传入参数改成了key以寻找对象的值进行修改。
    var replaceStr = function(key) {
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



    //这是注册观察者的一个方法
    var Observer = function(object,key,val) {
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
	                replaceStr();
	            } 
	        })
		else{
			return '参数非对象';
		}
	}
    complier();   	
    replaceStr();   

    //这是我们需要进行深度遍历寻找子节点并且进行绑定。
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

//感谢你看完了这个简单的注释教程，如果你需要和vue一样有一个简单双向绑定input输入框的效果，请在input上添加onkeyup事件