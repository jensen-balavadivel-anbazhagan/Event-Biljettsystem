window.onload = displaySetting();

var addDiv = document.getElementById('innerDiv');

function getToken() {
	var x = document.cookie;
	if(x) {
	var cookieStr = x.split('=');
	var jsonStr = JSON.parse(cookieStr[0]);
	return jsonStr.token;
	} else {
		return "";
	}
}

async function displaySetting() {
	var url = window.location.href;
	var ticketNo = document.getElementById('ticketNo');
	var eventName = document.getElementById('eventName');
	var location = document.getElementById('location');
	var date = document.getElementById('date');
	var fromTime = document.getElementById('fromTime');
	var price = document.getElementById('price');
	var name = "";
	var p = url.split('=', 2);
	if (p.length == 1) {
		name = p[1];
	}
	
	var token = getToken();


	const fetchUrl = 'http://localhost:8081/tickets/getTicket/'+ p[1];

	let response = await fetch(fetchUrl, {
		method: 'GET',  
		headers: { 'Content-Type': 'application/json', 'x-access-token' : token }
	});
	let result = await response.json();
	let ticket = result.ticket;
	let event = ticket.event;

	if (ticket != null && ticket != 'undefined') {
		
		if(ticketNo != 'undefined' && ticketNo != null) {
			ticketNo.innerHTML = "<strong>Ticket No : </strong>" + ticket.ticketNo;
		}

		if(eventName != 'undefined' && eventName != null) {
			eventName.innerHTML = "<strong>Event Name : </strong>" + event.eventName;
		}

		if(location != 'undefined' && location != null) {
			location.innerHTML = "<strong>Where : </strong>" + event.location;
		}

		if(date != 'undefined' && date != null) {
			var eventDate = new Date(event.date);

			var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
			var year = eventDate.getFullYear();
			var month = months[eventDate.getMonth()];
			var dateValue = eventDate.getDate();
			var finalDate = dateValue + ' ' + month + ' ' + year  ;    // final date with time, you can use this according your requirement

			date.innerHTML = "<strong>Date : </strong>" + finalDate;
		}

		if(fromTime != 'undefined' && fromTime != null) {
			fromTime.innerHTML = "<strong> From Time : </strong>" + event.fromTime ;
		}

		if(verified != 'undefined' && verified != null) {
			verified.innerHTML =  ticket.verified == true ? "<strong> Verified : </strong>" + "Yes" : "<strong> Verified : </strong>" + "No" ;
		}
		
	}

}