const express = require('express');
const morgan = require('morgan');
const session = require('express-session');
const errorhandler = require('errorhandler')
const notifier = require('node-notifier');
const app = express();

// Resources routers 
const usersRouter = require('./api/users');

app.use(express.json());
app.use(morgan('combined'));
// Use the session middleware
app.use(session({ 
            secret: 'keyboard cat', 
            cookie: { maxAge: 60000 }, 
            resave: true, 
            saveUninitialized: true}))
 
// Access the session as req.session
app.get('/', function(req, res, next) {
  if (req.session.views) {
    req.session.views++
    res.setHeader('Content-Type', 'text/html')
    res.write('<p>views: ' + req.session.views + '</p>')
    res.write('<p>expires in: ' + (req.session.cookie.maxAge / 1000) + 's</p>')
    res.end()
  } else {
    req.session.views = 1
    res.end('welcome to the session demo. refresh!')
  }
})
app.use('/api/users', usersRouter);

app.use(errorhandler({log: errorNotification}));
app.listen(5000);
function errorNotification (err, str, req) {
  var title = 'Error in ' + req.method + ' ' + req.url

  notifier.notify({
    title: title,
    message: str
  })
}