Time();
function Time(){
var today=new Date();
var hour=today.getHours();
var minute=today.getMinutes();
minute=((minute<10)?'0':'')+minute;
var clock=hour+':'+minute;
if (clock!=document.getElementById('miniClock').innerHTML) document.getElementById('miniClock').innerHTML=clock;



today=setTimeout(Time,1000);
}
		