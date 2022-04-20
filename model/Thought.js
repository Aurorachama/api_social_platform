const date = require('date-and-time');
const { Schema, model } = require('mongoose');
const Reaction = require('./Reaction');

const userSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      trim: true,
      minletngth: 1,
      maxlength : 280,
    },

    createdAt: {
      type: Date,
      default: Date.now,
      get: date,
    },

    thoughts: [
        {
            type: Schema.Types.ObjectId,
            ref: "Thought",
        }
    ],

    friends: [
        {
            type:Schema.Types.ObjectId,
            ref: "User",
        }
    ],
  },
  {
    toJSON: {
      virtuals: true,
    },
    // id: false,
  }
);

userSchema.virtual("friendCount")
    .get(function () {
        return (this.friends.length) ? (this.friends.length) : (0);
});

const User = model('user', userSchema);

module.exports = User;