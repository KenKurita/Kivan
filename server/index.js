const express = require('express')
const port = process.env.port || 3000;
const bodyParser = require('body-parser');
const app = express();
const path = require("path");
const axios = require("axios");
const db = require("../database/db.js");
const { auth } = require('express-openid-connect');
const { requiresAuth } = require('express-openid-connect');
require('dotenv').config();

/// OAuth2 config ///
const config = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.secret,
  baseURL: 'http://localhost:3000',
  clientID: 'g2hfU5hukaX8dGr1uiwIfXbB7DMzMqws',
  issuerBaseURL: 'https://dev-82r1a5ky8mftngrk.us.auth0.com'
};
app.use(auth(config));

/////////////////////

app.use(express.json())
app.use(express.static(__dirname + '/../client/public'));
app.use(express.urlencoded({extended: true}));



app.get('/', (req, res) => {
  res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
  // res.send('Hello World! ')
})




/*
To display the user's profile, your application should provide a protected route.

Add the requiresAuth middleware for routes that require authentication.
Any route using this middleware will check for a valid user session and, if one does not exist, it will redirect the user to log in.
*/
app.get('/profile', requiresAuth(), (req, res) => {
  res.send(JSON.stringify(req.oidc.user));
});

//////////////database queries start////////////////


app.post('/database/manufacturer', function(req, res) {
  console.log('hello dar')
  const option = req.body.option;
const query = 'SELECT * FROM ??';
const params = [option];

db.query(query, params)
  .then(data => {
    console.log('Inside server', data);
    res.status(200).send(data);
  })
  .catch(err => {
    console.log('Error in manufacture', err);
    res.status(400).send(`Error in manufacture: ${err}`);
  });

})



/////////////database queires end////////////////

// to catch all url routes and let index.html handle once react router loads
// the reason url doesn’t work is because the url calls on the server, before react router loads
// react router cant direct if its not loaded up first
app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, '/../client/public/index.html'), function(err) {
    if (err) {
      res.status(500).send(err)
    }
  })
})

app.listen(port, () => {
  console.log(`listening on port ${port}`)
})