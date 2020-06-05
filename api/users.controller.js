const express = require('express');
const router = express.Router();
const userService = require('../service/user.service');
const authJwt = require('../jwt');

// routes
router.post('/authenticate', authenticate);
router.post('/register', register);
router.get('/current',authJwt.verifyToken, getCurrent);
router.get('/:id',authJwt.verifyToken, getById);

module.exports = router;

async function authenticate(req, res, next) {
    userService.authenticate(req.body)
       .then(user => user ? setCookie(user,res) : res.status(400).json({ message: 'Username or password is incorrect' }))
     .catch(err => next(err));
}

function setCookie(user, res) {
	res.header(
		      "Access-Control-Allow-Headers",
		      "x-access-token, Origin, Content-Type, Accept"
		    );
    res.cookie(JSON.stringify({token:  user.token, role: user.role}));
    res.json({
        user: user
      });
     
}
async function register(req, res, next) {
	 console.log("adduser control" + req.body);
   userService.create(req.body)
   .then(createdUser => createdUser ? res.json(  {user: createdUser}) : res.status(400))
    .catch(err => res.status(400).json({ error: err }));
}

function getCurrent(req, res, next) {
    userService.getById(req.user.sub)
        .then(user => user ? res.json(user) : res.sendStatus(404))
        .catch(err => next(err));
}

function getById(req, res, next) {
    userService.getById(req.params.id)
        .then(user => user ? res.json(user) : res.sendStatus(404))
        .catch(err => next(err));
}

