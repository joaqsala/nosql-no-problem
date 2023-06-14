const { Schema, model } = require('mongoose');

const Reaction = require('./Reaction');

// Schema to create thought model
const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      maxlength: [280, 'Must not be more than 280 characters.'],
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get(timestamp) {
        const date = new Date(timestamp);
        const options = {
          month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric',
        };
        const formattedDate = date.toLocaleDateString('en-US', options);

        return `${formattedDate} at ${date.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric' })}`;
      },
    },
    username: {
      type: String,
      required: true,
    },
    reactions: [Reaction],
  },
  {
    // Indicating that we want getters included w/response, overriding the default behavior
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  },
);

// Create a virtual property `reactionCount` that gets the length of the thought's reactions array
thoughtSchema
  .virtual('reactionCount')
  // Getter
  .get(function () {
    return `${this.reactions.length}`;
  });

// Initialize our Thought model
const Thought = model('thought', thoughtSchema);

module.exports = Thought;
