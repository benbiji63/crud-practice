const bodyParser = require('body-parser');
const express = require('express');
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.listen(3000, function () {
  console.log('Listening to 3000');
});
app.get('/', (req, res) => {
  // res.send('Hello World')
  res.sendFile(__dirname + '/index.html');
});
app.post('/quotes', (req, res) => {
  console.log(req.body);
});
