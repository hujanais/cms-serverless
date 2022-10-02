require('dotenv').config();
const ServiceClass = require('../../../services/article-service');

// GET https://vercel-serverless-hujanais.vercel.app/api/cxkm/en-gb
module.exports = async (req, res) => {
  const service = new ServiceClass();

  try {
    switch (req.method) {
      case 'GET':
        const { language } = req.query;
        res.json({ errorCode: 0, message: 'ok', data: service.getJson(language) });
        break;
      default:
        throw new Error(`${req.method} is not allowed`);
    }
  } catch (ex) {
    res.status(500).json(`catch - ${ex}`);
  }
};
