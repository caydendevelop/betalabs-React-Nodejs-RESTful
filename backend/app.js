const express = require('express');
const bodyParser = require('body-parser');
const HttpError = require('./commons/http-error');
const campaignRoute = require('./routes/campaign-route')


const app = express();

app.use(bodyParser.json()); // tell the system we want the request be parsed to be json 

var cors = require('cors')
app.use(cors())

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST');

  next();
});

app.use('/', campaignRoute);

app.use((req, res, next) => { // error handler for unsupported route
  const error = new HttpError('Could not find this route.', 404);
  throw error;
});

app.use((error, req, res, next) => { // 4 parameters = default error handler middleware
  if (res.headerSent) { // if response is sent, since response could only be sent once in total, 
    return next(error); //  forward the error to the next middleware to handle it 
  }
  res.status(error.code || 500); // else, sent the error response 
  res.json({message: error.message || 'An unknown error occurred!'})

});

app.listen(5000);

