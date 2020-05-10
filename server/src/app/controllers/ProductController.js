import * as Yup from 'yup';
import Product from '../models/Product';
import Inventory from '../models/Inventory';

class ProductController {
  async store(req, res) {
    const schema = Yup.object().shape({
      description: Yup.string().required(),
      groupId: Yup.number().required(),
      productCode: Yup.string(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const product = await Product.create(req.body);

    if (product) {
      await Inventory.create({
        product_id: product.id,
        qty: 0,
        lastPurchaseDate: new Date(),
        lastSellingDate: null,
      });
    }

    return res.json(product);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      description: Yup.string().required(),
      groupId: Yup.number().required(),
      productCode: Yup.string(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const product = await Product.findByPk(req.body.id);

    if (!product) {
      return res.status(404).json({ error: 'Product not founded' });
    }

    const productUpdated = await product.update(req.body);

    return res.json(productUpdated);
  }

  async index(req, res) {
    const products = await Product.findAll();

    return res.json(products);
  }

  async show(req, res) {
    const { id } = req.params;

    const product = await Product.findOne({ where: { id } });

    if (!product) {
      return res.status(404).json({ error: 'Product not founded' });
    }

    return res.json(product);
  }

  async destroy(req, res) {
    const { id } = req.params;

    const product = await Product.findOne({ where: { id } });

    if (!product) {
      return res.status(404).json({ error: 'Product not founded' });
    }

    await product.destroy();

    return res.status(200).send();
  }
}

export default new ProductController();
