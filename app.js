const KEY = 'nome-do-cookie';
const SECRET = 'chave-secreta-aqui!';

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
/*session*/
var cookieParser = require('cookie-parser');
var session = require('express-session');
var cookie = cookieParser(SECRET)
/*session*/
var bodyParser = require('body-parser');
var routes = require('./routes/index');
var users = require('./routes/users');
var solicitud = require('./routes/solicitud');
var app = express();
var cookieSecret = "secret phrase";

var store = new session.MemoryStore()
app.set("store",store)
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.set("cookie", cookie);


// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(cookie);
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: SECRET, 
  name: KEY, 
  resave: true, 
  saveUninitialized: true,
  store: store
}));

app.use('/', routes);
app.use('/users', users);
app.use('/solicitud', solicitud);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
