const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema(
  {
    user: {
      type: String,
      required: true,
    },
    product: [
      {
        type: String,
        required: true,
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Cart", cartSchema);
