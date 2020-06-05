require("rootpath")();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const path = require("path");

//set port, listen for requests
const port = 8081;
const host = "localhost";
const jwt = require("./jwt");
const errorHandler = require('./error-handler');
var http = require('http').createServer(app);

//declare static files paths
app.use("/css", express.static(__dirname + '/css'));
app.use("/js", express.static(__dirname + '/js'));
app.use("/images", express.static(__dirname + '/images'));


var corsOptions = {
		origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

//parse requests of content-type - application/json
app.use(bodyParser.json());
//parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

//api routes
app.use('/users', require('./api/users.controller'));
app.use('/events', require('./api/events.controller'));
app.use('/tickets', require('./api/tickets.controller'));

//use JWT auth to secure the api
//app.use(jwt());


const server = http.listen(port, host, () => console.log(`Event Management api listening on port ${port}!`));

//global error handler
app.use(errorHandler);

//simple route

app.get("/", (req, res) => {
	res.sendFile(__dirname + '/view/login.html');
});

app.get("/login", (req, res) => {
	res.sendFile(__dirname + '/view/login.html');
});

app.get("/registerUser", (req, res) => {
	res.sendFile(__dirname + '/view/registerUser.html');
});

app.get("/addEvent", (req, res) => {
	res.sendFile(__dirname + '/view/addEvent.html');
});

app.get("/viewEvents", (req, res) => {
	res.sendFile(__dirname + '/view/viewEvents.html');
});

app.get("/bookTicket", (req, res) => {
	res.sendFile(__dirname + '/view/bookTicket.html');
});

app.get("/viewTicket", (req, res) => {
	res.sendFile(__dirname + '/view/viewTicket.html');
});

app.get("/verifyTicket", (req, res) => {
	res.sendFile(__dirname + '/view/verifyTicket.html');
});


module.exports = app;