import mongoose from 'mongoose';
import cuid from 'cuid';

const ticketSchema = new mongoose.Schema({
  seatNumber: {
    type: Number,
    required: true,
    min: 0,
    max: 2000,
  },
  confirmationNumber: {
    type: String,
    default: cuid(),
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  price: {
    type: Number,
    min: 5,
    max: 10000,
    required: true,
  },
  class: {
    type: String,
    default: 'C',
    required: true,
  },
  flight: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Flight',
    required: true,
  },
});
const Ticket = mongoose.model('Ticket', ticketSchema);

export default Ticket;
