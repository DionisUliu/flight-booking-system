import mongoose from 'mongoose';
import cuid from 'cuid';

const flightsSchema = new mongoose.Schema({
  flightNumber: {
    type: String,
    default: cuid(),
  },
  departureDate: {
    type: Date,
    required: true,
  },
  arrivalDate: {
    type: Date,
    required: true,
  },
  durationInHours: {
    type: Number,
    max: 60,
    required: true,
  },
  durationInMiles: {
    type: Number,
    max: 1000000,
    required: true,
  },
  departureAirport: {
    type: new mongoose.Schema({
      name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50,
      },
      code: {
        type: String,
        min: 10,
        max: 200,
        required: true,
      },
      city: {
        type: String,
        required: true,
        min: 3,
        max: 100,
      },
      state: {
        type: String,
        required: true,
        min: 3,
        max: 100,
      },
    }),
    required: true,
  },
  arrivalAirport: {
    type: new mongoose.Schema({
      name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50,
      },
      code: {
        type: String,
        min: 10,
        max: 200,
        required: true,
      },
      city: {
        type: String,
        required: true,
        min: 3,
        max: 100,
      },
      state: {
        type: String,
        required: true,
        min: 3,
        max: 100,
      },
    }),
    required: true,
  },
  totalAmountOfTickets: {
    type: Number,
    min: 30,
    max: 2000,
    required: true,
  },
  availableSeatNumbers: {
    type: [Number],
    required: true,
  },
  airplane: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Airplane',
    required: true,
  },
});
const Flight = mongoose.model('Flight', flightsSchema);

export default Flight;
