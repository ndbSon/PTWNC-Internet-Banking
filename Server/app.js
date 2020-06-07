const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
require('express-async-errors');

const app = express();

const verify = require('./middlewares/auth.mdw');

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

app.use('/user', require('./routes/user.route'));
app.use('/customer',verify, require('./routes/customer.route'));
app.use('/employee',verify, require('./routes/employee.route'));
app.use('/banks', require('./routes/banks.route'));
app.use('/admin', require('./routes/admin.route'));
// app.use('/api/products', require('./routes/product.route'));

app.use((req, res, next) => {
  res.status(404).json({succes:false});
})
app.use(function (err, req, res, next) {
  console.log(err.stack);
  // console.log(err.status);
  const statusCode = err.status || 500;
  res.status(statusCode).send({succes:false});
})

const PORT = 3000;
app.listen(process.env.PORT|| PORT, _ => {
  console.log(`API is running at http://localhost:${PORT}`);
})