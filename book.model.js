const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Book = new Schema({
  ISBN: {
    type: String,
  },
  title: {
    type: String,
  },
  author: {
    type: String,
  },
  price: {
    type: Number,
  },
  selleremail: {
    type: String,
  },
  used: {
    type: Boolean,
  },
  location: {
    city: {
      type: String,
    },
    street: {
      type: String,
    },
  },
});

module.exports = mongoose.model("Book", Book);

/* 
isbn
title
author
price
selleremail
used
location, city - street
*/
