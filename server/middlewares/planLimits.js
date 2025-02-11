<<<<<<< HEAD
const User = require('../models/userModel');
const { PLANS } = require('../controllers/billingController');

const checkPlanLimits = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const plan = PLANS[user.plan];
    
    // Check minutes
    if (user.minutesUsed >= plan.minutes) {
      return res.status(403).json({ message: "Monthly minutes limit reached" });
    }

    // Check agents
    if (typeof plan.agents === 'number' && user.agentsAllowed >= plan.agents) {
      return res.status(403).json({ message: "Agent limit reached" });
    }

    next();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

=======
const User = require('../models/userModel');
const { PLANS } = require('../controllers/billingController');

const checkPlanLimits = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const plan = PLANS[user.plan];
    
    // Check minutes
    if (user.minutesUsed >= plan.minutes) {
      return res.status(403).json({ message: "Monthly minutes limit reached" });
    }

    // Check agents
    if (typeof plan.agents === 'number' && user.agentsAllowed >= plan.agents) {
      return res.status(403).json({ message: "Agent limit reached" });
    }

    next();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

>>>>>>> ebd3dd9c319bfada9595ec5af193b9d0c669dbda
module.exports = checkPlanLimits; 