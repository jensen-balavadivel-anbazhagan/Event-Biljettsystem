const express = require('express');
const router = express.Router();
const eventService = require('../service/event.service');
const authJwt = require('../jwt');

//routes
router.post('/addEvent',authJwt.verifyToken, addEvent);

router.get('/current',authJwt.verifyToken, getCurrent);
router.get('/getAllEvents',authJwt.verifyToken, getAllEvents);
router.get('/getById/:id',authJwt.verifyToken, getById);
router.post('/updateEvent/:id',authJwt.verifyToken, update);


module.exports = router;

async function addEvent(req, res, next) {
	console.log("addEvent control" + req.body);
	eventService.create(req.body)
	.then(createdEvent => createdEvent ? res.json(  {event: createdEvent}) : res.status(400))
	.catch(err => res.status(400).json({ error: err }));
}

function getCurrent(req, res, next) {
	eventService.getById(req.body.eventName)
	.then(event => event ? res.json(event) : res.sendStatus(404))
	.catch(err => next(err));
}

function getById(req, res, next) {
	eventService.getById(req.params.id)
	.then(event => event ? res.json(  {event : event}) : res.sendStatus(404))
	.catch(err => next(err));
}

function getAllEvents(req, res, next) { 
	console.log("getAllEvents" );
	eventService.getAll() 
	.then(events => events ? res.json( {events: events}) : res.sendStatus(404)) 
	.catch(err => next(err));
}

async function update(req, res, next) {
	eventService.update(req.params.id,req.body)
       .then(event => event ? res.json({event: event}) : res.status(400).json({ message: 'event cannot be updated' }))
     .catch(err => next(err));
}
