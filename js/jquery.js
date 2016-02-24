/**
 * Created by dongweizhao on 15-11-25.
 */


(function (window) {
    var match = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/;

    function $_(arguments) {
        if (match.test(arguments[0])) {
            this.dom = document.getElementById(arguments[0].substring(1));
        } else {
            throw  new Error('arguments is error!');
        }
        return this;
    }

    Function.prototype.addMethod = function (methdName, fn) {
        this.prototype[methdName] = fn;
        return this;
    }
    $_.prototype = {
        constructor: $_,
        addEvent: function (type, fn) {
            if (window.addEventListener) {
                this.dom.addEventListener(type, fn);
            } else if (window.attachEvent) {
                this.dom.attachEvent('on' + type, fn);
            }
            return this;
        },
        css: function (prop, style) {
            this.dom.style[prop] = style;
            return this;
        }
    }

    window.$ = function () {
        return new $_(arguments)
    };

    $_.onReady = function (fn) {
        window.$ = function () {
            return new $_(arguments);
        }
        $_.addMethod('test1', function () {
            alert('test1');
            return this;
        }).addMethod('test2', function () {
            alert('test2');
            return this;
        })
        fn();
    }

})(window);
