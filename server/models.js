const mongoose = require('mongoose');
const mdb = require("../database/mongoose.js");

// Connect to MongoDB
mdb();


  const smallestSchema = new mongoose.Schema({
    key: String,
    description: String,
    subDescription: String,
    quantity: Boolean,
    asterisk: String
  })

  const mediumSchema = new mongoose.Schema({
    columnName: String,
    columnGuts: [],
    columnLength: Boolean
  })

  const largeSchema = new mongoose.Schema({
    fixtureName:  String,
    fixtureSubDescription: String,
    fixtureSpec: []
  })

  const manufacturer = new mongoose.Schema({
    manufacturerName: String,
    manufacturerSubDescription: String,
    fixtures: []
  })


const ManuSchema = mongoose.model('ManuSchema', manufacturer)
const Lschema = mongoose.model('Lschema', largeSchema)
const Mschema = mongoose.model('Mschema', mediumSchema)
const Sschema = mongoose.model('Sschema', smallestSchema)


const findQuery = (input) => {
  console.log(input, 'inside model.js')
  return Lschema.find({fixtureName: input}).exec();
}

// module.exports = mongoose.model('manufacturer', manufacturer)

module.exports = {ManuSchema, Lschema, Mschema, Sschema, findQuery};