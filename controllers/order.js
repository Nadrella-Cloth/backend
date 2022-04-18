const Order = require('../models/order');

class OrderController {
  static async listOrder(req, res) {
    try {
      const {user} = req.body;
      const query = user ? {user} : {};
      const orders = await Order.find(query).exec();

      return res.json(orders);
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  static async getOrderById(req, res) {
    try {
      const {_id} = req.params;
      const {user} = req.body;

      const query = user ? {_id, user} : {_id};
      const order = await Order.findOne(query).exec();
      if (order == null) throw {message: 'Order not found'};
      return res.json(order);
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  static async deleteOrder(req, res) {
    try {
      const {_id} = req.params;
      const {user} = req.body;
      const query = user ? {_id, user} : {_id};
      const deleteOrder = await Order.deleteOne(query);

      return res.json(deleteOrder);
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  static async create(req, res) {
    try {
      const {
        payment: {status, sender},
        shipping: {
          receiver: {name, city, address, telephone},
          fee,
          estimation_day,
        },
        cart,
        user,
      } = await req.body;

      const newOrder = new Order({
        payment: {
          status,
          sender,
        },
        shipping: {
          receiver: {name, city, address, telephone},
          fee,
          estimation_day,
        },
        cart,
        user,
      });

      await newOrder.save().catch((error) => {
        throw {message: 'Error while creating Order'};
      });

      return res.json(newOrder);
    } catch (error) {
      return res.status(500).json(error);
    }
  }
}

module.exports = OrderController;
