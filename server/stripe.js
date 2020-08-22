/* eslint-disable prettier/prettier */
const stripe = require('stripe');

function stripeCharge({ amount, token, buyerEmail }) {
  const dev = process.env.NODE_ENV !== 'production';
  const API_KEY = dev
    ? process.env.Stripe_Test_SecretKey
    : process.env.Stripe_Live_SecretKey;
  const client = stripe(API_KEY);

  return client.charges.create({
    amount,
    source: token,
    receipt_email: buyerEmail,
    currency: 'usd',
    description: 'Payment for the book at builderbook.org',
  });
}

exports.stripeCharge = stripeCharge;
