const mongoose = require("mongoose");

const { Schema } = mongoose;

const bookgSchema = new Schema(
  {
    name: {
      type: String,
      require: true,
    },

    author: {
      type: String,
    },
    price: {
      type: Number,
      require: true,
    },

    description: String,
  },

  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Book", bookgSchema);
