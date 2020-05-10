import * as Yup from 'yup';
import Inventory from '../models/Inventory';
import Product from '../models/Product';

class InventoryController {
  async store(req, res) {
    const schema = Yup.object().shape({
      product_id: Yup.number().required(),
      qty: Yup.number().required(),
      lastPurchaseDate: Yup.date().required(),
      lastSellingDate: Yup.date().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const inventoryItem = await Inventory.create(req.body);

    return res.json(inventoryItem);
  }

  async show(req, res) {
    const { vendorCode } = req.params;

    if (!vendorCode) {
      return res.status(401).json({ error: 'Product vendor is missing.' });
    }

    const inventoryItem = await Inventory.findOne({
      include: [
        {
          model: Product,
          as: 'product',
          where: {
            vendorCode,
          },
        },
      ],
    });

    if (!inventoryItem) {
      return res.status(404).json({ error: 'Product not founded.' });
    }

    return res.json(inventoryItem);
  }
}

export default new InventoryController();
