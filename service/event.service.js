const config = require('config.json');
const db = require('../db');
const Event = db.Event;

module.exports = {
    getAll,
    getById,
    create,
    update,
    delete: _delete
};


async function create(eventParam) {
	console.log("addEvent serv" + eventParam);
    const eventName = eventParam.eventName ;
    // validate
    console.log(eventParam);
    if (await Event.findOne({ eventName: eventName })) {
    	console.log("error" + eventParam);
        throw 'Event Name "' + eventName + '" is already taken';
    }

    const event = new Event(eventParam);

    // save event
    await event.save();

    const createdEvent = await Event.findOne({ eventName: eventName });
   
    if (createdEvent ) {
         console.log(createdEvent.toJSON());
        return {
            ...createdEvent.toJSON()
        };
    }

}

async function update(id, eventParam) {
	console.log("update Id: " + id);
    const event = await Event.findById(id);
    console.log("update: " + event);
    // validate
    if (!event) throw 'event not found';

    // copy eventParam properties to event
    Object.assign(event, eventParam);

    await event.save();
}

async function _delete(id) {
    await Event.findByIdAndRemove(id);
}

async function getAll() {
    return await Event.find();
}

async function getById(eventName) {
    return await Event.findOne({ eventName: eventName });
}