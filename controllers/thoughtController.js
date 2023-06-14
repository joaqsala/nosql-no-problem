const { User, Thought } = require('../models');

module.exports = {
    // Get all thoughts
    async getThoughts(req, res) {
        try {
            const thoughts = await Thought.find();
            res.json(users);
        } catch (err) {
            res.status(500).json(err);
        }
    },
}