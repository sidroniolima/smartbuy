import * as Yup from 'yup';
import Group from '../models/Group';

class GroupController {
  async index(req, res) {
    const groups = await Group.findAll();

    return res.json(groups);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      description: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const group = await Group.create(req.body);

    return res.json(group);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      description: Yup.string().required(),
      id: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const group = await Group.findByPk(req.body.id);

    if (!group) {
      return res.status(404).json({ error: 'Group not founded' });
    }

    const groupUpdated = await group.update(req.body);

    return res.json(groupUpdated);
  }

  async show(req, res) {
    const { id } = req.params;

    const group = await Group.findOne({ where: { id } });

    if (!group) {
      return res.status(404).json({ error: 'Group not founded' });
    }

    return res.json(group);
  }

  async destroy(req, res) {
    const { id } = req.params;

    const group = await Group.findOne({ where: { id } });

    if (!group) {
      return res.status(404).json({ error: 'Group not founded' });
    }

    await group.destroy();

    return res.status(200).send();
  }
}

export default new GroupController();
