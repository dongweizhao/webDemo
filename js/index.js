// function foo() {
// 	console.log('first');
// 	setTimeout(
// 		(function() {
// 			console.log('second');
// 		}), 5);

// }

// for (var i = 0; i < 50; i++) {
// 	foo();
// }


function callbackFunction() {
	alert('setInterval();');
}
// setInterval(callbackFunction, 100);


document.getElementById('testBtn').onclick=function(){
	setTimeout( function(){alert('onclick')}, 0);
}


setTimeout( function(){ while(true){} } , 100);
setTimeout( function(){ alert('你好!'); } , 200);
setInterval( callbackFunction , 200);