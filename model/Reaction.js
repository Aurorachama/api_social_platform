const moment = require('moment');
const {Schema, Types} = require('mongoose');

const reactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: new Types.ObjectId(),
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
        get: (timing) => moment(timing).format("YYYY Do MMM, hh:mm:ss"),
      },

  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    // id: false,
  }
);

module.exports = reactionSchema;
