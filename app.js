const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan')
const session = require('express-session');
const bodyParser = require('body-parser');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: 'myOwnSecret',
  resave: true,
  saveUninitialized: true
}));
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());


console.log('Arrancando app...');

/*
* Enrutamiento
 */
const indexRouter = require('./routes/index');
const loginRouter = require('./routes/login');
const detailRouter = require('./routes/detail');
const newRouter = require('./routes/new');
const deleteRouter = require('./routes/delete');

app.use('/', loginRouter);
app.use('/index', indexRouter);
app.use('/detail', detailRouter);
app.use('/new', newRouter);
app.use('/delete', deleteRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});




app.listen(3000, function() {
  console.log('Aplicación ejemplo, escuchando el puerto mierda pinchada en un palo!');
});

module.exports = app;


