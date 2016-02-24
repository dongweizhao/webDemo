Ext = {
	versoin: 'test'
};

Ext.apply = function(o, c) {
	if (o && c && typeof c == 'object') {
		for (var m in c) {
			o[m] = c[m];
		};
	}
	return o;
};
(function(){
    
	Ext.apply(Ext, {
		//重写操作
		override: function(origclass, overrides) {
			if (overrides) {
				var p = origclass.prototype;
				Ext.apply(p, overrides);
			}
		},
		//继承操作
		extend: function() {
			var oc = Object.prototype.constructor;
			return function(sb, sp, overrides) {
				if (typeof sp == 'object') {
					overrides = sp;
					sp = sb;
					sb = overrides.constructor != oc ? overrides.constructor : function() {
						sp.apply(this, arguments);
					};
				}
				var F = function() {},
					spp = sp.prototype;
				F.prototype = spp;
				sb.prototype = new F();
				sb.constructor = sb;
				sb.supclass = spp;
				if (spp.constructor == oc) {
					spp.constructor = sp;
				}
				Ext.override(sb, overrides);
				return sb;
			}
		}()

	});

})();


// Ext.apply(Function.prototype,{
// 	  createCallback : function(/*args...*/){
//         // make args available, in function below
//         var args = arguments,
//             method = this;
//         return function() {
//             return method.apply(window, args);
//         };
//     }
// });

function Person(name, age) {
	this.name = name;
	this.age = age;
}
Person.prototype = {
	sayName: function() {
		alert("sayName:" + this.name);
	}
}
function Boy(name, age, sex) {
	Boy.supclass.constructor.call(this, name, age);
	this.sex = sex;

}
var boy = Ext.extend(Boy, Person, {
	hobby: '打篮球',
	name: '王五',
	run: function() {
		alert(this.name + "正在进行奔跑");
	}
});
var b1 = new boy('李四', 19, '女');


alert(b1.sex);
alert(b1.name);
alert(b1.hobby);
b1.run();
b1.sayName();




