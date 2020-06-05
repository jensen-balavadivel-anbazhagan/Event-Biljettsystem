var addEventLink = "<a href='addEvent'>Add Event</a></li>";
var viewEventsLink = "<a href='viewEvents'>View Events</a></li>";
var verifyTicketLink = "<a href='verifyTicket'>Verify Ticket</a></li>";
var logoutLink = "<a href='login'>Log out</a></li>";
var ulStr = "<ul id='js-menu'>";
var ulStrEnd = "</ul>";
var liStr = "<li>";
var liStrAct = "<li class='active'>";
var imgDiv = "<div class='logo'> <img src='images/logo.png'  alt=''></div></li>";

window.onload = buildNavBar();

function buildNavBar() {
	var url = window.location.href;
	var x = document.cookie;
	var role;
	if(x) {
	var cookieStr = x.split('=');
	var jsonStr = JSON.parse(cookieStr[0]);
	var role = jsonStr.role;
	} else {
		alert("Unauthorized access");
		window.location = 'http://localhost:8081/login';
	}
	
	var menuStr = ulStr + liStr + imgDiv;
	
	if("admin" === role) {
		menuStr +=( url.indexOf('addEvent') >0 ? liStrAct : liStr) + addEventLink + ( url.indexOf('viewEvents') >0 ? liStrAct : liStr) + viewEventsLink 
		 + ( url.indexOf('verifyTicket') >0 ? liStrAct : liStr) + verifyTicketLink +  liStr + logoutLink  + ulStrEnd;
	} else if("staff" === role) {
		menuStr += ( url.indexOf('viewEvents') >0 ? liStrAct : liStr) + viewEventsLink 
		 + ( url.indexOf('verifyTicket') >0 ? liStrAct : liStr) + verifyTicketLink +  liStr + logoutLink  + ulStrEnd;
	}  else if("user" === role) {
		menuStr += ( url.indexOf('viewEvents') >0 ? liStrAct : liStr) + viewEventsLink 
		 + liStr + logoutLink  + ulStrEnd;
	}
	document.getElementById('nav').innerHTML = menuStr;
	
	
}

