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
app.use(express.urlencoded({ extended: true }));



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

// app.get('/database', function(req, res) {
//   //test
//   console.log('inside server', req.data)
//   let fixtureData = {
//     name: null
//   }
//   db.query('select * from companyName', (err, result) => {
//     if (err) {
//       res.status(400).send(console.log(err))
//     }
//     console.log(result, 'inside db')
//   })
//   res.status(202).send('success')
// })

app.get('/database/getCategoryList', function (req, res) {
  //test
  console.log('inside server get Category')
  db.query('select * from categoryList', function (err, result) {
    if (err) {
      res.status(400).send(console.log(err))
    }
    res.status(200).send(result);
  })
})

// on load - create product gets list of all manufacturers
app.get('/database/CreateProduct/get/manufacturer', function (req, res) {
  db.query('show tables', (err, result) => {
    if (err) {
      res.status(400).send(console.log(err))
    } else {
      res.status(200).send(result);
    }
  })
})

// add button for manufacturer from Create Product
app.post('/database/manufacturer', function (req, res) {
  console.log('hello dar')
  db.query(`SELECT * FROM ${req.body.option}`, function (err, data) {
    if (err) {
      // if err then no table. Create table.
      let manufacturerName = req.body.option.toLowerCase()
      db.query(`CREATE TABLE ${manufacturerName} (id INT PRIMARY KEY);`, function (err, data) {
        if (err) {
          console.log(err, 'error inside create table for post manufacturer')
        } else {
          console.log('successfully posted to database')
        }
      })
      res.send(201)
    } else {
      // send an error back if table already exists
      console.log(data, 'kenny')
      res.send(404)
    }
  })
})

//submit buttom from Create Product
app.post('/database/CreateProduct/Submit', async (req, res) => {
  // console.log('we going', req.body.partNum);
  /*
  req.body data structure is as such:
  { partNum: [{categoryName: 'xxx', lengthCategory: boolean, data: [...]},{},{},...], manufacturer: 'xxx'}
  */

  const createCategoryTablePromises = req.body.partNum.map(async (category) => {
    const constraintName = `foreign_key_cat_${category.categoryName}`;
    if (category.lengthCategory === true) {
      try {
        await db.query(`CREATE TABLE ${category.categoryName} (id INT PRIMARY KEY , lengthCategory BOOLEAN,
          CONSTRAINT ${constraintName}
          FOREIGN KEY (id)
          REFERENCES ${req.body.manufacturer}(id));`);

        await db.query(`INSERT INTO ${category.categoryName}(lengthCategory) VALUES (true);`);
      } catch (error) {
        console.log('Error inside createTableForCategoryData function:', error);
      }
    }
  });

  try {
    await Promise.all(createCategoryTablePromises);
  } catch (error) {
    console.error('Error in creating part categories:', error);
  }


  const createTableForCategoryData = await Promise.all(req.body.partNum.map(async (category) => {
    for (let categoryData in category.data[1]) {
      const constraintName = `foreign_key_cat_${categoryData.key}`;
      try {

        await db.query(`CREATE TABLE ${category.data[1].key} (
            id INT PRIMARY KEY AUTO_INCREMENT,
            table_key VARCHAR(25),
            table_value VARCHAR(50),
            price INT,
            perFt BOOLEAN,
            quantity INT,
            CONSTRAINT ${constraintName} FOREIGN KEY (id) REFERENCES ${category.categoryName}(${category.data[1].key})
          );`);

        await db.query(`INSERT INTO ${category.data[1].key} (table_key, table_value, price, pricingPerFt, quantity) VALUES
            ('${category.data[1].key}', '${category.data[1].value}', ${category.data[1].price}, ${category.data[1].perFt}, ${category.data[1].quantity})`);
        // await console.log('successfully posted to database')
      } catch (error) {
        console.log('Error inside createTableForCategoryData function:', error);
      }
    }
  }))
});


app.post('/database/post', function (req, res) {

  // console.log('inside server add Category', req.body)
  console.log(db.query('select * from categoryList'))
  for (var i = 0; i < req.body.length; i++) {
    if (db.query(`select * from ${req.body[i]}`)) {

    } else {
      db.query(`create table `)
    }
  }

})

/////////////database queires end////////////////

// to catch all url routes and let index.html handle once react router loads
// the reason url doesn’t work is because the url calls on the server, before react router loads
// react router cant direct if its not loaded up first
app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, '/../client/public/index.html'), function (err) {
    if (err) {
      res.status(500).send(err)
    }
  })
})

app.listen(port, () => {
  console.log(`listening on port ${port}`)
})