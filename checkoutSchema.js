const mongoose = require('mongoose');

const checkoutSchema = new mongoose.Schema({
  custName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  streetAddress: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  zip: {
    type: String,
    required: true
  },
  state: { // Change country to state
    type: String,
    required: true
  },
  mobile: {
    type: String,
    required: true
  },
  cardHolderName: {
    type: String,
    required: true
  },
  cardnumber: {
    type: String,
    required: true
  }
});

const Checkout = mongoose.model('Checkout', checkoutSchema);

module.exports = Checkout;
