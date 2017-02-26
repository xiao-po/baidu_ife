
// var temp;
// var complier = function(node,obj){
// 	if(b[0].nextSibling !== null){
// 		complier(b[0].nextSibling,obj[temp[b[0].nextSibling.id]]);
// 	}
// 	if(b[0].firstChild !== null){
// 		complier(b[0].firstChild,obj[])
// 	}
// 	else{

// 	}

// }
//本来想遍历的，但是发现不方便。
var Observer = function(object) {
    this.data = object.data;
    this.el = object.el;
    var node;
    var temp;
    var Rex = /\{\{(.+?)\}\}/g;
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
    //替换，temp的作用是为了防止多次替换不好提取值或者冲突先使用的缓存，
    var replace = function(temp) {
        let str = parseTextExp(temp);
        let obj = self.data;

        test = obj;
        test1 = str;
    	//把对应data对象里面的值取出来，感觉有些欠缺
        for (var i = 0; i <= str.length - 1; i++) {
            obj = obj[str[i]];
            if (i === 0)
                objname = str[i] + '.';
            else
                objname += str[i] + '.';
        }

        objname = objname.slice(0, objname.length - 1)
        //至此都是替换
        let tempStr = temp.replace('{{' + objname + '}}', obj)

        node.innerHTML = tempStr;
    }



    //执行方法
    complier();
    replace(temp);



}

function run() {
    new Observer({
        data: {
            name: {
                fn: 'doubi'
            }
        },
        el: "#doubi"
    })
}
