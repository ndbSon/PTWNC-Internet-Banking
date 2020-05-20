const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
require('express-async-errors');

const app = express();

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({
    msg: 'hello from nodejs express api'
  });
})

app.use('/api/user', require('./routes/user.route'));
// app.use('/api/products', require('./routes/product.route'));

app.use((req, res, next) => {
  res.status(404).send('NOT FOUND');
})

app.use(function (err, req, res, next) {
  console.log(err.stack);
  res.status(500).send('View error log on console.');
})

const PORT = 3000;
app.listen(PORT, _ => {
  console.log(`API is running at http://localhost:${PORT}`);
})