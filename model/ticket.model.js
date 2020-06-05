const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ticketSchema = new Schema({
	ticketNo : { type: String, unique: true, required: true },
    event: { 
    	type: Schema.Types.ObjectId,
    	ref: 'Event', required: true },
    verified: { type:Boolean, default:false }
   
});

ticketSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
    }
});

module.exports = mongoose.model('Ticket', ticketSchema);