const config = require('config.json');
const db = require('../db');
const Ticket = db.Ticket;

module.exports = {
		verify,
		getById,
		create,
		update,
		getLatestTicketNo
};

async function verify(ticketNo) {
	const ticket = await User.findOne({ ticketNo : ticketNo });
	if (ticket && !ticket.verified) {
		update(ticket.id, ticket)

	} 
	const verfiedTicket = await Ticket.findOne({ ticketName: ticketName });

	return {
		...verfiedTicket.toJSON()
	};
}


async function create(ticketParam) {
	console.log("addticket serv" + ticketParam);
	const ticketNo = ticketParam.ticketNo ;
	// validate
	console.log(ticketParam);

	const ticket = new Ticket(ticketParam);

	// save ticket
	await ticket.save();
	const createdTicket = await Ticket.findOne({ ticketNo: ticketNo });
	if (createdTicket ) {
		return {
			...createdTicket.toJSON()
		};
	}

}

async function update(id, ticketParam) {
	console.log("update serv id: " + id);
	
	const ticket = await Ticket.findOne({ ticketNo: ticketParam.ticketNo });
	console.log("update serv ticket: " + ticket);
	// validate
	if (!ticket) throw 'ticket not found';

	// copy ticketParam properties to ticket
	Object.assign(ticket, ticketParam);

	await ticket.save();
	console.log("saved" );
	const updatedTicket = await Ticket.findOne({ ticketNo: ticket.ticketNo });
	if (updatedTicket ) {
		return {
			...updatedTicket.toJSON()
		};
	}
}

async function getById(ticketNo) {
	console.log(ticketNo);
	var ticket = await Ticket.findOne({ ticketNo: ticketNo }).populate('event');
	console.log(ticket);
	return ticket;
}


async function getLatestTicketNo() {
	return await Ticket.find({}).sort({"ticketNo":-1}).collation({locale: "en_US", numericOrdering: true}).limit(1);
}