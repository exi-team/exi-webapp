var stat_one,stat_two;
var url;

function turnFirst(state){
	if (state){
		document.getElementById('lampa_one').src='img/lamp_on.png';
		stat_one='turnOn';
	}else{
		document.getElementById('lampa_one').src='img/lamp_off.png';
		stat_one='turnOff';
	}
}

function turnSecond(state){
	if (state){
		document.getElementById('lampa_two').src='img/lamp_on.png';
		stat_two='turnOn';
	}else{
		document.getElementById('lampa_two').src='img/lamp_off.png';
		stat_two='turnOff';
	}
}

function getXmlHttp(){
	var xmlhttp;
	try {
		xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
	} catch (e) {
		try {
			xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
		} catch (E) {
			xmlhttp = false;
		}
	}
	if (!xmlhttp && typeof XMLHttpRequest!='undefined') {
		xmlhttp = new XMLHttpRequest();
	}
	return xmlhttp;
}

function refreshState(){
	tmpXHR = getXmlHttp();
	secXHR = getXmlHttp();
	secXHR.open("GET", "test.php?action=getState&num=2", true);
	tmpXHR.open("GET", "test.php?action=getState&num=1", true);
	tmpXHR.onreadystatechange=function (){
		if (tmpXHR.readyState == 4) {
			if(tmpXHR.status == 200) {
				/*We got next structure:
					led1:boolean
					led2:boolean*/
				var resp = tmpXHR.responseText.replace(/(\r\n|\n|\r)/gm,"");
				if (resp == "True"){
					//alert("First lamp is on");
					turnFirst(true);
				}else if (resp == "False"){
					//alert('First lamp is off');
					turnFirst(false);
				}else {
					alert("Text is '"+tmpXHR.responseText+"'");
				}
			}
		}
	};
	secXHR.onreadystatechange=function (){
		if (secXHR.readyState == 4) {
			if(secXHR.status == 200) {
				/*We got next structure:
					led1:boolean
					led2:boolean*/
				var resp = secXHR.responseText.replace(/(\r\n|\n|\r)/gm,"");
				if (resp == "True"){
					//alert("First lamp is on");
					turnSecond(true);
				}else if (resp == "False"){
					//alert('First lamp is off');
					turnSecond(false);
				}else {
					alert("Text is '"+secXHR.responseText+"'");
				}
			}
		}
	};
	tmpXHR.send(null);
	secXHR.send(null);
}
	
function start(){
	refreshState();
	setInterval(refreshState, 500);
}
		
function h(number){
	if (number==1) {
        if (stat_one=='turnOn'){	
			turnFirst(false);
		}else {
			turnFirst(true);
		}
		sendWrite(1,stat_one);
	}else{
		if (stat_two=='turnOn'){	
			turnSecond(false);
		}else {
			turnSecond(true);
		}
		sendWrite(2,stat_two);	
	}	
}
	
// Server

var commandURL='test.php?';

function sendURL(url){
	var xmlhttp = getXmlHttp();
	xmlhttp.open('GET', url, true);
	xmlhttp.onreadystatechange = function() {
		if (xmlhttp.readyState == 4) {
			if(xmlhttp.status == 200) {
				//Do something if all goes right
			}
		}
	};
	xmlhttp.send(null);	
}	

function sendWrite(num,action){
	var lampa='num='+num;
	lampa+='&action='+action;
	sendURL(commandURL+lampa);
	return false;
}
	

	