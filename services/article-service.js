const path = require('path');
const { readFileSync, readdirSync } = require('fs');

module.exports = class ArticleService {
  // Get all the files under a certain language and merge the json objects into a single composite object.
  getJson(language) {
    const jsonArr = [];
    const files = readdirSync(path.join(__dirname, '../_files', language), { withFileTypes: true });
    files.forEach((file) => {
      const jsonStr = readFileSync(path.join(__dirname, '../_files', language, file.name), 'utf8');
      jsonArr.push(JSON.parse(jsonStr));
    });

    // Merge all json objects into a single one.
    return [...jsonArr];
  }
};
