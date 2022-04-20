const { Schema, model } = require('mongoose');

// Schema to create Student model
const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      max_letngth: 50,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'The email address is invalid, please try again']
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