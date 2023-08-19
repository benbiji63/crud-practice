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
    app.use(express.static('public'));
    app.use(bodyParser.json());
    
    app.listen(3000, function () {});
    app.put('/quotes', (req, res) => {
      console.log(req.body);
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
  })
  .catch(err => console.error(err));
