/**
 * Created by dongweizhao on 15-11-23.
 * @des 属性检测法实现接口
 */
/**
 *interface compose{
 *  function add(obj);
 *  function del(obj);
 * }
 *
 * interface Person{
 *   function say();
 * }
 *
 *
 * **/

function ValidateImpl(obj) {
    if (!checkImpl(obj, 'compose', 'Person'))throw  new Error('Object does not implement a required interface.');
}
/**
 * 接口检测方法
 * @param obj
 */
function checkImpl(obj) {
    if (arguments.length < 2) {
        throw  new Error('the checkImpl arguments.length must to be >=2!');
    }
    for (var i = 1; i < arguments.length; i++) {
        var isflag = false;
        var interfaceName = arguments[i];
        if (typeof interfaceName !== 'string') {
            throw  new Error('the interfaceName must to be String');
        }
        for (var j = 0; j < obj.implemehts.length; j++) {
            if (obj.implemehts[j] == interfaceName) {
                isflag = true;
                break;
            }
        }
        if (!isflag)return false;

    }
    return true;
}

var interfaceImpl = function () {
    this.implemehts = [ 'compose', 'Person'];
}

interfaceImpl.prototype.add = function () {
    alert('add');
}

interfaceImpl.prototype.delete = function () {
    alert('delete');
}


/***实例化区域****/

var o1 = new interfaceImpl();
ValidateImpl(o1);
o1.add();