const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const urlSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    long_url: {
      type: String,
      required: true,
    },
    short_url: {
      type: String,
      required: true,
    },
    user_id: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Url', urlSchema)
