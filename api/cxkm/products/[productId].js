require('dotenv').config();
const ServiceClass = require('../../../services/product-service');

// GET https://vercel-serverless-hujanais.vercel.app/api/cxkm/products/5
module.exports = async (req, res) => {
  const service = new ServiceClass();
  let article;
  let document;

  try {
    const { productId } = req.query;
    switch (req.method) {
      case 'GET':
        let response = await service.get(productId);
        res.json(response[0]);
        break;
      case 'PUT':
        article = req.body;
        document = await service.update(productId, article);
        res.json(document);
        break;
      case 'DELETE':
        document = await service.delete(productId);
        res.json(document);
        break;
      default:
        throw new Error(`${req.method} is not allowed`);
        c;
    }
  } catch (ex) {
    res.status(500).json(`catch - ${ex}`);
  }
};
