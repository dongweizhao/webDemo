	var array = [1, 2, 3, [4, [5, [6]]]];

	Array.prototype.each = function(fn) {
	    try {
	        this.i || (this.i = 0);
	        if (this.length > 0 && Object.prototype.toString.call(fn) === '[object Function]') {
	            while (this.i < this.length) {
	                var e = this[this.i];
	                if (e && Object.prototype.toString.call(e) === '[object Array]') {
	                    e.each(fn);
	                } else {
	                    fn.call(e, e);
	                }
	                this.i++;
	            }
	        }
	        this.i = null;

	    } catch (ex) {
	        //doSomethindg
	    }
	    return this;
	}
	array.each(function(item) {
	    alert(item);
	})