import chai from 'chai';
import _ from 'lodash';
import chaiHttp from 'chai-http';

let should = chai.should();

let Room = require('../../models/room');
let Reservation = require('../../models/reservation');
let server = require('../../server');

import roomsFixtures from '../fixtures/rooms';

chai.use(chaiHttp);

let rooms;

describe('Rooms', () => {
  beforeEach(async () => {
    rooms = await Room.find().exec();
  });

  describe('/GET /rooms', () => {
    it('it should GET all the rooms', (done) => {
      chai.request(server)
        .get('/rooms')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.equipments.should.be.a('array');
          res.body.rooms.should.be.a('array');
          res.body.rooms.length.should.be.eql(5);
          done();
        });
    });
  });

  describe('/GET /rooms/:id', () => {
    it('it should find a room with an id', (done) => {
      chai.request(server)
        .get(`/rooms/${rooms[0]._id.toString()}`)
        .end((err, res) => {
          console.log(res.body.room);
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.room.should.be.a('object');
          res.body.room.capacity.should.be.eql(4);
          res.body.room.equipements.should.be.a('array');
          res.body.room.equipements.length.should.be.eql(2);
          res.body.room.name.should.be.eql('Hermès');
          done();
        });
    });
  });

  describe('/GET /rooms/:id/book', () => {
    it('it should book a room', (done) => {
      chai.request(server)
        .post(`/rooms/${rooms[0]._id.toString()}/book`)
        .send({id: rooms[0]._id, startDate: new Date(), endDate: new Date()})
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.reservation.should.be.a('object');
          res.body.reservation.room.should.be.eql(rooms[0]._id.toString());
          res.body.reservation.reservationStartDate.should.be.a('string');
          res.body.reservation.reservationEndDate.should.be.a('string');
          done();
        });
    });
  });
});

describe('Reservations', () => {
  before((done) => {
    Reservation.deleteMany({}, (err) => {
      done();
    });
  });

  describe('GET /reservations/:date', () => {
    it('it should book a room for reservation test', (done) => {
      chai.request(server)
        .post(`/rooms/${rooms[3]._id.toString()}/book`)
        .send({id: rooms[3]._id, startDate: new Date(), endDate: new Date()})
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });
    it('it should GET all the reservations for a date', (done) => {
      const date = new Date();
      chai.request(server)
        .get(`/reservations/${date.toDateString()}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.bookedHours.should.be.a('object');
          res.body.bookedHours[rooms[3]._id.toString()].should.be.a('array');
          res.body.bookedHours[rooms[3]._id.toString()].length.should.be.eql(1);
          done();
        });
    });
  });
});