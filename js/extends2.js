function extend(v1, v2) {
	// body...
	var F = new Function(); //创建一个空的函数，实现中转，这样就不用每次，复制两次父类模板了
	F.prototype = v2.prototype;
	v1.prototype = new F(); //拷贝一个空的函数，实现原型继承
	v1.prototype.constructor = v1; //改变子类的构造器，如果不指定，指定就是空函数的构造器
	//寄存一个父类的原型对象，方面调用，另一方面解耦。
	v1.superClass = v2.prototype;
	if (v2.prototype.constructor == Object.prototype.constructor) {
		v2.prototype.constructor = v2;
	}
}

function Person(name, age) {
	this.name = name;
	this.age = age;
}

Person.prototype = {
	constructor: Person,
	sayName: function() {
		alert(this.name);
	}
}

function Boy(name, age, sex) {

	Boy.superClass.constructor.call(this, name, age);
	this.sex = sex;
}

extend(Boy, Person);

Boy.prototype.sayName = function() {
	alert('子类执行');
	//调用父类的sayName方法
	Boy.superClass.sayName.call(this);
}

var boy = new Boy('张三', 19, '男女');



alert(boy.name);

boy.sayName();