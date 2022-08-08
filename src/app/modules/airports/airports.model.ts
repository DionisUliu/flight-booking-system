import mongoose, { Schema, Document } from 'mongoose';
import cuid from 'cuid';
import { IAirport } from './airports.type';

interface IFlightDocument extends IAirport, Document {
  getAirportImportantProperties: () => {
    name: string;
    code: string;
    city: string;
    state: string;
  };
}

const airportSchema: Schema<IFlightDocument> = new mongoose.Schema({
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
    default: cuid(),
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
});

airportSchema.methods.getAirportImportantProperties = function () {
  return {
    name: this.name,
    code: this.code,
    city: this.city,
    state: this.state,
  };
};
const Airport = mongoose.model<IFlightDocument>('Airport', airportSchema);

export default Airport;
