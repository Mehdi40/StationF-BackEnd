import Room from '../models/room';
import Reservation from '../models/reservation';
import mongoose from 'mongoose';
import _ from 'lodash';

mongoose.set('debug', true);

export default class ReservationController {
  async getAllRooms() {
    const rooms = await Room.find().exec();

    const equipments = _.uniqBy(_.flatten(_.map(rooms, 'equipements')), 'name');

    console.log('equipments', equipments);

    if (!rooms) throw new Error('No rooms were found.');
    return {rooms: rooms, equipments: equipments};
  }

  async getRoom(id) {
    const room = await Room.findById(id).exec();

    if (!room) throw new Error(`No room were found with this ID ${id}`);
    return room;
  }

  async bookRoom(id, startDate, endDate) {
    const reservation = new Reservation({
      room: mongoose.Types.ObjectId(id),
      reservationStartDate: startDate,
      reservationEndDate: endDate,
      createdAt: new Date(),
      updatedAt: new Date()
    });

    await reservation.save(err => {
      if (err) throw new Error('ReservationModel: A problem occured during the booking of the room');
    });
    
    return reservation;
  }

  async cancelReservation(id, bookingId) {
    const reservation = await Reservation.findByIdAndDelete(mongoose.Types.ObjectId(bookingId));

    console.log(reservation);
    return !!reservation;
  }

  async getFormattedBookedHours(date) {
    const filteredReservations = {};
    const rooms = await Room.find().exec();
    const reservations = await this.getBookedHours(date);
    const roomsIds = _.map(rooms, '_id');
    
    _.forEach(roomsIds, function(id) {
      const reservationsByRooms = _.filter(reservations, ['room', id.toString()]);
      const cleanedReservationsByRoom = _.map(reservationsByRooms, 'reservationStartDate');
      filteredReservations[id] = cleanedReservationsByRoom;
    });

    return filteredReservations;
  }

  async getBookedHours(date) {
    const newDate = new Date(date);

    const reservations = await Reservation.find({
      reservationStartDate: {
        $gte: new Date(newDate.getFullYear() + ',' + (newDate.getMonth() + 1) + ',' + newDate.getDate()),
        $lt: new Date(newDate.getFullYear() + ',' + (newDate.getMonth() + 1) + ',' + (newDate.getDate() + 1)),
      }
    }).exec();

    return reservations;
  }
}