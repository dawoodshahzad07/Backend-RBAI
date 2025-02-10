const BillingModel = require('../models/billingModel');

const billingMiddleware = async (req, res, next) => {
  try {
    const userId = req.user.id; // Assuming `authMiddleware` has already attached the user object
    const billingInfo = await BillingModel.findOne({ userId });

    if (!billingInfo || billingInfo.remainingMinutes <= 0) {
      return res.status(403).json({ message: 'Insufficient balance. Please purchase additional minutes.' });
    }

    next();
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error in billing middleware.' });
  }
};

module.exports = billingMiddleware;
