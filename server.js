const nodemailer = require('nodemailer');
const restify = require('restify');
const errors = require('restify-errors');
// const bodyParser = require('body-parser');
const config = require('./config');
const smtpTransport = nodemailer.createTransport({
  service: config.service,
  auth: {
    username: config.username,
    pass: config.pass
  }
});

const server = restify.createServer();
server.use(restify.plugins.bodyParser({mapParams: true}));
server.use(
  function crossOrgin(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With');
    return next();
  }
);

/**
* API endpoint for sending emails
*
* @param {string} receipt The email address of the recepient
* @param {string} subject The subject title of the email to send
* @param {string} message The email message
*/

server.post('/email', function create(req, res, next) {
  if(!req.params.receipt === undefined ||
    req.params.subject === undefined ||
    req.params.message === undefined) {
    return next(new errors.InvalidArgumentError('receipt, subject, message are required parameters!'));
    }
smtpTransport.sendMail({
  from: config.sendAddr,
  to: req.params.receipt,
  subject: req.params.subject,
  html: req.params.message
}, (error, response) => {
  if(error) {
    console.log(`Error: ${error}`);
  } else {
    console.log(`Message send ${response.message}`);
  }
  });
  res.send(201, req.params);
});
const PORT = 8080 || process.env.PORT;
server.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
