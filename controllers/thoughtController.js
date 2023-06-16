/* eslint-disable linebreak-style */
const { Thought, User } = require('../models');

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

  // Create a thought and update the user with their thought
  // eslint-disable-next-line consistent-return
  async createThought(req, res) {
    try {
      const thought = await Thought.create(req.body);
      const user = await User.findOneAndUpdate(
        { _id: req.body.userId },
        // eslint-disable-next-line no-underscore-dangle
        { $addToSet: { thoughts: thought._id } },
        { new: true },
      );

      if (!user) {
        return res.status(404).json({
          message: 'Thought created, but found no user with that ID',
        });
      }

      res.json('Thought has been created!');
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Get a single thought
  // eslint-disable-next-line consistent-return
  async getSingleThought(req, res) {
    try {
      const thought = await Thought.findOne({
        _id: req.params.thoughtId,
      }).select('-__v').populate('reactions');

      if (!thought) {
        return res.status(404).json({ message: 'No thought by that ID.' });
      }

      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Update a thought
  async updateThought(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $set: req.body },
        { runValidators: true, new: true },
      );

      if (!thought) {
        res.status(400).json({ message: 'No thought with this id found.' });
      }

      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // delete a thought
  async deleteThought(req, res) {
    try {
      const thought = await Thought.findOneAndDelete({
        _id: req.params.thoughtId,
      });

      if (!thought) {
        res.status(404).json({ message: 'No thought with this id found.' });
      }

      await User.findOneAndUpdate(
        { username: thought.username },
        { $pull: { thoughts: req.params.thoughtId } },
        { new: true },
      );

      res.json({
        message: 'The Thought has been deleted, and the user has been updated.',
      });
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Add a reaction to a thought
  async createReaction(req, res) {
    try {
      const reaction = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $addToSet: { reactions: req.body } },
        { runValidators: true, new: true },
      );

      if (!reaction) {
        res.status(404).json({ message: 'No thought found with that Id.' });
      }

      res.json(reaction);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Remove a reaction to a thought
  async removeReaction(req, res) {
    try {
      const reaction = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $pull: { reactions: { reactionId: req.params.reactionId } } },
        { runValidators: true, new: true },
      );

      if (!reaction) {
        res.status(404).json({ message: 'No reaction found with that Id.' });
      }

      res.json({ message: 'The reaction has been removed.' });
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
