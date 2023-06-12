const { Schema, model } = require('mongoose');

// Schema to create User model
const thoughtsSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      max_length: [280, 'Must not be more than 280 characters.']
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: function (timestamp) {
        const date = new Date(timestamp);
        const options = { month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric' };
        const formattedDate = date.toLocaleDateString('en-US', options);

        return `${formattedDate} at ${date.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric' })}`;
      }
    },
    username: {
        type: String,
        required: true,
    },
    reactions: [reactionSchema],
  },
  {
    // Indicating that we want getters to be included with our response, overriding the default behavior
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  }
);

// Create a virtual property `reactionCount` that gets the length of the thought's reactions array
thoughtsSchema
  .virtual('reactionCount')
  // Getter
  .get(function () {
    return `${this.reactions.length}`;
  })

// Initialize our User model
const Thoughts = model('thoughts', thoughtsSchema);

module.exports = Thoughts;
