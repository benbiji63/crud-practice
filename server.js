const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const MongoClient = require('mongodb').MongoClient;
const connectionString =
  'mongodb+srv://infinity:246Ilok)&@cluster0.6a430ku.mongodb.net/?retryWrites=true&w=majority';
MongoClient.connect(connectionString, { useUnifiedTopology: true })
  .then( client => {
    console.log('connected to db');
    const db = client.db('star-wars-quotes');
    const quotesCollection = db.collection('quotes');
    app.use(bodyParser.urlencoded({ extended: true }));
    app.listen(3000, function () {
      console.log('Listening to 3000');""
    });
    app.get('/', (req, res) => {
      // res.send('Hello World')
      res.sendFile(__dirname + '/index.html');
    });
    app.post('/quotes', (req, res) => {
      console.log(req.body);
    });""
  })
  .catch(err => console.error(err));
