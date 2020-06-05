window.onload = displaySetting();

var registerDiv = document.getElementById('registerDiv');

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

document.getElementById('regClick').addEventListener('click', registerUser);


async function registerUser() {
	displaySetting();
    const username = document.getElementById('regusername').value;
   const pass = document.getElementById('regpassword').value;
   const firstname = document.getElementById('firstname').value;
   const lastname = document.getElementById('lastname').value;
   const role = document.getElementById('role').value;
   const url = 'http://localhost:8081/users/register';
   const obj = {
       username: username,
       password: pass,
       firstName: firstname,
       lastName: lastname,
       role: role
   }

   if(username == null || username == 'undefined' || username == ''
    || pass == null || pass == 'undefined' || pass == ''
    || firstname == null || firstname == 'undefined' || firstname == ''
    || lastname == null || lastname == 'undefined' || lastname == ''
    || role == null || role == 'undefined' || role == '') {

       let mandate = document.createElement("h3");
       mandate.setAttribute("id", "mandate");
       mandate.innerHTML = "Please fill in all the details!";
       registerDiv.appendChild(mandate);

   } else {
	   var token = getToken();
   const response = await fetch(url, {
        method: 'POST', body: JSON.stringify(obj), 
        headers: { 'Content-Type': 'application/json', 'x-access-token' : token }
        });
   // Extract the JWT from the response
   let data = await response.json();
   const  user  = data.user;
   const  err  = data.error;
   if(err != null && err != 'undefined'  && err != '') {
    let failure = document.createElement("h3");
    failure.innerHTML = err;
    failure.setAttribute("id", "failure");
    registerDiv.appendChild(failure);
    registerDiv.style.display="block";
   }
   if(user != null && user != 'undefined'  && user != '') {

       
       let success = document.createElement("h3");
       success.setAttribute("id", "success");
       success.innerHTML = "User Created Successfully !";

       
       registerDiv.appendChild(success);
   } else {
    failure();
   }
}
}

function failure() {
    let failureMsg = document.createElement("h3");
    failureMsg.setAttribute("id", "failureMsg");
    failureMsg.innerHTML = "User is not created !";
    registerDiv.appendChild(failureMsg);
    registerDiv.style.display="block";

}
