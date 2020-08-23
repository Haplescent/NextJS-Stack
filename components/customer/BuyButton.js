/* eslint-disable no-unused-vars */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable prettier/prettier */
/* eslint-disable react/static-property-placement */
/* eslint-disable react/prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import NProgress from 'nprogress';
import Button from '@material-ui/core/Button';
import Link from 'next/link';
import { loadStripe } from '@stripe/stripe-js';

import { fetchCheckoutSession } from '../../lib/api/customer';
import getRootUrl from '../../lib/api/getRootUrl';

import notify from '../../lib/notifier';

const dev = process.env.NODE_ENV !== 'production';

// console.log('StripePublishableKey', StripePublishableKey);

const stripePromise = loadStripe(process.env.StripePublishableKey);
const ROOT_URL = getRootUrl();

const styleBuyButton = {
  margin: '10px 20px 0px 0px',
  font: '14px Roboto',
};

class BuyButton extends React.PureComponent {
  componentDidMount() {
    if (this.props.redirectToCheckout) {
      this.handleCheckoutClick();
    }
  }

  handleCheckoutClick = async () => {
    NProgress.start();

    try {
      const { book } = this.props;
      const { sessionId } = await fetchCheckoutSession({
        bookId: book._id,
        nextUrl: document.location.pathname,
      });

      // When the customer clicks on the button, redirect them to Checkout.
      const stripe = await stripePromise;
      const { error } = await stripe.redirectToCheckout({ sessionId });

      if (error) {
        notify(error);
      }
    } catch (err) {
      notify(err);
    } finally {
      NProgress.done();
    }
  };

  onLoginClicked = () => {
    const { user } = this.props;

    if (!user) {
      const redirectUrl = `${window.location.pathname}?buy=1`;
      window.location.href = `${ROOT_URL}/auth/google?redirectUrl=${redirectUrl}`;
    }
  };

  render() {
    const { book, user } = this.props;

    if (!book) {
      return null;
    }

    if (!user) {
      return (
        <div>
          <Button
            variant="contained"
            color="primary"
            style={styleBuyButton}
            onClick={this.onLoginClicked}
          >
            {`Buy book for $${book.price}`}
          </Button>
          {book.slug === 'builder-book' ? (
            <Link as="/book-reviews" href="/book-reviews">
              <Button variant="outlined" style={styleBuyButton}>
                See Reviews
              </Button>
            </Link>
          ) : null}
          <p style={{ verticalAlign: 'middle', fontSize: '15px' }}>
            {book.textNearButton}
          </p>
          <hr />
        </div>
      );
    }
    return (
      <div>
        <Button
          variant="contained"
          color="primary"
          style={styleBuyButton}
          onClick={this.handleCheckoutClick}
        >
          {`Buy book for $${book.price}`}
        </Button>
        <p style={{ verticalAlign: 'middle', fontSize: '15px' }}>
          {book.textNearButton}
        </p>
        <hr />
      </div>
    );
  }
}

BuyButton.propTypes = {
  book: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    textNearButton: PropTypes.string,
  }),
  user: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
  }),
  redirectToCheckout: PropTypes.bool,
};

BuyButton.defaultProps = {
  book: null,
  user: null,
  redirectToCheckout: false,
};

export default BuyButton;
