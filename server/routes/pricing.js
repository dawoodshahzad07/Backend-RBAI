const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const User = require('../models/userModel'); // Adjust the path as needed

// Mock database
let users = [];
let plans = [
    {
        id: 'business',
        name: 'Business',
        price: 80.00,
        annualPrice: 970,
        features: ['1 AI Voice Agent', '400 Minutes', '10,000 Contacts'],
        trialDays: 3,
        stripePriceId: 'prod_RkrOuMM4bnIU6i',
        stripeAnnualPriceId: 'price_1QpYllAIF1NdBIH8'
    },
    {
        id: 'agency',
        name: 'Agency',
        price: 228.00,
        annualPrice: 2970,
        features: ['10 AI Voice Agents', '1,200 Minutes', 'Unlimited Contacts'],
        trialDays: 3,
        stripePriceId: 'prod_RkrSynBIivMrZd',
        stripeAnnualPriceId: 'price_1QpYllAIF1NdBIH10'
    },
    {
        id: 'agency-pro',
        name: 'Agency Pro',
        price: 497,
        annualPrice: 4970,
        features: ['Unlimited AI Voice Agents', '2,500 Minutes', 'Unlimited Contacts'],
        trialDays: 3,
        stripePriceId: 'price_1QpYllAIF1NdBIH11',
        stripeAnnualPriceId: 'price_1QpYllAIF1NdBIH12'
    },
    {
        id: 'agency-vip',
        name: 'Agency VIP',
        price: 997,
        annualPrice: 9970,
        features: ['Whitelabel', '6,000 Minutes', 'AI Web Agents'],
        trialDays: 0,
        stripePriceId: 'price_1QpYllAIF1NdBIH13',
        stripeAnnualPriceId: 'price_1QpYllAIF1NdBIH14'
    }
];

// Get all plans
router.get('/plans', (req, res) => {
    res.json(plans);
});

// Start trial
router.post('/start-trial', async (req, res) => {
    const { planId, userInfo } = req.body;
    
    // Validate input
    if (!planId || !userInfo || !userInfo.email) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    const plan = plans.find(p => p.id === planId);
    if (!plan) {
        return res.status(404).json({ error: 'Plan not found' });
    }

    try {
        // Check if user already exists
        let user = await User.findOne({ email: userInfo.email });
        if (user) {
            return res.status(400).json({ error: 'User already exists' });
        }

        // Create user in database
        user = new User({
            ...userInfo,
            planId,
            trialStart: new Date(),
            trialEnd: new Date(Date.now() + plan.trialDays * 24 * 60 * 60 * 1000),
            status: 'trial'
        });

        await user.save();

        res.json({
            success: true,
            message: 'Trial started successfully',
            trialEnd: user.trialEnd,
            userId: user._id
        });
    } catch (err) {
        console.error('Error:', err);
        res.status(500).json({ error: err.message });
    }
});

// Set Password
router.post('/set-password', async (req, res) => {
    const { userId, password } = req.body;

    // Validate input
    if (!userId || !password) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Set password (assuming your User model hashes it automatically)
        user.password = password;
        await user.save();

        res.json({ success: true, message: 'Password set successfully' });
    } catch (err) {
        console.error('Error:', err);
        res.status(500).json({ error: err.message });
    }
});

// Process payment after trial
router.post('/process-payment', async (req, res) => {
    const { userId, paymentMethodId, billingType } = req.body; // billingType: 'monthly' or 'annual'

    // Validate input
    if (!userId || !paymentMethodId || !billingType) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    try {
        // Find user
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Find plan
        const plan = plans.find(p => p.id === user.planId);
        if (!plan) {
            return res.status(404).json({ error: 'Plan not found' });
        }

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

        // Determine Price ID based on billing type
        const priceId = billingType === 'annual' ? plan.stripeAnnualPriceId : plan.stripePriceId;

        // Create subscription
        const subscription = await stripe.subscriptions.create({
            customer: customer.id,
            items: [{ price: priceId }],
            trial_period_days: plan.trialDays,
            expand: ['latest_invoice.payment_intent']
        });

        // Update user with Stripe info
        user.stripeCustomerId = customer.id;
        user.stripeSubscriptionId = subscription.id;
        user.status = 'active';
        user.paymentDate = new Date();
        user.billingType = billingType; // Store billing type

        await user.save();

        res.json({
            success: true,
            message: 'Payment processed successfully',
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