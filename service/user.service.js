const config = require('config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('../db');
const User = db.User;

module.exports = {
    authenticate,
    getAll,
    getById,
    create,
    update,
    delete: _delete
};

async function authenticate({ username, password }) {
    const user = await User.findOne({ username });
    if (user && bcrypt.compareSync(password, user.hash)) {
    	console.log(user.id);
        const token = jwt.sign({ id: user.id }, config.secret);
        return {
            ...user.toJSON(),
            token
        };
    }
}



async function create(userParam) {
    const username = userParam.username ;
    // validate
    if (await User.findOne({ username: username })) {
        throw 'Username "' + username + '" is already taken';
    }

    const user = new User(userParam);

    // hash password
    if (userParam.password) {
        user.hash = bcrypt.hashSync(userParam.password, 10);
    }

    // save user
    await user.save();

    const createdUser = await User.findOne({ username: username });
   
    if (createdUser ) {
         console.log(createdUser.toJSON());
        return {
            ...createdUser.toJSON()
        };
    }

}

async function update(id, userParam) {
    const user = await User.findById(id);

    // validate
    if (!user) throw 'User not found';
    if (user.username !== userParam.username && await User.findOne({ username: userParam.username })) {
        throw 'Username "' + userParam.username + '" is already taken';
    }

    // hash password if it was entered
    if (userParam.password) {
        userParam.hash = bcrypt.hashSync(userParam.password, 10);
    }

    // copy userParam properties to user
    Object.assign(user, userParam);

    await user.save();
}

async function _delete(id) {
    await User.findByIdAndRemove(id);
}

async function getAll() {
    return await User.find();
}

async function getById(id) {
    return await User.findById(id);
}