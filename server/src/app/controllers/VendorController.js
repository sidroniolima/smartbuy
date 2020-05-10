import * as Yup from 'yup';
import Vendor from '../models/Vendor';

class VendorController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      erpCode: Yup.string(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const vendor = await Vendor.create(req.body);

    return res.json(vendor);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      erpCode: Yup.string(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const vendor = await Vendor.findByPk(req.body.id);

    if (!vendor) {
      return res.status(404).json({ error: 'Vendor not founded' });
    }

    const vendorUpdated = await vendor.update(req.body);

    return res.json(vendorUpdated);
  }

  async index(req, res) {
    const vendors = await Vendor.findAll();

    return res.json(vendors);
  }

  async show(req, res) {
    const { id } = req.params;

    const vendor = await Vendor.findOne({ where: { id } });

    if (!vendor) {
      return res.status(404).json({ error: 'Vendor not founded' });
    }

    return res.json(vendor);
  }

  async destroy(req, res) {
    const { id } = req.params;

    const vendor = await Vendor.findOne({ where: { id } });

    if (!vendor) {
      return res.status(404).json({ error: 'Vendor not founded' });
    }

    await vendor.destroy();

    return res.status(200).send();
  }
}

export default new VendorController();
