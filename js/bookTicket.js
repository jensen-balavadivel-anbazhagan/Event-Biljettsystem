window.onload = displaySetting();




async function displaySetting() {
	var url = window.location.href;
	var innerDiv = document.getElementById('innerDiv');
	
	var eventNameDiv = document.createElement("div");
	var eventName = document.createElement("label");
	eventName.setAttribute("id", "eventName");
	eventNameDiv.classList.add("form-display");
	eventNameDiv.appendChild(eventName);
	innerDiv.appendChild(eventNameDiv);
	
	var locationDiv = document.createElement("div");
	var location = document.createElement("label");
	location.setAttribute("id", "location");
	locationDiv.classList.add("form-display");
	locationDiv.appendChild(location);
	innerDiv.appendChild(locationDiv);
	
	var wrapper = document.createElement("div");
	wrapper.classList.add("form-group");
	
	var dateDiv = document.createElement("div");
	var date = document.createElement("label");
	date.setAttribute("id", "date");
	dateDiv.classList.add("form-display");
	dateDiv.appendChild(date);
	
	var fromTimeDiv = document.createElement("div");
	var fromTime = document.createElement("label");
	fromTime.setAttribute("id", "fromTime");
	fromTimeDiv.classList.add("form-display");
	fromTimeDiv.appendChild(fromTime);
	
	wrapper.appendChild(dateDiv);
	wrapper.appendChild(fromTimeDiv);
	innerDiv.appendChild(wrapper);
	
	var priceDiv = document.createElement("div");
	var price = document.createElement("label");
	price.setAttribute("id", "price");
	priceDiv.classList.add("form-display");
	priceDiv.appendChild(price);
	innerDiv.appendChild(priceDiv);
	
	let buyTicket = document.createElement("button");
	buyTicket.innerHTML = "Buy";
	buyTicket.classList.add("button");
	
	
	
	var p = url.split('=', 2);
	if (p.length == 1) {
		eventId = p[1];
	}


	var token = getToken();
	const fetchUrl = 'http://localhost:8081/events/getById/'+ p[1];

	let response = await fetch(fetchUrl, {
		method: 'GET',  
		headers: { 'Content-Type': 'application/json', 'x-access-token' : token }
	});
	let result = await response.json();
	let event = result.event;

	if (event != null && event != 'undefined') {
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

		if(price != 'undefined' && price != null) {
			price.innerHTML = "<strong> Price : </strong>" + event.price ;
		}

		if (event.noOfTickets != 0) {
			innerDiv.appendChild(buyTicket);
			buyTicket.addEventListener("click", async () => {
				bookTicket(p[1]);
            });
		} 
	}

}


async function bookTicket(id){
	var token = getToken();
	const fetchUrl = 'http://localhost:8081/events/getById/'+id;

	let eventResponse = await fetch(fetchUrl, {
		method: 'GET',  
		headers: { 'Content-Type': 'application/json', 'x-access-token' : token }
	});
	let result = await eventResponse.json();
	let event = result.event;

	const latestTicketUrl = 'http://localhost:8081/tickets/latestTicketNo';
	const latestTicketResponse = await fetch(latestTicketUrl, {
		method: 'GET', 
		headers: { 'Content-Type': 'application/json', 'x-access-token' : token }
	});
	let latestData = await latestTicketResponse.json();
	
	let ticketNo = 1;
	if (latestData.ticket != null && latestData.ticket != 'undefined' ) {
		let latestTicket = latestData.ticket[0];
		
		
		if (latestTicket != null && latestTicket != 'undefined' && latestTicket.ticketNo > 0 ) {
			let latestTicketNo = latestTicket.ticketNo;
			ticketNo = parseInt(latestTicketNo) + 1;
		}
	} 
	
	const obj = {
			ticketNo: ticketNo,
			event: event.id
	}

	const regUrl = 'http://localhost:8081/tickets/register';

	const response = await fetch(regUrl, {
		method: 'POST', body: JSON.stringify(obj), 
		headers: { 'Content-Type': 'application/json', 'x-access-token' : token }
	});
	// Extract the JWT from the response
	let data = await response.json();

	const  ticket  = data.ticket;
	if(ticket != null && ticket != 'undefined' && ticket != '') {


		const url = 'http://localhost:8081/events/updateEvent/'+event.id;

		remainingTickets = parseInt(event.noOfTickets) - 1;
		const eventObj = {
				id: event.id,
				eventName: event.eventName,
				location: event.location,
				date: new Date(event.date),
				fromTime: event.fromTime,
				noOfTickets: remainingTickets,
				price: event.price
		}

		const response = await fetch(url, {
			method: 'POST', body: JSON.stringify(eventObj), 
			headers: { 'Content-Type': 'application/json' , 'x-access-token' : token}
		});
		window.location = 'http://localhost:8081/viewTicket?ticket='+ticket.ticketNo;
	} else {
		alert("Ticket booking unsuccessful");
	}


}


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