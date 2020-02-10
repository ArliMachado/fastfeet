import Recipient from '../models/Recipients';

class RecipientController {
  async store(req, res) {
    const recipient = await Recipient.create(req.body);

    return res.json(recipient);
  }

  async update(req, res) {
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
