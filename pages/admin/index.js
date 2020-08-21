/* eslint-disable prettier/prettier */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/state-in-constructor */
import { Component } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import Button from '@material-ui/core/Button';

import notify from '../../lib/notifier';

import withAuth from '../../lib/withAuth';
import { getBookList } from '../../lib/api/admin';

const Index = ({ books }) => (
  <div style={{ padding: '10px 45px' }}>
    <div>
      <h2>Books</h2>
      <Link href="/admin/add-book">
        <Button variant="contained">Add book</Button>
      </Link>
      <ul>
        {books.map(book => (
          <li key={book._id}>
            <Link
              as={`/admin/book-detail/${book.slug}`}
              href={`/admin/book-detail?slug=${book.slug}`}
            >
              <a>{book.name}</a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  </div>
);

Index.propTypes = {
  books: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      slug: PropTypes.string.isRequired,
    })
  ).isRequired,
};

class IndexWithData extends Component {
  state = {
    books: [],
  };

  async componentDidMount() {
    try {
      const { books } = await getBookList();
      this.setState({ books }); // eslint-disable-line
    } catch (err) {
      notify(err);
    }
  }

  render() {
    return <Index {...this.state} />;
  }
}

export default withAuth(IndexWithData, { adminRequired: true });
