window.onload = deleteCookies();

function deleteCookies() {
	document.cookie.split(";").forEach(function(c) { document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=Thu, 01 Jan 1970 00:00:00 GMT"+ ";path=/"); });
}



document.getElementById('submit').addEventListener('click', () => {
    const user = document.getElementById('username').value;
    const pass = document.getElementById('password').value;

    authenticateUser(user, pass);
});

async function authenticateUser(username, password) {
	
    const url = 'http://localhost:8081/users/authenticate';
    const obj = {
        username: username,
        password: password
    }

    const response = await fetch(url, {
		 method: 'POST', body: JSON.stringify(obj), 
		 headers: { 'Content-Type': 'application/json' }
		 });
	// Extract the JWT from the response
    let data = await response.json();
    if(response.status===200) {
    const  user  = data.user;
    if(user != null && user != 'undefined' && user != '') {
    	var x = document.cookie;
    	var cookieStr = x.split('=');
    	var jsonStr = JSON.parse(cookieStr[0]);
    	var roleStr = jsonStr.role;
    	if("admin" == roleStr) {
        window.location = 'http://localhost:8081/addEvent';
    	} else if("staff" == roleStr) {
        window.location = 'http://localhost:8081/verifyTicket';
    	} else if("user" == roleStr) {
        window.location = 'http://localhost:8081/viewEvents';
    	}
    }
    
    } else {
    	 const  error  = data.message;
    	 alert(error);
    }
}








