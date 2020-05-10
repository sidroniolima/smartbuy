import Purchase from '../models/Purchase';
import PurchaseItem from '../models/PurchaseItem';
import Product from '../models/Product';
import User from '../models/User';
import Vendor from '../models/Vendor';

class PurchaseController {
  async store(req, res) {
    const { userId } = req;

    const purchaseWithUser = { ...req.body, user_id: userId };

    try {
      const purchase = await Purchase.create(purchaseWithUser, {
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
        ],
      });

      return res.json(purchase);
    } catch (err) {
      console.log(err);
      return res.status(500).send();
    }
  }

  async update(req, res) {
    try {
      await PurchaseItem.destroy({ where: { purchase_id: req.body.id } });

      const response = await Purchase.update(req.body, {
        where: {
          id: req.body.id,
        },
      });

      await PurchaseItem.bulkCreate(req.body.items);

      return res.json(
        await Purchase.findByPk(req.body.id, {
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
          ],
        })
      );
    } catch (err) {
      console.log(err);
      return res.status(500).send();
    }
  }

  async show(req, res) {
    const { id } = req.params;

    const purchase = await Purchase.findByPk(id, {
      include: [
        {
          model: Vendor,
          as: 'vendor',
        },
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
      ],
    });

    if (!purchase) {
      return res.status(404).json({ error: 'Purchase not founded' });
    }

    return res.json(purchase);
  }

  async index(req, res) {
    const purchases = await Purchase.findAll({
      include: [
        {
          model: Vendor,
          as: 'vendor',
        },
        {
          model: User,
          as: 'creator',
        },
      ],
      order: [['orderDate', 'DESC']],
    });

    return res.json(purchases);
  }

  async destroy(req, res) {
    const { id } = req.params;

    const purchase = await Purchase.findByPk(id);

    if (!purchase) {
      return res.status(404).json({ error: 'Purchase not founded' });
    }

    purchase.destroy();
    return res.status(200).send();
  }
}

export default new PurchaseController();
