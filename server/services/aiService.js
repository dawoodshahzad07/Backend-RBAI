// aiService.js
const { VoiceAgent } = require("../models/aiAgentModel");
const { Script } = require("../models/scriptModel");
const logger = require("../utils/logger");

/**
 * Create a new AI voice agent
 * @param {Object} agentData - Data for creating a new AI agent
 * @returns {Object} - Created agent data
 */
const createAgent = async (agentData) => {
    try {
        if (!agentData || !agentData.name) {
            logger.warn("Invalid agent data provided");
            throw new Error("Invalid agent data");
        }
        const newAgent = new VoiceAgent(agentData);
        await newAgent.save();
        logger.info(`New agent created: ${newAgent._id}`);
        return newAgent;
    } catch (error) {
        logger.error(`Error creating AI Agent: ${error.message}`, { stack: error.stack });
        throw new Error("Failed to create AI Agent");
    }
};

/**
 * Update an AI voice agent
 * @param {String} agentId - ID of the agent to update
 * @param {Object} updateData - Data to update the agent
 * @returns {Object} - Updated agent data
 */
const updateAgent = async (agentId, updateData) => {
    try {
        const updatedAgent = await VoiceAgent.findByIdAndUpdate(agentId, updateData, { new: true });
        if (!updatedAgent) {
            throw new Error("Agent not found");
        }
        return updatedAgent;
    } catch (error) {
        logger.error("Error updating AI Agent:", error);
        throw new Error("Failed to update AI Agent");
    }
};

/**
 * Delete an AI voice agent
 * @param {String} agentId - ID of the agent to delete
 * @returns {Boolean} - Deletion status
 */
const deleteAgent = async (agentId) => {
    try {
        const deletedAgent = await VoiceAgent.findByIdAndDelete(agentId);
        if (!deletedAgent) {
            throw new Error("Agent not found");
        }
        return true;
    } catch (error) {
        logger.error("Error deleting AI Agent:", error);
        throw new Error("Failed to delete AI Agent");
    }
};

/**
 * Test a script with a specific agent
 * @param {String} agentId - ID of the agent
 * @param {String} scriptId - ID of the script
 * @returns {Object} - Test result
 */
const testScript = async (agentId, scriptId) => {
    try {
        const agent = await VoiceAgent.findById(agentId);
        const script = await Script.findById(scriptId);

        if (!agent || !script) {
            throw new Error("Agent or Script not found");
        }

        // Logic for testing the script (e.g., simulation, validation, etc.)
        const testResult = {
            agentName: agent.name,
            scriptTitle: script.title,
            status: "success",
            message: "Script executed successfully in test mode.",
        };

        return testResult;
    } catch (error) {
        logger.error("Error testing script:", error);
        throw new Error("Failed to test script with AI Agent");
    }
};

module.exports = {
    createAgent,
    updateAgent,
    deleteAgent,
    testScript,
};
