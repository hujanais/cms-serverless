const mongoose = require('mongoose');
const collectionName = process.env.ARTICLES_COLLECTION_NAME;

const stSchema = new mongoose.Schema({
    articleId: { type: String },
    body: { type: String },
});

module.exports = mongoose.model(collectionName, stSchema, collectionName);
