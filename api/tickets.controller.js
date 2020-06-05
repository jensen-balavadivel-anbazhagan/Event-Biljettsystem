const express = require('express');
const router = express.Router();
const ticket = require('../service/ticket.service');
const authJwt = require('../jwt');

// routes

router.post('/register',authJwt.verifyToken, register);
router.get('/latestTicketNo',authJwt.verifyToken, getLatestTicketNo);
router.post('/verify/:id',authJwt.verifyToken, verify);
router.get('/getTicket/:id', authJwt.verifyToken, getById);

module.exports = router;

async function verify(req, res, next) {
	 console.log("verify control" + req.body);
    ticket.update(req.params.id,req.body)
       .then(ticket => ticket ? res.json({ticket: ticket}) : res.status(400).json({ message: 'Ticket cannot be verified' }))
     .catch(err => next(err));
}

async function register(req, res, next) {
   ticket.create(req.body)
   .then(createdticket => createdticket ? res.json(  {ticket: createdticket}) : res.status(400))
    .catch(err => res.status(400).json({ error: err }));
}


function getById(req, res, next) {
    ticket.getById(req.params.id)
        .then(ticket => ticket ?  res.json({ticket: ticket}) : res.sendStatus(404))
        .catch(err => next(err));
}


function getLatestTicketNo(req, res, next) {
	
	ticket.getLatestTicketNo()
    .then(ticket => ticket ?  res.json({ticket: ticket}) : res.sendStatus(404))
    .catch(err => next(err));
} 

