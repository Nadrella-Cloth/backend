const Product = require('../models/product');
const Category = require('../models/category');

class ProductController {
  static async createProduct(req, res) {
    const {name, desc, category, image, price} = await req.body;

    try {
      const existProduct = await Product.find({name}).exec();
      if (existProduct.length) throw {message: 'Product already exist!'};

      const newProduct = new Product({
        name,
        desc,
        category,
        image,
        price,
      });

      await newProduct.save().catch((error) => {
        throw {error, message: 'Error while creating product'};
      });

      return res.json(newProduct);
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  static async updateProduct(req, res) {
    const {_id, name, desc, category, image, price} = await req.body;

    try {
      const existProduct = await Product.updateOne(
        {_id},
        {name, desc, category, image, price}
      ).exec();
      if (existProduct.length) throw {message: 'Product doesnt exist!'};

      return res.json(existProduct);
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  static async listProduct(req, res) {
    try {
      const products = await Product.find({});
      return res.json(products);
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  static async getProductById(req, res) {
    const {id} = req.params;
    try {
      const product = await Product.findById(id);
      return res.json(product);
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  static async deleteProduct(req, res) {
    const {_id} = req.params;
    try {
      const product = await Product.deleteOne({_id});
      return res.json(product);
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  static async createCategory(req, res) {
    const {name} = await req.body;

    try {
      const existCategory = await Category.findOne({name}).exec();
      if (existCategory) throw {message: 'Category already exist!'};

      const newCategory = new Category({
        name,
      });

      await newCategory.save().catch((error) => {
        throw {error, message: 'Error while creating category'};
      });

      return res.json(newCategory);
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  static async listCategory(req, res) {
    try {
      const categories = await Category.find({});
      return res.json(categories);
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  static async updateCategory(req, res) {
    const {_id, name} = await req.body;

    try {
      const existCategory = await Category.updateOne({_id}, {name});

      return res.json(existCategory);
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  static async deleteCategory(req, res) {
    const {_id} = await req.params;

    try {
      const category = await Category.deleteOne({_id});

      return res.json(category);
    } catch (error) {
      return res.status(500).json(error);
    }
  }
}

module.exports = ProductController;
