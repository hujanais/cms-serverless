require('dotenv').config();
const ServiceClass = require('../../services/product-service');

// GET https://vercel-serverless-hujanais.vercel.app/api/cxkm/products/5
module.exports = async (req, res) => {
  const service = new ServiceClass();

  try {
    switch (req.method) {
      case 'GET':
        let response = await service.getAll();
        res.json(response);
        break;
      case 'POST':
        let body = req.body;
        document = await service.create(body);
        res.json(document);
        break;
      default:
        throw new Error(`${req.method} is not allowed`);
    }
  } catch (ex) {
    res.status(500).json(`catch - ${ex}`);
  }
};
