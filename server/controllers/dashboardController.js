const Analytics = require('../models/analyticsModel');
const Call = require('../models/callModel');
const logger = require('../config/logger');

// Get Dashboard Overview
exports.getOverview = async (req, res) => {
  try {
    const userId = req.user.id;
    const startDate = new Date(req.query.startDate || Date.now() - 30 * 24 * 60 * 60 * 1000);
    const endDate = new Date(req.query.endDate || Date.now());

    // Get total calls data
    const totalCalls = await Call.countDocuments({ 
      userId,
      createdAt: { $gte: startDate, $lte: endDate }
    });

    const answeredCalls = await Call.countDocuments({
      userId,
      status: 'answered',
      createdAt: { $gte: startDate, $lte: endDate }
    });

    const longCalls = await Call.countDocuments({
      userId,
      duration: { $gt: 20 },
      createdAt: { $gte: startDate, $lte: endDate }
    });

    const outcomes = await Call.aggregate([
      {
        $match: {
          userId,
          createdAt: { $gte: startDate, $lte: endDate }
        }
      },
      {
        $group: {
          _id: '$outcome',
          count: { $sum: 1 }
        }
      }
    ]);

    // Calculate percentages
    const pickupRate = totalCalls > 0 ? (answeredCalls / totalCalls) * 100 : 0;
    const longCallRate = totalCalls > 0 ? (longCalls / totalCalls) * 100 : 0;

    res.status(200).json({
      totalCalls,
      answeredCalls,
      pickupRate: pickupRate.toFixed(2),
      longCallRate: longCallRate.toFixed(2),
      outcomes
    });
  } catch (err) {
    logger.error(`Dashboard overview error: ${err.message}`);
    res.status(500).json({ message: 'Failed to fetch dashboard overview' });
  }
};

// Get Recent Outcomes
exports.getRecentOutcomes = async (req, res) => {
  try {
    const userId = req.user.id;
    const limit = parseInt(req.query.limit) || 10;
    const startDate = new Date(req.query.startDate || Date.now() - 7 * 24 * 60 * 60 * 1000);
    const endDate = new Date(req.query.endDate || Date.now());

    const recentOutcomes = await Call.find({
      userId,
      createdAt: { $gte: startDate, $lte: endDate }
    })
    .sort({ createdAt: -1 })
    .limit(limit)
    .select('createdAt duration outcome cost');

    res.status(200).json(recentOutcomes);
  } catch (err) {
    logger.error(`Recent outcomes error: ${err.message}`);
    res.status(500).json({ message: 'Failed to fetch recent outcomes' });
  }
};

// Get Dials and Minutes Data
exports.getDialsAndMinutes = async (req, res) => {
  try {
    const userId = req.user.id;
    const startDate = new Date(req.query.startDate || Date.now() - 30 * 24 * 60 * 60 * 1000);
    const endDate = new Date(req.query.endDate || Date.now());

    const dailyData = await Call.aggregate([
      {
        $match: {
          userId,
          createdAt: { $gte: startDate, $lte: endDate }
        }
      },
      {
        $group: {
          _id: {
            $dateToString: { format: "%Y-%m-%d", date: "$createdAt" }
          },
          totalDials: { $sum: 1 },
          totalMinutes: { $sum: "$duration" }
        }
      },
      {
        $sort: { _id: 1 }
      }
    ]);

    res.status(200).json(dailyData);
  } catch (err) {
    logger.error(`Dials and minutes error: ${err.message}`);
    res.status(500).json({ message: 'Failed to fetch dials and minutes data' });
  }
}; 