/**
 *@鸭式辩型接口实现方法
 * @param name 接口名
 * @param methods [] 方法名
 * @constructor
 */
var Interface = function (name, methods) {
    if (arguments.length != 2) {
        throw  new Error('the Interface arguments.length must to be 2');
    }
    this.name = name;
    this.methods = [];
    for (var i = 0; i < methods.length; i++) {
        var method = methods[i];
        if (typeof method !== 'string') {
            throw  new Error('the method name must to be String');
        }
        this.methods.push(method);
    }

}

/**
 * 接口检查类
 * @param obj
 */
Interface.checkedImpl = function (obj) {
    //参数必须大于1，如果等于1个，等于没有实现接口
    if (arguments.length < 2) {
        throw  new Error('the Interface.checkedImpl  argument.length must >=2!');
    }
    for (var i = 1, len = arguments.length; i < len; i++) {
        var interface_ = arguments[i];
        if (interface_.constructor !== Interface) {
            throw new Error('the interface_ constructor not be Interface class!');
        }
        for (var j = 0; j < interface_.methods.length; j++) {
            var method = interface_.methods[j];
            if (!obj[method] || typeof obj[method] !== 'function') {
                throw new Error("the method '" + method + "' is not found!");
            }
        }
    }
}

var interFace1 = new Interface('interFace1', ['add', 'delete']);

var interFace2 = new Interface('interFace2', ['remove', 'select']);

/**
 * 接口实现类
 * @constructor
 */
var InterfaceImpl = function () {

}
InterfaceImpl.prototype.add = function (obj) {
    alert('add');
}
InterfaceImpl.prototype.delete = function (obj) {
    alert('delete');
}
InterfaceImpl.prototype.remove = function (obj) {
    alert('remove');
}
InterfaceImpl.prototype.select = function (obj) {
    alert('select');
}

/*********实例化区域********/
var c1 = new InterfaceImpl();

Interface.checkedImpl(c1, interFace1, interFace2);

c1.add();
