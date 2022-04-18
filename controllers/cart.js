const Cart = require('../models/cart');

class CartController {
  static async addToCart(req, res) {
    const {userId, productId, quantity} = req.body;
    try {
      const existCart = await Cart.findOne({user: userId})
        .populate('items.product')
        .exec();

      if (existCart === null) {
        const newCart = new Cart({
          user: userId,
          items: [
            {
              product: productId,
              quantity,
            },
          ],
        });

        await newCart.save().catch((error) => {
          throw {error, message: 'Error while creating cart'};
        });

        return res.json(newCart);
      }

      const matchProductIndex = existCart.items.findIndex(
        (item) => String(item.product._id) === productId
      );

      const newQuantity = quantity ? quantity : 1;
      if (matchProductIndex >= 0) {
        existCart.items[matchProductIndex].quantity =
          existCart.items[matchProductIndex].quantity + newQuantity;
      } else {
        existCart.items.push({
          user: userId,
          product: productId,
          quantity,
        });
      }

      await existCart.save().catch((error) => {
        throw {error, message: 'Error while creating cart'};
      });

      return res.json(existCart);
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  static async removeFromCart(req, res) {
    const {userId, productId, quantity} = req.body;
    try {
      const existCart = await Cart.findOne({user: userId})
        .populate('items.product')
        .exec();

      if (existCart === null) {
        throw {error, message: 'Cart doesnt exist!'};
      }

      const matchProductIndex = existCart.items.findIndex(
        (item) => String(item.product._id) === productId
      );

      if (
        matchProductIndex >= 0 &&
        existCart.items[matchProductIndex].quantity > 1
      ) {
        existCart.items[matchProductIndex].quantity =
          existCart.items[matchProductIndex].quantity - 1;
      } else {
        existCart.items.splice(matchProductIndex, 1);
      }

      await existCart.save().catch((error) => {
        throw {error, message: 'Error while creating cart'};
      });

      return res.json(existCart);
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  static async listCart(req, res) {
    try {
      const carts = await Cart.find({}).populate('items.product');

      return res.json(carts);
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  static async getCartById(req, res) {
    const {_id} = req.params;
    try {
      const cart = await Cart.findById({_id});

      return res.json(cart);
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  static async deleteCart(req, res) {
    const {_id} = await req.params;

    try {
      const cart = await Cart.deleteOne({_id});

      return res.json(cart);
    } catch (error) {
      return res.status(500).json(error);
    }
  }
}

module.exports = CartController;
