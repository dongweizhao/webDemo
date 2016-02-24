//原型继承
//原型继承的特点：即继承父类对象的模块 又继承了父类的原型对象
function Sup(name) {
	this.name = name;
}

Sup.prototype = {
	constructor: Sup,
	sayName: function() {
		alert(this.name);
	}
}

function Sub(age) {
	this.age = age;
	// this.name='哈哈哈';
}


Sub.prototype=new Sup('张三');
Sub.prototype.name="李四";

var sub=new Sub(19);



alert(sub.name);
sub.sayName();

var sup=new Sup('父类');

// console.log(Sup.prototype.isPrototypeOf(sup));


//类继承，构造函数继承

function Person(name,age){
	this.name=name;
	this.age=age;
}

function Boy(name,age,sex){
	Person.call(this,name,age);
	this.sex=sex;
}


var boy=new Boy('张三',18,'男');
alert(boy.name);
alert(boy.age);
alert(boy.sex);



//混合继承






function Person(name,age){
	this.name=name;
	this.age=age;
}
Person.prototype.id=17;

function Boy(name,age,sex){
	Person.call(this,name,age);
	this.sex=sex;
}
Boy.prototype=new Person();


var boy=new Boy('张三',18,'男');
alert(boy.name);
alert(boy.age);
alert(boy.sex);
alert(boy.id);




