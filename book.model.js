const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Book = new Schema({
  book_ISBN: {
    type: String,
  },
  book_title: {
    type: String,
  },
  book_author: {
    type: String,
  },
  book_price: {
    type: Number,
  },
  book_selleremail: {
    type: String,
  },
  book_used: {
    type: Boolean,
  },
  book_location: {
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
