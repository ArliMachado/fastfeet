import Mail from '../../lib/Mail';

class DeliveryMail {
  get key() {
    return 'DeliveryMail';
  }

  async handle({ data }) {
    const {
      deliveryman,
      product,
      recipient: {
        name,
        street,
        number,
        complements,
        state,
        city,
        postal_code,
      },
    } = data;

    Mail.sendMail({
      to: `${deliveryman.name} <${deliveryman.email}>`,
      subject: 'Nova encomenda',
      template: 'delivery',
      context: {
        deliveryman: deliveryman.name,
        recipient: name,
        street,
        number,
        complements,
        state,
        city,
        postal_code,
        product,
      },
    });
  }
}

export default new DeliveryMail();
