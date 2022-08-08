import mongoose from 'mongoose';

const airplaneSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50,
  },
  seats: {
    type: Number,
    required: true,
    min: 5,
    max: 200,
  },
  fuelCapacity: {
    type: Number,
    required: true,
    min: 500,
    max: 2000,
  },
});
const Airplane = mongoose.model('Airplane', airplaneSchema);

export default Airplane;
