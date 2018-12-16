const express = require('express');
const { MongoClient } = require('mongodb');
const debug = require('debug')('app:adminRoutes');

const adminRouter = express.Router();
const books = [
  {
    title: 'Les Misérables',
    genre: 'Historical Fiction',
    author: 'Victor Hugo',
    read: false
  },
  {
    title: 'The Wind in the Willows',
    genre: 'Fantasy',
    author: 'Kenneth Grahame',
    read: false
  },
  {
    title: 'Childhood',
    genre: 'Biography',
    author: 'Lev Nikolayevich',
    read: false
  }
];

function router(nav) {
  adminRouter.route('/')
    .get((req, res) => {
      const url = 'mongodb://127.0.0.1:27017';
      const dbName = 'libraryApp';

      (async function mongo() {
        let client; //= new MongoClient(url);

        try {
          client = await MongoClient.connect(url, { useNewUrlParser: true });
          // await client.connect();
          debug('Connected correctly to the server');

          const db = client.db(dbName);

          const response = await db.collection('books').insertMany(books);
          res.json(response);
          client.close();
        } catch (err) {
          debug(err.stack);
        }
      }());
    });

  return adminRouter;
}

module.exports = router;
