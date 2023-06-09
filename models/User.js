const { Schema, model } = require('mongoose');

// Schema to create User model
const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      lowercase: true,
      unique: true,
      validate: {
        validator(v) {
          return /^([a-z0-9_.-]+)@([\da-z.-]+)\.([a-z.]{2,6})$/.test(v);
        },
        message: (props) => `${props.value} is not a valid email.`,
      },
      required: true,
    },
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'thought',
      },
    ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: 'user',
      },
    ],
  },
  {
    // Indicating we want virtuals included w/response, overriding the default behavior
    toJSON: {
      virtuals: true,
    },
    id: false,
  },
);

// Create a virtual property `friendCount` that gets the length of the friends array
userSchema
  .virtual('friendCount')
  // Getter
  // eslint-disable-next-line func-names
  .get(function () {
    return `${this.friends.length}`;
  });

// Initialize our User model
const User = model('user', userSchema);

module.exports = User;
