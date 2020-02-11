import * as Yup from 'yup';

import Delivery from '../models/Delivery';
import File from '../models/File';
import Recipient from '../models/Recipient';
import Deliveryman from '../models/Deliveryman';

class DeliveryController {
  async index(req, res) {
    const deliveries = await Delivery.findAll({
      attributes: ['id', 'product', 'canceled_at', 'start_date', 'end_date'],
      include: [
        {
          model: Recipient,
          as: 'recipient',
          attributes: [
            'name',
            'street',
            'number',
            'complements',
            'state',
            'city',
            'postal_code',
          ],
        },
        {
          model: Deliveryman,
          as: 'deliveryman',
          attributes: ['id', 'name', 'email'],
          include: [
            {
              model: File,
              as: 'avatar',
              attributes: ['id', 'path', 'url'],
            },
          ],
        },
        {
          model: File,
          as: 'signature',
          attributes: ['id', 'path', 'url'],
        },
      ],
    });

    return res.json(deliveries);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      recipient_id: Yup.number().required(),
      deliveryman_id: Yup.number().required(),
      signature_id: Yup.number().required(),
      product: Yup.string().required(),
      canceled_at: Yup.date(),
      start_date: Yup.date(),
      end_date: Yup.date(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { signature_id, deliveryman_id, recipient_id } = req.body;

    const signature = await File.findByPk(signature_id);

    if (!signature) {
      return res.status(400).json({ error: 'Signature not found' });
    }

    const deliveryman = await Deliveryman.findByPk(deliveryman_id);

    if (!deliveryman) {
      return res.status(400).json({ error: 'Deliverymen not found' });
    }

    const recipient = await Recipient.findByPk(recipient_id);

    if (!recipient) {
      return res.status(400).json({ error: 'Recipient not found' });
    }

    const delivery = await Delivery.create(req.body);

    return res.json(delivery);
  }

  // async update(req, res) {
  //   const schema = Yup.object().shape({
  //     name: Yup.string().required(),
  //     email: Yup.string()
  //       .email()
  //       .required(),
  //     avatar_id: Yup.number().required(),
  //   });

  //   if (!(await schema.isValid(req.body))) {
  //     return res.status(400).json({ error: 'Validation fails' });
  //   }

  //   const { avatar_id } = req.body;

  //   const avatar = await File.findByPk(avatar_id);

  //   if (!avatar) {
  //     return res.status(400).json({ error: 'Avatar not found' });
  //   }

  //   const { id } = req.params;

  //   const deliveryman = await Deliveryman.findByPk(id);

  //   if (!deliveryman) {
  //     return res.status(400).json({ error: 'Deliveryman not found' });
  //   }

  //   await deliveryman.update(req.body);

  //   const { name, email } = await Deliveryman.findByPk(id, {
  //     include: [
  //       {
  //         model: File,
  //         as: 'avatar',
  //         attributes: ['id', 'path', 'url'],
  //       },
  //     ],
  //   });

  //   return res.json({ id, name, email, avatar });
  // }

  // async delete(req, res) {
  //   const { id } = req.params;

  //   const deliveryman = await Deliveryman.findByPk(id);

  //   if (!deliveryman) {
  //     return res.status(400).json({ error: 'Deliveryman not found' });
  //   }

  //   await deliveryman.destroy();

  //   return res.json();
  // }
}

export default new DeliveryController();
