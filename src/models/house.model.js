const mongoose = require('mongoose');
const House = mongoose.Schema;
const HouseSchema = new House(
  {
    address: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
      enum: [
        'Abuja',
        'Lagos',
        'Ogun',
        'Osun',
        'Ondo',
        'Oyo',
        'Kwara',
        'Kogi',
        'Niger',
        'Kaduna',
        'Kano',
        'Katsina',
        'Kebbi',
        'Sokoto',
        'Borno',
        'Taraba',
        'Adamawa',
        'Yobe',
        'Bauchi',
        'Gombe',
        'Plateau',
        'Nassarawa',
        'Jigawa',
        'Ekiti',
        'Edo',
        'Delta',
        'Rivers',
        'Cross River',
        'Enugu',
        'Abia',
        'Imo',
        'Ebonyi',
        'Akwa Ibom',
        'Zamfara',
        'Anambra',
        'Bayelsa',
        'Benue',
      ],
    },
    description: {
      type: String,
      required: true,
    },
    isItFurnished: {
      type: String,
      required: true,
      enum: ['Yes', 'No'],
    },
    propertyType: {
      type: String,
      required: true,
      enum: [
        'Self Contain',
        'Mini Flats',
        'Flat/Apartments',
        'Semi Detached Bungalow',
        'Semi Detached Duplex',
        'Detached Bungalow',
        'Terraced Duplex',
        'Detached Duplex',
      ],
    },
    bedroom: {
      type: String,
      required: true,
      enum: ['1', '2', '3', '4', '5', '6', '7'],
    },
    bathroom: {
      type: String,
      required: true,
      enum: ['1', '2', '3', '4', '5', '6', '7'],
    },
    toilet: {
      type: String,
      required: true,
      enum: ['1', '2', '3', '4', '5', '6', '7'],
    },
    amenities: [
      {
        type: String,
        required: true,
      },
    ],
    price: {
      type: String,
      required: true,
    },
    negotiable: {
      type: String,
      required: true,
      enum: ['Yes', 'No'],
    },
    photos: {
      type: [],
      required: true,
    },
    description: {
      type: String,
      
    }
  },
  { timestamps: true }
);

const HouseModel = mongoose.model('House', HouseSchema);

module.exports = HouseModel;