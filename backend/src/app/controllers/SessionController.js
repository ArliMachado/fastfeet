import jwt from 'jsonwebtoken';

import User from '../models/User';
import { secret, expiresIn } from '../../config/auth';

class SessionController {
  async store(req, res) {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(400).json({ error: 'Usuário ou senha inválido' });
    }

    if (!(await user.checkPassword(password))) {
      return res.status(400).json({ error: 'Usuário ou senha inválido' });
    }

    const token = jwt.sign({ id: user.id }, secret, { expiresIn });
    const { id, name } = user;

    return res.json({
      user: {
        id,
        name,
        email,
      },
      token,
    });
  }
}

export default new SessionController();
