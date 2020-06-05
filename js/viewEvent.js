window.onload = displayEvents();


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



async function displayEvents() {
	
	const url = 'http://localhost:8081/events/getAllEvents';

	var token = getToken();
	let response = await fetch(url, {
		method: 'GET',  
		headers: { 'Content-Type': 'application/json', 'x-access-token' : token }
	});
	let result = await response.json();
	let events = result.events;

	let eventSection = document.getElementById("eventSection");
	if (events != 'undefined' && events != null && events != '') {
		for (let event of events) {
			let eventBody = document.createElement("div");
			eventBody.classList.add("item");

			let buttonDiv = document.createElement("div");
			buttonDiv.classList.add("buttons");

			let buyTicket = document.createElement("button");
			buyTicket.innerHTML = "Buy Ticket";
			buyTicket.classList.add("addButton");



			let details = document.createElement("div");
			details.classList.add("description");
			let eventName = document.createElement("span");
			eventName.innerHTML = "<strong>Event Name : </strong>" + event.eventName;

			let location = document.createElement("span");
			location.innerHTML = "<strong>Where : </strong>" + event.location;

			let date = document.createElement("span");
			var eventDate = new Date(event.date);

			var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
			var year = eventDate.getFullYear();
			var month = months[eventDate.getMonth()];
			var dateValue = eventDate.getDate();
			var finalDate = dateValue + ' ' + month + ' ' + year  ;    // final date with time, you can use this according your requirement

			date.innerHTML = "<strong>Date : </strong>" + finalDate;
			date.classList.add('date');

			let fromTime = document.createElement("span");
			fromTime.innerHTML = "<strong>From Time : </strong>" +event.fromTime;

			let noOfTickets = document.createElement("span");
			noOfTickets.innerHTML = "<strong>No of Tickets available : </strong>" +event.noOfTickets;

			let price = document.createElement("div");
			price.innerHTML = "<strong> Price : </strong>" + event.price ;

			details.appendChild(eventName);
			details.appendChild(location);
			//details.appendChild(date);
			details.appendChild(fromTime);
			details.appendChild(noOfTickets);
			buttonDiv.appendChild(price);

			if(event.noOfTickets > 0) {
				buyTicket.addEventListener("click", async () => {
					window.location = 'http://localhost:8081/bookTicket?Name='+event.eventName;
				});
				buttonDiv.appendChild(buyTicket);
			} else {
				var sold = document.createElement("div");
				sold.innerHTML = "<strong>Sold Out</strong>";
				buttonDiv.appendChild(sold);
			}
			//details.appendChild(buttonDiv);
			eventBody.appendChild(date);
			eventBody.appendChild(details);
			eventBody.appendChild(buttonDiv);
			eventSection.appendChild(eventBody);

		}

	} else {
		let error = document.createElement("h3");
		error.innerHTML = "No events available";
		eventSection.appendChild(error);

	}

}

