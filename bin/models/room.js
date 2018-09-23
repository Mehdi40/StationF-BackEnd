import mongoose from 'mongoose';
const Schema = mongoose.Schema;

mongoose.model('Equipement',
  Schema({
    name: {
      type: String,
      required: true
    },
    number: {
      type: Number,
      required: true,
      default: 1
    }
  })
);

const RoomSchema = Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: false
  },
  capacity: {
    type: Number,
    required: true,
    default: 1
  },
  equipements: [
    {
      type: mongoose.Schema.Types.Object,
      ref: "Equipement",
      required: false
    }
  ],
  createdAt: {
    type: Date,
    required: true,
    default: new Date()
  },
  updatedAt: {
    type: Date,
    required: true,
    default: new Date()
  },
  imgName: {
    type: String,
    required: true
  }
});

const Room = mongoose.model('Room', RoomSchema, 'room');

module.exports = Room;