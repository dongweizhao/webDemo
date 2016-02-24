var arry = [1, 2, 3, 4, 2, 3, 2, 4, 5, 6];

//新增位置方法 indexOf lastIndexOf
//一个参数表示 传值，返回值索引(从0开始)
// var result=arry.indexOf(2);
// alert(result);

//两个参数时，第一个参数表示起始位置(从0开始),第二个参数表示传值
// var result=arry.indexOf(4,4);
// alert(result);


//同indexOf同理
// var lastResult=arry.lastIndexOf(4);
// alert(lastResult);

//5个新加迭代方法
//every:对于数组每一个元素进行一个函数的运行,如果都返回true,最后才返回true，如果一个falsel，则返回false

//@param 当前遍历值，当前索引，数组对象

// var result = arry.every(function(item, index, array) {
// 	return item > 0;
// });

// alert(result);


//filter:对于数组的元素给定一个函数执行，把过滤后的结果返回

//@param 当前遍历值，当前索引，数组对象
// var result = arry.filter(function(item, index, array) {
// 	return item > 4;
// });
// alert(result)

//forEach:循环每一个元素，并执行一个方法

arry.forEach(function(item, index, array) {
	alert(item);
});


//map:对于数组每一个元素进行一个函数的运行，把执行的结果返回

var result = arry.map(function(item, index, array) {
	return item * 2;
});

alert(result);


//some:对于数组每一个元素进行一个函数的运行,如果有一个项返回true,最后就返回true，如果每一项都false，则返回false

var result=arry.some(function(item,index,array){
	return item>9;
});
alert(result);







