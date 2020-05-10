import jwt from 'jsonwebtoken';
import { promisify } from 'util';

import User from '../models/User';

class SessionController {
  async index(req, res) {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ error: 'Token not provided' });
    }

    const [, token] = authHeader.split(' ');

    try {
      await promisify(jwt.verify)(token, process.env.APP_SECRET);
    } catch (err) {
      return res.status(401).json({ error: 'Token invalid' });
    }

    return res.status(200).send();
  }

  async store(req, res) {
    const { email, password } = req.body;

    const user = await User.findOne({
      where: {
        email,
      },
    });

    if (!user) {
      return res.status(401).json({ error: 'User not found' });
    }

    if (!(await user.checkPassword(password))) {
      return res.status(401).json({ error: 'Password does not match' });
    }

    const { id, name } = user;

    return res.json({
      user: {
        id,
        name,
        email,
      },
      token: jwt.sign({ id }, process.env.APP_SECRET, {
        expiresIn: '7d',
      }),
    });
  }
}

export default new SessionController();
