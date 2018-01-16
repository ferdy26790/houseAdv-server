const express = require('express');
const cors = require('cors')
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
//const path = require('path')
const logger = require('morgan')
//const user = require('./routes/users');
const register = require('./routes/register')
const login = require('./routes/login')
const app = express();
const user = require('./routes/users')




app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(logger('dev'))

//app.use(express.static(path.join(__dirname, 'public')));

//app.use('/api/user', user);
app.use('/api/register', register)
app.use('/api/login', login)
app.use('/api/users', user)

app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);

});

module.exports = app;
