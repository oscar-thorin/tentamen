get = (req, res, next) => {
  req.models.Book.find().then((books) => {
      return res.send(books);
    }).catch((error) => next(error))
}

module.exports = {
  get,
}