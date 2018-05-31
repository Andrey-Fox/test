const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));
// app.use((req, res, next) => {
//   res.render('maintenance.hbs');
// });
hbs.registerPartials(__dirname + '/views/partials')

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear()
});

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});

app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;
  console.log(log);
  fs.appendFile('server.log', log + '\n', (err)=>{});
  next();
});



app.get('/', (req, res) => {
  res.render('home.hbs', {
    pageTitle: 'Home Page',
   welcomeMessage: 'Welcome to my website'
  });
});

// app.get('/', (req, res) => {
//   res.send({
//     name: 'Jack',
//     likes: [
//       'Girls',
//       'RPG'
//     ]
//   });
// });

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About Page',
    welcomeMessage: 'This it`s good website'
  });
});

app.get('/bad', (req, res) => {
  res.send({
    errorMessage: 'Unable to handle request'
  });
});

app.listen(3000);
