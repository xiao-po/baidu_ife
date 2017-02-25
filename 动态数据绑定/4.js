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
    
}
var test;
var i = 0;
function run() {
    if(i == 0){
        test = new Observer({
	        data: {
	            name: {
	                fn: 'doubi'
	            }
	        },
	        el: "#doubi"
    	})
        i++;
    }else{
        
    }
    
}