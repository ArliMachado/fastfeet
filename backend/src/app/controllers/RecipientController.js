import * as Yup from 'yup';
import Recipient from '../models/Recipient';

const recipientSchema = Yup.object().shape({
  name: Yup.string().required(),
  street: Yup.string().required(),
  number: Yup.number().required(),
  complements: Yup.string().required(),
  state: Yup.string().required(),
  city: Yup.string().required(),
  postal_code: Yup.number().required(),
});

class RecipientController {
  async store(req, res) {
    if (!(await recipientSchema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const recipient = await Recipient.create(req.body);

    return res.json(recipient);
  }

  async update(req, res) {
    if (!(await recipientSchema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { id } = req.params;

    const recipient = await Recipient.findByPk(id);

    if (!recipient) {
      return res.status(400).json({ error: 'Recipient not found' });
    }

    const recipientUpdated = await recipient.update(req.body);

    return res.json(recipientUpdated);
  }
}

export default new RecipientController();
