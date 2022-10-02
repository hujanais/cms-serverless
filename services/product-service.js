const mongoose = require('mongoose');
const ProductData = require('../models/product');

module.exports = class ArticleService {
  /**
   *
   * @param {string} productId productId
   */
  async get(productId) {
    await mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true });
    const filter = { _id: mongoose.Types.ObjectId(productId) };

    const documents = await ProductData.find(filter, null, null);

    await mongoose.disconnect();

    return documents;
  }

  async getAll() {
    await mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true });

    const filter = {};
    const documents = await ProductData.find(filter);

    await mongoose.disconnect();

    return documents;
  }

  // article {productId, body}
  async create(article) {
    await mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true });

    const documents = await ProductData.create(article);

    await mongoose.disconnect();

    return documents;
  }

  /**
     * const res = await Character.deleteOne({ name: 'Eddard Stark' });
        `1` if MongoDB deleted a doc, `0` if no docs matched the filter `{ name: ... }`
        res.deletedCount;
     * @param {*} productId
     * @returns document that was deleted.  null if failed.
     */
  async delete(productId) {
    await mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true });

    const document = await ProductData.findOneAndRemove({ _id: mongoose.Types.ObjectId(productId) });

    await mongoose.disconnect();

    return document;
  }

  /**
   * Update existing doc.
   * @param {*} article
   * @returns updated document
   */
  async update(productId, article) {
    await mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true });

    const filter = { _id: mongoose.Types.ObjectId(productId) };
    const update = article;
    const options = { new: true }; // this is required to return the modified document.

    const document = await ProductData.findOneAndUpdate(filter, update, options);

    await mongoose.disconnect();

    return document;
  }
};
