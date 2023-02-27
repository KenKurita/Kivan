const express = require('express')
const port = process.env.port || 3000;
const bodyParser = require('body-parser');
const app = express();

app.use(express.static(__dirname + '/../client/public'));
app.use(express.urlencoded({extended: true}));

app.get('/', (req, res) => {
  res.send('Hello World! ')
})

app.listen(port, () => {
  console.log(`listening on port ${port}`)
})