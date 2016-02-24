/**
 * Created by dongweizhao on 15-11-25.
 */
var App = {};

/**
 *@鸭式辩型接口实现方法
 * @param name 接口名
 * @param methods [] 方法名
 * @constructor
 */
App.Interface = function (name, methods) {
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
App.Interface.checkedImpl = function (obj) {
    //参数必须大于1，如果等于1个，等于没有实现接口
    if (arguments.length < 2) {
        throw  new Error('the Interface.checkedImpl  argument.length must >=2!');
    }
    for (var i = 1, len = arguments.length; i < len; i++) {
        var interface_ = arguments[i];
        if (interface_.constructor !== App.Interface) {
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
/**
 *对象拷贝
 * @param o
 * @param c
 * @returns {*}
 */
App.apply = function (o, c) {
    if (o && c && typeof c == 'object') {
        for (var m in c) {
            o[m] = c[m];
        }
        ;
    }
    return o;
};

(function () {
    var toString = Object.prototype.toString;
    App.apply(App, {
        //重写操作
        override: function (origclass, overrides) {
            if (overrides) {
                var p = origclass.prototype;
                Ext.apply(p, overrides);
            }
        },
        extend: function () {
            var oc = Object.prototype.constructor;
            return function (sb, sp, overrides) {
                if (typeof sp == 'object') {
                    overrides = sp;
                    sp = sb;
                    sb = overrides.constructor != oc ? overrides.constructor : function () {
                        sp.apply(this, arguments);
                    };
                }
                var F = function () {
                    },
                    spp = sp.prototype;
                F.prototype = spp;
                sb.prototype = new F();
                sb.constructor = sb;
                sb.supclass = spp;
                if (spp.constructor == oc) {
                    spp.constructor = sp;
                }
                App.override(sb, overrides);
                return sb;
            }
        }(),
        /**
         * 判断是否是函数
         * @param v
         * @returns {boolean}
         */
        isFunction: function (v) {
            return toString.apply(v) === '[object Function]';
        },
        /**
         * 判断是否为数字
         * @param v
         * @returns {boolean}
         */
        isNumber: function (v) {
            return typeof v === 'number' && isFinite(v);
        }
    });
})();

(function () {
    App.apply(Function.prototype, {
        /**
         *  var sayHi = function(name){
         *alert('Hi, ' + name);
          *}
         // clicking the button alerts "Hi, Fred"
         new Ext.Button({
         text: 'Say Hi',
          renderTo: Ext.getBody(),
           handler: sayHi.createCallback('Fred')
          });
         </code></pre>
         * @return {Function} The new function
         */
        createCallback: function (/*args...*/) {
            // make args available, in function below
            var args = arguments,
                method = this;
            return function () {
                return method.apply(window, args);
            };
        },
        /**
         * Creates an interceptor function. The passed function is called before the original one. If it returns false,
         * the original one is not called. The resulting function returns the results of the original function.
         * The passed function is called with the parameters of the original function. Example usage:
         * <pre><code>
         var sayHi = function(name){
          alert('Hi, ' + name);
          }

         sayHi('Fred'); // alerts "Hi, Fred"

         // create a new function that validates input without
         // directly modifying the original function:
         var sayHiToFriend = sayHi.createInterceptor(function(name){
           return name == 'Brian';
            });

         sayHiToFriend('Fred');  // no alert
         sayHiToFriend('Brian'); // alerts "Hi, Brian"
         </code></pre>
         * @param {Function} fcn The function to call before the original
         * @param {Object} scope (optional) The scope (<code><b>this</b></code> reference) in which the passed function is executed.
         * <b>If omitted, defaults to the scope in which the original function is called or the browser window.</b>
         * @return {Function} The new function
         */
        createInterceptor: function (fcn, scope) {
            var method = this;
            return !App.isFunction(fcn) ?
                this :
                function () {
                    var me = this,
                        args = arguments;
                    fcn.target = me;
                    fcn.method = method;
                    return (fcn.apply(scope || me || window, args) !== false) ?
                        method.apply(me || window, args) :
                        null;
                };
        },
        /**
         * Creates a delegate (callback) that sets the scope to obj.
         * Call directly on any function. Example: <code>this.myFunction.createDelegate(this, [arg1, arg2])</code>
         * Will create a function that is automatically scoped to obj so that the <tt>this</tt> variable inside the
         * callback points to obj. Example usage:
         * <pre><code>
         var sayHi = function(name){
    // Note this use of "this.text" here.  This function expects to
    // execute within a scope that contains a text property.  In this
    // example, the "this" variable is pointing to the btn object that
    // was passed in createDelegate below.
    alert('Hi, ' + name + '. You clicked the "' + this.text + '" button.');
}

         var btn = new Ext.Button({
    text: 'Say Hi',
    renderTo: Ext.getBody()
    });

         // This callback will execute in the scope of the
         // button instance. Clicking the button alerts
         // "Hi, Fred. You clicked the "Say Hi" button."
         btn.on('click', sayHi.createDelegate(btn, ['Fred']));
         </code></pre>
         * @param {Object} scope (optional) The scope (<code><b>this</b></code> reference) in which the function is executed.
         * <b>If omitted, defaults to the browser window.</b>
         * @param {Array} args (optional) Overrides arguments for the call. (Defaults to the arguments passed by the caller)
         * @param {Boolean/Number} appendArgs (optional) if True args are appended to call args instead of overriding,
         * if a number the args are inserted at the specified position
         * @return {Function} The new function
         */
        createDelegate: function (obj, args, appendArgs) {
            var method = this;
            return function () {
                var callArgs = args || arguments;
                if (appendArgs === true) {
                    callArgs = Array.prototype.slice.call(arguments, 0);
                    callArgs = callArgs.concat(args);
                } else if (App.isNumber(appendArgs)) {
                    callArgs = Array.prototype.slice.call(arguments, 0); // copy arguments first
                    var applyArgs = [appendArgs, 0].concat(args); // create method call params
                    Array.prototype.splice.apply(callArgs, applyArgs); // splice them in
                }
                return method.apply(obj || window, callArgs);
            };
        }

    })
})();

/**
 * 创建通用事件对象
 */
(function(){
    var win = window;
    App.apply(App, {
        EventUtil: {
            /**
             * 添加事件
             * @param element
             * @param eventName
             * @param callback
             * @param useCapture
             * @returns {handler}
             */
            addEvent: function () {
                if (win.addEventListener) {
                    return function(element, eventName, callback){
                        beforeCall(element,eventName,callback);
                        element.addEventListener(eventName, handler.createDelegate(element,[element,callback,element]), false);
                    }
                } else if (win.attachEvent) {
                    return function(element, eventName, callback){
                        beforeCall(element,eventName,callback);
                        element['on' + eventName] =  handler.createDelegate(element,[element,callback,element]);
                    };
                }
                function beforeCall(element, eventName, callback){
                    //压缩函数的空格
                    var fnStr = callback.toString().replace(/\s+/g, '');
                    if (!element[eventName + 'event']) {
                        element[eventName + 'event'] = {};
                    }
                    element[eventName + 'event'][fnStr] = handler.createDelegate(element,[element,callback,element]);
                }
                function handler(event,callback,element) {
                    //ie中用window.event获取
                    var ev = App.EventUtil.getEvent(event),
                        stopPropagation = ev.stopPropagation,
                        preventDefault = ev.preventDefault;
                    //获取当前事件活动的对象(捕获或者冒泡阶段)
                    ev.currentTarget = ev.currentTarget || element;

                    //停止事件冒泡处理
                    ev.stopPropagation = function () {
                        if (stopPropagation) {
                            stopPropagation.call(event);
                        } else {
                            ev.cancelBubble = true;
                        }
                    }

                    //取消默认事件处理
                    ev.preventDefault = function () {
                        if (preventDefault) {
                            preventDefault.call(event);
                        } else {
                            ev.returnValue = false;
                        }
                    }
                    //解决ie中this指向问题
                    var flag = callback.apply(element, arguments);

                    if (flag === false) {
                        ev.stopPropagation();
                        ev.preventDefault();
                    }
                }

                // return handler;
            }(),
            /***
             * 移除事件
             * @param element
             * @param eventName
             * @param callback
             * @param useCapture
             */
            removeEvent: function (element, eventName, callback) {
                //压缩函数的空格
                var fnStr = callback.toString().replace(/\s+/g, ''), handler;
                if (!element[eventName + 'event']) return;

                handler = element[eventName + 'event'][fnStr];

                if (element.removeEventListener) {
                    element.removeEventListener(eventName, handler, false);
                } else if (element.detachEvent) {
                    element.detachEvent('on' + eventName, handler);
                } else {
                    element['on' + eventName] = null;
                }
            },
            /**
             * 判断鼠标按钮
             * @param event
             */
            getButtons: function (e) {
                if (document.implementation.hasFeature('MouseEvents', '2.0')) {
                    return e.button;
                } else {
                    switch (e.button) {
                        case 0:
                        case 1:
                        case 3:
                        case 5:
                        case 7:
                            return 0;
                        case 2:
                        case 6:
                            return 2;
                        case 4:
                            return 1;
                    }
                }
            },
            /**
             * 获取事件对象
             * @param event
             * @returns {*|Event}
             */
            getEvent: function (e) {
                return  e || window.event;
            },
            /**
             * 获取目标对象
             * @param event
             */
            getTarget: function (e) {
                //ie下的ev.srcElement相当于其他浏览器下ev.target
                return  e.target || e.srcElement;
            },
            /**
             * 获取相关元素对象，主要针对于鼠标事件的：mouseout,mouseover
             * @param event
             * @returns {*}
             */
            getRelatedTarget: function (e) {
                if (e.relatedTarget) {
                    return e.relatedTarget;
                    //IE8及以下 mouseout事件
                } else if (e.toElement) {
                    return e.toElement;
                    //IE8及以下 mousrover事件
                } else if (e.fromElement) {
                    return e.fromElement;
                } else {
                    return null;
                }
            }
        },
        //自定义事件对象
        EventTarget: function () {
            this.handlers = {};
        }
    });
})();


App.EventTarget.prototype = {
    constructor: App.EventTarget,
    addHandler: function (type, callback) {
        if (typeof this.handlers[type] == 'undefined') {
            this.handlers[type] = [];
        }
        this.handlers[type].push(callback);
    },
    fire: function (event) {
        if (!event.target) {
            event.target = this;
        }
        if (Object.prototype.toString.call(this.handlers[event.type]) == '[object Array]') {
            var handles = this.handlers[event.type];
            for (var i = 0, len = handles.length; i < len; i++) {
                handles[i](event);
            }
        }
    },
    removeHandler: function (type, callback) {
        if (Object.prototype.toString.call(this.handlers[event.type]) == '[object Array]') {
            var handles = this.handlers[type];
            for (var i = 0, len = handles.length; i < len; i++) {
                if (handles[i] == callback) {
                    break;
                }
            }
            handles.splice(i, 1);
        }
    }

}





function createXHR() {
    if (typeof XMLHttpRequest != "undefined") {
        return new XMLHttpRequest();
    } else if (typeof ActiveXObject != "undefined") {
        if (typeof arguments.callee.activeXString != "string") {
            var versions = ["MSXML2.XMLHttp.6.0", "MSXML2.XMLHttp.3.0",
                    "MSXML2.XMLHttp"],
                i, len;
            for (i = 0, len = versions.length; i < len; i++) {
                try {
                    new ActiveXObject(versions[i]);
                    arguments.callee.activeXString = versions[i];
                    break;
                } catch (ex) {
                }
                return new ActiveXObject(arguments.callee.activeXString);
            }
        } else {
            throw new Error("No XHR object available.");
        }
    }
}
var createXHR = function () {
    return new XMLHttpRequest();
}

var createXHR = (function () {
    if (typeof XMLHttpRequest != "undefined") {
        return function () {
            return new XMLHttpRequest();
        }
    } else if (typeof ActiveXObject != "undefined") {
        return function () {
            if (typeof arguments.callee.activeXString != "string") {
                var versions = ["MSXML2.XMLHttp.6.0", "MSXML2.XMLHttp.3.0",
                        "MSXML2.XMLHttp"],
                    i, len;
                for (i = 0, len = versions.length; i < len; i++) {
                    try {
                        new ActiveXObject(versions[i]);
                        arguments.callee.activeXString = versions[i];
                        break;
                    } catch (ex) {
                        //skip
                    }
                }
            }
            return new ActiveXObject(arguments.callee.activeXString);
        };
    } else {
        return function () {
            throw new Error("No XHR object available.");
        };
    }
})();



