const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const eventSchema = new Schema({
    eventName: { type: String, unique: true, required: true },
    location: { type: String, required: true },
    date: { type: Date, required: true },
    fromTime: { type: String, required: true  },
    noOfTickets: { type: String, required: true },
    price: { type: String, required: true }
});

eventSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
    }
});

module.exports = mongoose.model('Event', eventSchema);