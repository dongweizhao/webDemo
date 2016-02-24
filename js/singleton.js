/**
 * Created by dongweizhao on 15-11-24.
 * 单体模式
 */

/**
 * 简单单体
 */
var obj1 = {
    name: '张三',
    say: function () {
        alert('说');
    }
};

/**
 * 闭包单体
 * @des 可以定义私有变量，有自己的私有作用域
 * @type {{}}
 */
var obj2 = {};
obj2.singleton = (function () {
    var f1 = '闭包';
    return {
        name: '李四',
        run: function () {
            alert('正在奔跑中...');
        },
        sayHello: function () {
            alert(f1);
        }
    };
})();


//obj1.say();
//
//obj2.singleton.run();
//obj2.singleton.sayHello();


/**
 * 惰性单体
 * @type {{}}
 */
var Ext = {};
Ext.Base = (function () {

    var uniqueInstance;

    function init() {
        var a1 = 'a1';
        var a2 = 'a2';

        function f1() {
            alert('f1');
        }

        return {
            att1: a1,
            att2: a2,
            f1: f1
        };
    }

    return {
        getInstance: function () {
            if (!uniqueInstance) {
                uniqueInstance = init();
            }
            return uniqueInstance;
        }
    }
})();

var instance = Ext.Base.getInstance();
alert(instance.att1)
instance.f1();


/**
 * 分支单体
 */

var Class = {};
Class.Base = (function () {
    var def;
    var obj1 = {

    };
    var obj2 = {

    };
    return def ? obj1 : obj2;
})();


