const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
require('express-async-errors');

const app = express();

const verify = require('./middlewares/auth.mdw');

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

app.use('/user',require('./routes/user.route'));
app.use('/customer',verify.customer, require('./routes/customer.route'));
app.use('/employee',verify.employee, require('./routes/employee.route'));
app.use('/mybanks',verify.customer, require('./routes/mybanks.route'));
app.use('/banks', require('./routes/otherbanks.route'));
app.use('/admin',verify.admin, require('./routes/admin.route'));

app.use((req, res, next) => {
  res.status(404).json({err:false});
})
app.use(function (err, req, res, next) {
  console.log(err);

  const statusCode = err.status || 500;
  res.status(statusCode).json({err:err.message});
})

const PORT = 3000;
app.listen(process.env.PORT|| PORT, _ => {
  console.log(`API is running at http://localhost:${PORT}`);
})