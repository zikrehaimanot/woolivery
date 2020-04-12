// load the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema
// define the schema for our user model
var ResturantSchema = new Schema({

    resturantName : {
      type : String,
      required : true,
    },
    phoneNumber: {
      type : Number,
      required : true,
    },
    street       : {
      type : String,
      required: true,
    },
    city  : {
      type: String,
      required: true,
    },
    state : {
      type: String,
      required : true,
    },
    zipcode : {
      type : String,
      required : true,
    },
    ein : {
      type: String,
      required: true,
    },
    payPal : {
      type: String,
      required : true,
    },
    menu : {
      type: [String],
      required : true,
    },
    prices : {
      type: [Number],
      required : true,
    },
    createdBy : {
      type : Schema.Types.ObjectId,
      required : true,
    }
});
const Resturants = mongoose.model('Resturant',ResturantSchema )
// create the model for users and expose it to our app
module.exports = Resturants;
