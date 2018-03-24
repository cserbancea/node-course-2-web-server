const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;

var app = express();

hbs.registerPartials(__dirname + '/views/partials');

app.set('view engine', 'hbs');
// middleware
app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;
  console.log(log);
  fs.appendFile('server.log', log + '\n', (err) => {
    if (err) {
      console.log('Unable to append to server.log');
    }
  });
  next();
});

app.use((req, res, next) => {
  res.render('maintenance');
  next();
});

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});

app.get('/', (req, res) => {
  // res.send('Hello Express!');
  // res.send({
  //   name: 'cristi',
  //   likes: [
  //     'programming',
  //     'blablabla'
  //   ]
  // });

  res.render('home.hbs', {
    welcomeMessage: 'Welcome to my dummy website',
    pageTitle: 'Home Page'
  });
});

app.get('/about', (req, res) => {
  // res.send('About page');
  res.render('about.hbs', {
    pageTitle: 'About Page'
  });
});

app.get('/bad', (reg, res) => {
  res.send({
    errorMessga: 'Something went wrong.'
  });
});

app.get('/trend', (req, res) => {
  res.send('Bla Bla Bla');
});

app.listen(port, () => {
  console.log(`server is up on port ${port}`);
});