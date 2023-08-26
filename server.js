const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const MongoClient = require('mongodb').MongoClient;
const connectionString =
  'mongodb+srv://infinity:246Ilok)&@cluster0.6a430ku.mongodb.net/?retryWrites=true&w=majority';
MongoClient.connect(connectionString, { useUnifiedTopology: true })
  .then(client => {
    const db = client.db('star-wars-quotes');
    const quotesCollection = db.collection('quotes');

    app.set('view engine', 'ejs');
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    app.use(express.static('public'));
    app.use(bodyParser.json());

    app.listen(3000, function () {});
    app.put('/quotes', (req, res) => {
      console.log(req.body, 20);
      quotesCollection
        .findOneAndUpdate(
          { name: 'Yoda' },
          {
            $set: {
              name: req.body.name,
              quote: req.body.quote,
            },
          },
          {
            upsert: true,
          }
        )
        .then(result => {
          res.json('Success`');
        })
        .catch(err => console.log(err));
    });
    app.get('/', (req, res) => {
      // const cursor = db.collection('quotes').find();
      // console.log(cursor);
      db.collection('quotes')
        .find()
        .toArray()
        .then(results => res.render('index.ejs', { quotes: results }))
        .catch(error => console.error(error));
    });
    // app.get('/', (req, res) => {
    //   // res.send('Hello World')
    //   res.sendFile(__dirname + '/index.html');
    // });
    app.post('/quotes', (req, res) => {
      quotesCollection
        .insertOne(req.body)
        .then(result => res.reDirect('/'))
        .catch(err => console.log(err));
    });
    app.delete('/quotes', (req, res) => {
      quotesCollection
        .deleteOne({ name: req.body.name })
        .then(result => {
          if(result.deletedCount ===0) return res.json('No quote to delete ')
          res.json("Deleted Darth Vader's quotes");
        })
        .catch(err => console.log(err));
    });
  })
  .catch(err => console.error(err));
