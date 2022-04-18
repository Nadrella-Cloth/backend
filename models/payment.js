const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema(
  {
    chart: {
      type: String,
      required: true,
    },
    shippingprice: {
      type: String,
      required: true,
    },
    shippingtime: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    destination: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Payment", paymentSchema);
