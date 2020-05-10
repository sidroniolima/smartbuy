import * as Yup from 'yup';
import fs from 'fs';
import crypto from 'crypto';
import ProductImage from '../models/ProductImage';

class ProductImageController {
  async store(req, res) {
    const schema = Yup.object().shape({
      productId: Yup.number().required(),
      images: Yup.array()
        .min(1)
        .required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { productId } = req.body;
    const { images } = req.body;

    const createdFiles = images.map(async image => {
      try {
        const imageName = crypto
          .randomBytes(20)
          .toString('hex')
          .concat('.jpg');

        const base64Image = image.split(';base64,').pop();
        const buffer = Buffer.from(base64Image, 'base64');

        fs.writeFile(
          `tmp/uploads/${imageName}`,
          buffer,
          { enconding: 'base64' },
          err => {
            console.log(err);
          }
        );

        return await ProductImage.create({
          name: imageName,
          path: imageName,
          productId,
        });
      } catch (err) {
        console.log(err);
        return null;
      }
    });

    const createdImages = await Promise.all(createdFiles);

    return res.json(createdImages);
  }
}

export default new ProductImageController();
