const mongoose = require('mongoose');

const { Schema } = mongoose;

const mongoSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  bookId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  stripeCharge: {
    id: String,
    amount: Number,
    created: Number,
    livemode: Boolean,
    paid: Boolean,
    status: String,
  },
  createdAt: {
    type: Date,
    required: true,
  },
});

mongoSchema.index({ bookId: 1, userId: 1 }, { unique: true });

const Purchase = mongoose.model('Purchase', mongoSchema);

module.exports = Purchase;
