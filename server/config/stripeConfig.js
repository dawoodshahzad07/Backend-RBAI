const Stripe = require('stripe');
const { STRIPE_SECRET_KEY } = process.env;

if (!STRIPE_SECRET_KEY) {
  throw new Error('STRIPE_SECRET_KEY is not defined in environment variables');
}

const stripe = new Stripe(STRIPE_SECRET_KEY, {
  apiVersion: '2023-08-16'
});

module.exports = stripe;
