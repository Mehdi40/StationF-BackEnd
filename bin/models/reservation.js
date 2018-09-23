import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const ReservationSchema = Schema({
  room: {
    type: String,
    required: true,
    default: 0
  },
  reservationStartDate: {
    type: Date,
    required: true,
    default: new Date()
  },
  reservationEndDate: {
    type: Date,
    required: true,
    default: new Date().setHours(new Date().getHours() + 1)
  },
  createdAt: {
    type: Date,
    required: true,
    default: new Date()
  },
  updatedAt: {
    type: Date,
    required: true,
    default: new Date()
  }
});

const Reservation = mongoose.model('Reservation', ReservationSchema);

module.exports = Reservation;