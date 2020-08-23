import sendRequest from './sendRequest';

const BASE_PATH = '/api/v1/customer';

export const getMyBookList = (options = {}) =>
  sendRequest(`${BASE_PATH}/my-books`, {
    method: 'GET',
    ...options,
  });

export const fetchCheckoutSession = ({ bookId, nextUrl }) =>
  sendRequest(`${BASE_PATH}/stripe/fetch-checkout-session`, {
    body: JSON.stringify({ bookId, nextUrl }),
  });

export const buyBook = ({ id, stripeToken }) =>
  sendRequest(`${BASE_PATH}/buy-book`, {
    body: JSON.stringify({ id, stripeToken }),
  });
