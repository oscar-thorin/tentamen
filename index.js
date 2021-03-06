const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const mongoose = require("mongoose");
const bookRoutes = express.Router();
const PORT = 4000;

let Book = require("./book.model");

app.use(cors());
app.use(bodyParser.json());

mongoose.connect("mongodb://127.0.0.1:27017/books", {
  useNewUrlParser: true,
});
const connection = mongoose.connection;

connection.once("open", function () {
  console.log("MongoDB database connection established successfully");
});

bookRoutes.route("/").get(function (req, res) {
  var _author = req.query.author;
  if (_author) {
    Book.find({ author: _author }, function (err, book) {
      res.json(book);
    });
  } else {
    Book.find(function (err, books) {
      if (err) {
        console.log(err);
      } else {
        res.json(books);
      }
    });
  }
});

bookRoutes.route("/:id").get(function (req, res) {
  let id = req.params.id;
  Book.findById(id, function (err, book) {
    res.json(book);
  });
});

bookRoutes.route("/:id").put(function (req, res) {
  Book.findById(req.params.id, function (err, book) {
    if (!book) res.status(404).send("data is not found");
    else {
      book.isbn = req.body.isbn;
      book.title = req.body.title;
      book.author = req.body.author;
      book.price = req.body.price;
      book.selleremail = req.body.selleremail;
      book.used = req.body.used;
      book.location.city = req.body.location.city;
      book.location.street = req.body.location.street;

      book
        .save()
        .then((book) => {
          res.json(book);
        })
        .catch((err) => {
          res.status(400).send("Update not possible");
        });
    }
  });
});

bookRoutes.route("/").post(function (req, res) {
  let book = new Book(req.body);
  console.log(req.body);
  book
    .save()
    .then((book) => {
      res.status(201).json(book);
    })
    .catch((err) => {
      res.status(400).send("adding new book failed");
    });
});

bookRoutes.route("/:id").delete((req, res) => {
  Book.findByIdAndDelete(req.params.id)
    .then(() => res.json("Book deleted."))
    .catch((err) => res.status(400).json("Error: " + err));
});

/* 
  Swagger
*/

// show swagger ui on /swagger and spec on /swagger.yaml
var options = {
  explorer: true,
  editor: true,
  swaggerOptions: {
    urls: [
      {
        url: "/swagger.yaml",
        name: "Spec1",
      },
    ],
  },
};

app.use("/", express.static(__dirname + "/swagger"));
app.use("/swagger", swaggerUi.serve, swaggerUi.setup(null, options));

app.use("/books", bookRoutes);

app.listen(PORT, function () {
  console.log("Server is running on Port: " + PORT);
});
