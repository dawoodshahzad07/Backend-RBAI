const Billing = require('../models/billingModel');
const stripe = require('../config/stripeConfig');
const logger = require('../config/logger');

// Add new plan constants
const PLANS = {
  BUSINESS: {
    price: 80,
    minutes: 400,
    agents: 1,
    contacts: 10000,
    features: ['24/7 support']
  },
  AGENCY: {
    price: 228,
    minutes: 1200,
    agents: 10,
    contacts: 'unlimited',
    features: ['24/7 support', '10 sub-accounts', 'live transfer', 'CRM sync']
  },
  AGENCY_PRO: {
    price: 400,
    minutes: 2500,
    agents: 'unlimited',
    contacts: 'unlimited',
    features: ['24/7 priority support', 'unlimited sub-accounts', 'inner circle access']
  },
  AGENCY_VIP: {
    price: 840,
    minutes: 6000,
    agents: 'unlimited',
    contacts: 'unlimited',
    features: ['whitelabel', 'web agents', 'custom widget', 'VIP support', 'setup training']
  }
};

// Create or Update Billing
exports.createOrUpdateBilling = async (req, res) => {
  try {
    const { userId, plan } = req.body;
    
    if (!PLANS[plan]) {
      return res.status(400).json({ message: "Invalid plan" });
    }

    const selectedPlan = PLANS[plan];
    const nextBillingDate = new Date();
    nextBillingDate.setMonth(nextBillingDate.getMonth() + 1);

    const billingData = await Billing.findOneAndUpdate(
      { userId },
      { 
        plan,
        minutes: selectedPlan.minutes,
        extraMinutes: 0,
        nextBillingDate,
        features: selectedPlan.features
      },
      { new: true, upsert: true }
    );

    res.status(200).json({ message: "Billing details updated", billingData });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get Billing Data
exports.getBillingData = async (req, res) => {
  try {
    const billingData = await Billing.findOne({ userId: req.params.userId });
    if (!billingData) {
      return res.status(404).json({ message: "Billing data not found" });
    }
    res.status(200).json(billingData);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete Billing Data
exports.deleteBillingData = async (req, res) => {
  try {
    const billingData = await Billing.findOneAndDelete({ userId: req.params.userId });
    if (!billingData) {
      return res.status(404).json({ message: "Billing data not found" });
    }
    res.status(200).json({ message: "Billing data deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update Billing Data
exports.updateBillingData = async (req, res) => {
  try {
    const { userId } = req.params;
    const { plan, minutes, extraMinutes, nextBillingDate } = req.body;

    const updatedBilling = await Billing.findOneAndUpdate(
      { userId },
      { plan, minutes, extraMinutes, nextBillingDate },
      { new: true }
    );

    if (!updatedBilling) {
      return res.status(404).json({ message: "Billing data not found" });
    }

    res.status(200).json(updatedBilling);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create Payment Intent
exports.createPaymentIntent = async (req, res) => {
  try {
    const { amount, currency = 'usd' } = req.body;
    
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
      automatic_payment_methods: {
        enabled: true,
      },
    });

    res.status(200).json({ clientSecret: paymentIntent.client_secret });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Handle Webhooks
exports.handleWebhooks = async (req, res) => {
  const sig = req.headers['stripe-signature'];
  const rawBody = req.rawBody; // Ensure middleware preserves raw body
  
  try {
    event = stripe.webhooks.constructEvent(
      rawBody,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    logger.error(`Stripe webhook error: ${err.message}`);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle different event types
  switch (event.type) {
    case 'payment_intent.succeeded':
      // Update your database here
      break;
    case 'payment_intent.payment_failed':
      // Handle failed payment
      break;
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  res.status(200).json({ received: true });
};
