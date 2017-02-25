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
    var temp;
    var Rex = /\{\{(.+?)\}\}/g;
    var self = this;
    var complier = function() {
            let str = /^[A-Za-z]+$/;
            if (self.el[0] === '#') {
                let idname = self.el.slice(1);
                self.node = document.getElementById(idname);
            } else if (self.el[0] === '.') {
                let classname = self.el.slice(1);
                self.node = document.getElementByClass(classname)[0];
            } else if (str.test(self.el[0])) {
                let nodename = self.el;
                self.node = document.getElementByTagName(nodename)[0];
            }
            if (self.node === null) {
                throw '节点不存在';
            }
            temp = self.node.innerHTML;
        }
        // var replace = function(Rex){
        // 	self.node.innerHTML.replace(Rex,self.data[]);
        // }
    var parseTextExp = function(text) {
        var regText = /\{\{(.+?)\}\}/g;
        var regText1 = /(\w+)+?/g;
        return text.match(regText)[0].match(regText1);
    }
    var replace = function(temp) {
        let str = parseTextExp(temp);
        let obj = self.data;

        test = obj;
        test1 = str;
        for (var i = 0; i <= str.length - 1; i++) {
            obj = obj[str[i]];
            if (i === 0)
                objname = str[i] + '.';
            else
                objname += str[i] + '.';
        }
        objname = objname.slice(0, objname.length - 1)

        let tempStr = temp.replace('{{' + objname + '}}', obj)
        console.log(temp + '  ' + objname + '   ' + obj + '   ' + tempStr)

        self.node.innerHTML = tempStr;
    }
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
