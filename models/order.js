const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
  {
    payment: {
      staus: {
        type: String,
        enum: ['WAITING', 'CHECKING', 'ACCEPTED'],
        default: 'WAITING',
      },
      sender: {
        type: String,
        required: true,
      },
    },
    shipping: {
      receiver: {
        name: {
          type: String,
          required: true,
        },
        city: {
          type: String,
          required: true,
        },
        address: {
          type: String,
          required: true,
        },
        telephone: {
          type: String,
          required: true,
        },
      },
      fee: {
        type: Number,
        required: true,
      },
      estimation_day: {
        type: Number,
      },
    },
    cart: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Cart',
      required: true,
    },
    user: {
      type: String,
      required: true,
    },
  },
  {timestamps: true}
);

module.exports = mongoose.model('Order', orderSchema);
