require('dotenv').config();
const ServiceClass = require('../../../services/article-service');

// GET https://vercel-serverless-hujanais.vercel.app/api/cxkm/articles/5
module.exports = async (req, res) => {
    const service = new ServiceClass();
    let articleId;
    let article;
    let document;

    try {
        switch (req.method) {
            case 'GET':
                const { articleId } = req.query;
                let response = await service.get(articleId);
                res.json(response[0]);
                break;
            case 'POST':
                article = req.body;
                document = await service.create(article)
                res.json(document);
                break;
            case 'PUT':
                article = req.body;
                document = await service.update(article);
                res.json(document);
                break;
            case 'DELETE':
                articleId = req.query['articleId'];
                document = await service.delete(articleId);
                res.json(document);
                break;
            default:
                throw new Error(`${req.method} is not allowed`);
        }
    } catch (ex) {
        res.status(500).json(`catch - ${ex}`);
    }
}