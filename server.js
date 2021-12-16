const express = require('express');
const env = require('dotenv').config()
const ejs = require('ejs');
const path = require('path');
const app = express();
const mongoose = require('mongoose');
const session = require('express-session');
const bodyParser = require('body-parser');
const MongoDBSession = require('connect-mongodb-session')(session);
const cookieParse = require('cookie-parser');
const swaggerUI = require('swagger-ui-express');
const swaggerJsDoc = require("swagger-jsdoc");
require('dotenv').config();

const options = {
  definition: {
      openapi: "3.0.0",
      info: {
          title: "Math-Game",
          version: "1.0.0",
          description: "A simple math game built with nodejs and html/css/js"
      },
      servers: [{
          url: "http://localhost:5000"
      }]
  },
  apis: ["./route/*.js","./module/*.js","./controller/*.js"]
}
const specs = swaggerJsDoc(options);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(specs));
//connecting with database

mongoose.connect(process.env.CONNECT  , {
  useNewUrlParser: true,
  useUnifiedTopology: true
}, (err) => {
  if (!err) {
    console.log('MongoDB Connection Succeeded.');
  } else {
    console.log('Error in DB connection : ' + err);
  }
});

//implementing session
app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: false,
  store: new MongoDBSession({
    uri: process.env.CONNECT
  })
}));

//setting up ejs to generate html
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');	

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(__dirname + '/views'));

const index = require('./route/userRoute');
const { MongoDBStore } = require('connect-mongodb-session');
app.use('/', index);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('File Not Found');
  err.status = 404;
  next(err);
});

// error handler
// define as the last app.use callback
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.send(err.message);
});

//server side

const PORT = process.env.PORT || 5000;
app.listen(PORT, function () {
  console.log('Server is running on port '+PORT);
});
