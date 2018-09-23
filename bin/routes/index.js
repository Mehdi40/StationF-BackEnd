import express from 'express';
import ReservationController from '../controllers/reservation';


const router = express.Router();

router.get('/', async (req, res) => {
  return res.status(200).json({message: 'Bienvenue'});
});

router.get('/rooms', async (req, res) => {
  try {
    const reservation = new ReservationController();
    let data = await reservation.getAllRooms();
    
    return res.status(200).json(data);
  } catch(err) {
    return res.status(500).send(`There was a problem. ${err}`);
  }
});

router.get('/rooms/:id', async (req, res) => {
  try {
    const reservation = new ReservationController();
    let room = await reservation.getRoom(req.params.id);
    return res.status(200).send({room: room});
  } catch(err) {
    return res.status(500).send(`There was a problem. ${err}`);
  }
});

router.post('/rooms/:id/book', async (req, res) => {
  try {
    const reservation = new ReservationController();
    let reservationDone = await reservation.bookRoom(req.params.id, req.body.startDate, req.body.endDate);
    return res.status(200).send({reservation: reservationDone});
  } catch(err) {
    return res.status(500).send(`There was a problem. ${err}`);
  }
});

router.delete('/rooms/:id/:bookingId/cancel', async (req, res) => {
  try {
    const reservation = new ReservationController();
    let updatedRoom = await reservation.cancelReservation(req.params.id, req.params.bookingId);
    return res.status(200).send({room: updatedRoom});
  } catch(err) {
    return res.status(500).send(`There was a problem. ${err}`);
  }
});

router.get('/reservations/:date', async (req, res) => {
  try {
    const reservation = new ReservationController();
    let bookedHours = await reservation.getFormattedBookedHours(req.params.date);
    return res.status(200).send({bookedHours: bookedHours});
  } catch(err) {
    return res.status(500).send(`There was a problem. ${err}`);
  }
});

module.exports = router;