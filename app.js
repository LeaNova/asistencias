var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');

var auth = require('./middleware/auth')

//incluir rutas
var indexRouter = require('./routes/index');
var usuarioRouter = require('./routes/usuario');
var profesorRouter = require('./routes/profesor');
var materiaRouter = require('./routes/materia');
var horarioRouter = require('./routes/horario');
var inscripcionesRouter = require('./routes/inscripcion');
var asistenciaRouter = require('./routes/asistencia');
var presenteRouter = require('./routes/presente');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({ 
  secret: "superSECRET",
  resave: true,
  saveUninitialized: true }
));

//crear los controladores
app.use('/', indexRouter);
app.use('/usuario', usuarioRouter);
app.use('/profesor', auth.isCoordinador, profesorRouter);
app.use('/materia', materiaRouter);
//app.use('/horario', auth.isProfesor, horarioRouter);
app.use('/horario', horarioRouter);
app.use('/inscripcion', inscripcionesRouter);
app.use('/asistencia', auth.isProfesor, asistenciaRouter);
//app.use('/presente', auth.isAlumno, presenteRouter);
app.use('/presente', presenteRouter);

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

module.exports = app;
