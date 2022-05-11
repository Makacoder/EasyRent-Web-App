const mongoose = require("mongoose");

const House = mongoose.Schema;

const HouseSchema = new House(
  {
    location: {
      type: String,
      required: true,
    },
    houseImage: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
      enum: [
        "semiDetachedBungalow",
        "detachedBungalow",
        "semiDetachedDuplex",
        "detachedDuplex",
        "terracedDuplex",
      ],
    },
    price: {
      type: String,
      required: true,
    },
    bedroomType: {
      type: String,
      enum: ["selfContain", "miniFlats", "flats"],
    },
  },
  { timestamps: true }
);

const HouseModel = mongoose.model("House", HouseSchema);

module.exports = HouseModel;
