/* eslint-disable prettier/prettier */
const express = require('express');
const Book = require('../models/Book');
const Purchase = require('../models/Purchase');
const { createSession } = require('../stripe');
const logger = require('../logs');

const router = express.Router();

router.use((req, res, next) => {
  if (!req.user) {
    res.status(401).json({ error: 'Unauthorized' });
    return;
  }

  next();
});

router.get('/my-books', async (req, res) => {
  try {
    const { purchasedBookIds = [] } = req.user;

    const { purchasedBooks } = await Book.getPurchasedBooks({
      purchasedBookIds,
    });

    res.json({ purchasedBooks });
  } catch (err) {
    res.json({ error: err.message || err.toString() });
  }
});

router.post('/stripe/fetch-checkout-session', async (req, res) => {
  try {
    const { bookId, nextUrl } = req.body;

    const book = await Book.findById(bookId)
      .select(['slug'])
      .setOptions({ lean: true });

    if (!book) {
      throw new Error('Book not found');
    }

    const isPurchased =
      (await Purchase.find({
        userId: req.user._id,
        bookId: book._id,
      }).countDocuments()) > 0;
    if (isPurchased) {
      throw new Error('Already bought this book');
    }

    const session = await createSession({
      userId: req.user._id.toString(),
      userEmail: req.user.email,
      bookId,
      bookSlug: book.slug,
      nextUrl,
    });

    res.json({ sessionId: session.id });
  } catch (err) {
    logger.error(err);
    res.json({ error: err.message || err.toString() });
  }
});

router.post('/buy-book', async (req, res) => {
  const { id, stripeToken } = req.body;

  try {
    await Book.buy({ id, stripeToken, user: req.user });
    res.json({ done: 1 });
  } catch (err) {
    logger.error(`error with customer.js post route ${err}`);
    res.json({ error: err.message || err.toString() });
  }
});
module.exports = router;
