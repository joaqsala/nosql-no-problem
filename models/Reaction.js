const { Schema, Types } = require('mongoose');

const reactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    reactionBody: {
      type: String,
      required: true,
      maxlength: 280,
    },
    username: {
      type: String,
      required: true,
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

        return `${formattedDate}`;
      },
    },
  },
  {
    toJSON: {
      getters: true,
    },
    id: false,
  },
);

module.exports = reactionSchema;
