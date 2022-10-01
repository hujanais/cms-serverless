const mongoose = require('mongoose');
const collectionName = process.env.COLLECTION_NAME;

const stSchema = new mongoose.Schema({
  discontinued: { type: Boolean },
  family: { type: String },
  gpio: { type: String },
  memory: { type: String },
  model: { type: String },
  released: { type: String },
  soc: { type: String },
  wireless: { type: Boolean },
});

module.exports = mongoose.model(collectionName, stSchema, collectionName);
