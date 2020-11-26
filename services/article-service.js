const mongoose = require('mongoose');
const ArticleData = require('../models/article');
const path = require('path');

const { readFileSync, readdirSync } = require('fs')

module.exports = class ArticleService {

    /**
     * 
     * @param {string} articleId articleId
     */
    async get(articleId) {
        await mongoose.connect(process.env.WATERS_MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true });

        const filter = { articleId };
        const documents = await ArticleData.find(filter, null, null);

        await mongoose.disconnect();

        return documents;
    }

    // article {articleId, body}
    async create(article) {
        await mongoose.connect(process.env.WATERS_MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true });

        const documents = await ArticleData.create(article);

        await mongoose.disconnect();

        return documents;
    }

    /**
     * const res = await Character.deleteOne({ name: 'Eddard Stark' });
        `1` if MongoDB deleted a doc, `0` if no docs matched the filter `{ name: ... }`
        res.deletedCount;
     * @param {*} articleId
     * @returns document that was deleted.  null if failed.
     */
    async delete(articleId) {
        await mongoose.connect(process.env.WATERS_MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true });

        const document = await ArticleData.findOneAndRemove({ articleId: articleId })

        await mongoose.disconnect();

        return document;
    }

    /**
     * Update existing doc.
     * @param {*} article 
     * @returns updated document
     */
    async update(article) {
        await mongoose.connect(process.env.WATERS_MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true });

        const condition = { articleId: article.articleId };
        const update = article;
        const options = { new: true }; // this is required to return the modified document.

        const document = await ArticleData.findOneAndUpdate(condition, update, options);

        await mongoose.disconnect();

        return document;
    }

    // Get all the files under a certain language and merge the json objects into a single composite object.
    getJson(language) {
        const jsonArr = [];
        const files = readdirSync(path.join(__dirname, '../_files', language), { withFileTypes: true });
        files.forEach((file) => {
            const jsonStr = readFileSync(path.join(__dirname, '../_files', language, file.name), 'utf8');
            jsonArr.push(JSON.parse(jsonStr));
        });

        // Merge all json objects into a single one.
        return Object.assign({}, ...jsonArr);
    }
}