import Purchase from '../models/Purchase';
import PurchaseItem from '../models/PurchaseItem';
import Product from '../models/Product';
import Vendor from '../models/Vendor';

class LatestsPurchasesController {
  async index(req, res) {
    const purchases = await Purchase.findAll({
      include: [
        {
          model: PurchaseItem,
          as: 'items',
          include: [
            {
              model: Product,
              as: 'product',
            },
          ],
        },
        {
          model: Vendor,
          as: 'vendor',
        },
      ],
      order: [['orderDate', 'DESC']],
      limit: 5,
    });

    return res.json(purchases);
  }
}

export default new LatestsPurchasesController();
