/* eslint-disable linebreak-style */
const { Thought } = require('../models');

module.exports = {
  // Get all thoughts
  async getThoughts(req, res) {
    try {
      const thoughts = await Thought.find();
      res.json(thoughts);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Create a thought
  async createThought(req, res) {
    try {
      const thought = await Thought.create(req.body);
      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Get a single thought
  // eslint-disable-next-line consistent-return
  async getSingleThought(req, res) {
    try {
      const thought = await Thought.findOne({ _id: req.params.thoughtId }).select('-__v');

      if (!thought) {
        return res.status(404).json({ message: 'No thought by that ID.' });
      }

      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },

};
