const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    payment: {
      type: String,
      required: true,
    },
    cart: {
      type: String,
      required: true,
    },

    user: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
