window.onload = displaySetting();

var addDiv = document.getElementById('registerDiv');


document.getElementById('addClick').addEventListener('click', registerEvent);

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


function displaySetting() {
	var div = document.getElementById('registerDiv');
	var mandate = document.getElementById('mandate');
	var failure = document.getElementById('failure');
	var success = document.getElementById('success');
	var failureMsg = document.getElementById('failureMsg');
	
	if(mandate != 'undefined' && mandate != null) {
		div.removeChild(mandate);
	}
	
	if(failure != 'undefined' && failure != null) {
		div.removeChild(failure);
	}
	
	if(success != 'undefined' && success != null) {
		div.removeChild(success);
	}
	
	if(failureMsg != 'undefined' && failureMsg != null) {
		div.removeChild(failureMsg);
	}
}


async function registerEvent() {
	displaySetting();
    const eventName = document.getElementById('eventName').value;
   const location = document.getElementById('location').value;
   const date = document.getElementById('date').value;
   const fromTime = document.getElementById('fromTime').value;
   const noOfTickets = document.getElementById('noOfTickets').value;
   const price = document.getElementById('price').value;
   var token = getToken();
   const url = 'http://localhost:8081/events/addEvent';
   const obj = {
    eventName: eventName,
    location: location,
    date: new Date(date),
    fromTime: fromTime,
    noOfTickets: noOfTickets,
    price: price
   }

   if(eventName == null || eventName == 'undefined' || eventName == ''
    || location == null || location == 'undefined' || location == ''
    || date == null || date == 'undefined' || date == ''
    || fromTime == null || fromTime == 'undefined' || fromTime == ''
    || noOfTickets == null || noOfTickets == 'undefined' || noOfTickets == ''
    || price == null || price == 'undefined' || price == '') {

       let mandate = document.createElement("h3");
       mandate.setAttribute("id", "mandate");
       mandate.innerHTML = "Please fill in all the details!";
       addDiv.appendChild(mandate);

   } else {
   const response = await fetch(url, {
        method: 'POST', body: JSON.stringify(obj), 
        headers: { 'Content-Type': 'application/json', 'x-access-token' : token }
        });
   let data = await response.json();
   const  event  = data.event;
   const  err  = data.error;
   if(err != null && err != 'undefined'  && err != '') {
    let failure = document.createElement("h3");
    failure.setAttribute("id", "failure");
    failure.innerHTML = err;
    addDiv.appendChild(failure);
    addDiv.style.display="block";
   }
   if(event != null && event != 'undefined'  && event != '') {
       let success = document.createElement("h3");
       success.setAttribute("id", "success");
       success.innerHTML = "Event Created Successfully !";

       addDiv.style.display="block";
       addDiv.appendChild(success);
   } else {
    failure();
   }
}
}

function failure() {
    let failureMsg = document.createElement("h3");
    failureMsg.setAttribute("id", "failureMsg");
    failureMsg.innerHTML = "Event is not created !";
    addDiv.appendChild(failureMsg);
    addDiv.style.display="block";

}
