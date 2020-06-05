var verify = document.getElementById('verify');
	var ticketNo =document.getElementById('ticketNo').value;
	verify.addEventListener("click", verifyTicket);
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
	
	async function verifyTicket(){
		var token = getToken();
		var ticketNo =document.getElementById('ticketNo').value;
		const fetchUrl = 'http://localhost:8081/tickets/getTicket/'+ ticketNo;
		let response = await fetch(fetchUrl, {
			method: 'GET',  
			headers: { 'Content-Type': 'application/json', 'x-access-token' : token }
		});
		let result = await response.json();
		let ticket = result.ticket;
		if(ticket != null && ticket !='undefined') {
		if(ticket.verified === true) {
			alert("Ticket is already verified");
		} else {
			const ticketObj = {
					ticketNo: ticket.ticketNo,
					event: ticket.event.id,
					verified: true,
					id: ticket.id
			}
			const url = 'http://localhost:8081/tickets/verify/'+ticket.id;

			const updateResponse = await fetch(url, {
				method: 'POST', body: JSON.stringify(ticketObj), 
				headers: { 'Content-Type': 'application/json', 'x-access-token' : token  }
			});
			let updateResult = await updateResponse.json();
			let updatedTicket = updateResult.ticket;
			if(updatedTicket != null && updatedTicket != 'undefined' && updatedTicket != '') {
			window.location = 'http://localhost:8081/viewTicket?ticket='+updatedTicket.ticketNo;
			} else {
				alert("Ticket verification unsuccessful");
			}

		}
	  } else {
		  alert("Ticket number verification is unsuccessful");
	  }
	}
	