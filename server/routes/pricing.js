const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// Mock database
let users = [];
let plans = [
    {
        id: 'business',
        name: 'Business',
        price: 97,
        features: ['1 AI Voice Agent', '10,000 contacts', '400 minutes'],
        trialDays: 3,
        stripePriceId: 'price_1QpYllAIF1NdBIH7' // Replace with your actual price ID
    },
    {
        id: 'agency',
        name: 'Agency',
        price: 297,
        features: ['10 AI Voice Agents', 'Unlimited contacts', '1,200 minutes'],
        trialDays: 3,
        stripePriceId: 'price_1QpYllAIF1NdBIH7' // Replace with your actual price ID
    },
    {
        id: 'agency-pro',
        name: 'Agency Pro',
        price: 497,
        features: ['Unlimited AI Voice Agents', 'Unlimited contacts', '2,500 minutes'],
        trialDays: 3,
        stripePriceId: 'price_1QpYllAIF1NdBIH7' // Replace with your actual price ID
    }
];

// Get all plans
router.get('/plans', (req, res) => {
    res.json(plans);
});

// Start trial
router.post('/start-trial', (req, res) => {
    const { planId, userInfo } = req.body;
    
    // Validate input
    if (!planId || !userInfo || !userInfo.email) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    const plan = plans.find(p => p.id === planId);
    if (!plan) {
        return res.status(404).json({ error: 'Plan not found' });
    }

    // Create user
    const user = {
        id: uuidv4(),
        ...userInfo,
        planId,
        trialStart: new Date(),
        trialEnd: new Date(Date.now() + plan.trialDays * 24 * 60 * 60 * 1000),
        status: 'trial'
    };

    users.push(user);

    res.json({
        success: true,
        message: 'Trial started successfully',
        trialEnd: user.trialEnd,
        userId: user.id
    });
});

// Process signup and payment
router.post('/signup', async (req, res) => {
    const { userId, paymentMethodId } = req.body;
    
    // Validate input
    if (!userId || !paymentMethodId) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    const user = users.find(u => u.id === userId);
    if (!user) {
        return res.status(404).json({ error: 'User not found' });
    }

    const plan = plans.find(p => p.id === user.planId);
    if (!plan) {
        return res.status(404).json({ error: 'Plan not found' });
    }

    try {
        // Create Stripe customer
        const customer = await stripe.customers.create({
            email: user.email,
            name: user.fullName,
            phone: user.phoneNumber,
            payment_method: paymentMethodId,
            invoice_settings: {
                default_payment_method: paymentMethodId
            }
        });

        // Create subscription
        const subscription = await stripe.subscriptions.create({
            customer: customer.id,
            items: [{ price: plan.stripePriceId }],
            trial_period_days: plan.trialDays,
            expand: ['latest_invoice.payment_intent']
        });

        // Update user with Stripe info
        user.stripeCustomerId = customer.id;
        user.stripeSubscriptionId = subscription.id;
        user.status = 'active';
        user.paymentDate = new Date();

        res.json({
            success: true,
            message: 'Signup completed successfully',
            user,
            clientSecret: subscription.latest_invoice.payment_intent.client_secret
        });
    } catch (err) {
        console.error('Stripe error:', err);
        res.status(500).json({ error: err.message });
    }
});

// Webhook endpoint for Stripe events
router.post('/webhook', express.raw({type: 'application/json'}), async (req, res) => {
    const sig = req.headers['stripe-signature'];
    const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

    let event;

    try {
        event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
    } catch (err) {
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    // Handle the event
    switch (event.type) {
        case 'payment_intent.succeeded':
            // Handle successful payment
            break;
        case 'customer.subscription.created':
            // Handle new subscription
            break;
        case 'customer.subscription.updated':
            // Handle subscription update
            break;
        default:
            console.log(`Unhandled event type ${event.type}`);
    }

    res.json({received: true});
});

module.exports = router; 