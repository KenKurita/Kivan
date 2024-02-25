const mongoose = require('mongoose');
const {postToDatabase} = require('./models.js');
const {ManuSchema, Lschema, Mschema, Sschema, findQuery} = require('./models.js')
const mdb = require("../database/mongoose.js");

mdb();


const databasePostController = async (req, res) => {

  const addFixture = new Lschema({
    fixtureName: req.fixtureName,
    subFixtureName: req.subFixtureName,
    fixtureSpec: [] // function here?
  })

  const makeFixture = async function (input) {
    for (const column of input.partNum) {
      const addColumn = new Mschema({
        columnName: column.categoryName,
        columnGuts: [],
        columnLength: column.lengthCategory,
      });
      console.log('inside controller makeFixture Mscheama', column)
      for (const part of column.data) {
        console.log('insdie controller makeFixture Sschema', part)
        if (part) {
          const addPart = new Sschema({
            key: part.inputKey,
            description: part.inputValue,
            subDescription: '',
            quantity: part.quantity,
            asterisk: part.asterisk,
          });
          addColumn.columnGuts.push(addPart);
        }
      }
      addFixture.fixtureSpec.push(addColumn);
    }
  };

  const processFixture = async (req, res) => {
    try {
      await makeFixture(req);

      await addFixture.save();

      const uniqueId = addFixture._id;

      const foundFixture = await Lschema.findById(uniqueId);
      if (foundFixture) {
        return res.status(202).send('Successfully posted to database');
      } else {
        return res.status(404).send('Document not found. It may not have been posted.');
      }
    } catch (error) {
      console.error('Error saving addFixture:', error);
      res.status(500).send('Error saving addFixture');
    }
  };


  // Call the async function to process the fixture
  processFixture(req, res);
}

const getPrice = async(req, res) => {
  console.log(req, 'getPrice controller.js file log')
  try {
    const getPriceFromDB = await ManuSchema.find(req.)
    return res.status(202).send(getPriceFromDB)
  } catch (error){
    console.error('Error getting price in controller', error);
    res.status(500).send('Error getting price from controller file')
  }
}


module.exports = {
  databasePostController,
  findQuery,
  getPrice
}