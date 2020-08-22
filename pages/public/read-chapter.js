/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable prettier/prettier */
/* eslint-disable react/static-property-placement */
/* eslint-disable react/no-deprecated */
/* eslint-disable react/prop-types */
/* eslint-disable react/no-danger */
/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
import PropTypes from 'prop-types';
import Error from 'next/error';
import Head from 'next/head';
import Link from 'next/link';
import throttle from 'lodash/throttle';

import { getChapterDetail } from '../../lib/api/public';
import withAuth from '../../lib/withAuth';

const styleIcon = {
  opacity: '0.75',
  fontSize: '24px',
  cursor: 'pointer',
};

class ReadChapter extends React.Component {
  static propTypes = {
    chapter: PropTypes.shape({
      _id: PropTypes.string.isRequired,
    }),
  };

  static defaultProps = {
    chapter: null,
  };

  constructor(props) {
    super(props);

    const { chapter } = props;

    let htmlContent = '';
    if (chapter) {
      htmlContent = chapter.htmlContent;
    }

    this.state = {
      chapter,
      htmlContent,
    };
  }

  componentDidMount() {
    document
      .getElementById('main-content')
      .addEventListener('scroll', this.onScroll);
  }

  componentWillReceiveProps(nextProps) {
    const { chapter } = nextProps;

    if (chapter && chapter._id !== this.props.chapter._id) {
      const { htmlContent } = chapter;
      this.setState({ chapter, htmlContent });
    }
  }

  componentWillUnmount() {
    document
      .getElementById('main-content')
      .removeEventListener('scroll', this.onScroll);
  }

  onScroll = throttle(() => {
    const sectionElms = document.querySelectorAll('span.section-anchor');

    let activeSection;

    for (let i = 0; i < sectionElms.length; i += 1) {
      const s = sectionElms[i];

      activeSection = {
        hash: s.attributes.getNamedItem('name').value,
      };
    }

    this.setState({ activeSection });
  }, 500);

  static async getInitialProps({ req, query }) {
    const { bookSlug, chapterSlug } = query;

    const headers = {};
    if (req && req.headers && req.headers.cookie) {
      headers.cookie = req.headers.cookie;
    }

    const chapter = await getChapterDetail(
      { bookSlug, chapterSlug },
      { headers }
    );

    return { chapter };
  }

  renderMainContent() {
    const { chapter, htmlContent } = this.state;
    console.log(chapter);
    console.log(htmlContent);

    return (
      <div>
        <h2>Chapter: {chapter.title}</h2>

        <div
          className="main-content"
          dangerouslySetInnerHTML={{ __html: htmlContent }}
        />
      </div>
    );
  }

  renderSections() {
    const { sections } = this.state.chapter;
    console.log(sections);
    const { activeSection } = this.state;
    console.log(activeSection);

    if (!sections || !sections.length === 0) {
      return null;
    }

    return (
      <ul>
        {sections.map(s => (
          <li key={s.escapedText} style={{ paddingTop: '10px' }}>
            <a
              href={`#${s.escapedText}`}
              style={{
                color:
                  activeSection && activeSection.hash === s.escapedText
                    ? '#1565C0'
                    : '#222',
              }}
            >
              {s.text}
            </a>
          </li>
        ))}
      </ul>
    );
  }

  renderSidebar() {
    const { chapter } = this.state;

    const { book } = chapter;
    const { chapters } = book;

    return (
      <div
        style={{
          textAlign: 'left',
          position: 'absolute',
          bottom: 0,
          top: '64px',
          left: 0,
          overflowY: 'auto',
          overflowX: 'hidden',
          width: '400px',
          padding: '0px 25px',
        }}
      >
        <p style={{ padding: '0px 40px', fontSize: '17px', fontWeight: '400' }}>
          {book.name}
        </p>
        <ol
          start="0"
          style={{ padding: '0 25', fontSize: '14px', fontWeight: '300' }}
        >
          {chapters.map((ch, i) => (
            <li
              key={ch._id}
              role="presentation"
              style={{
                listStyle: i === 0 ? 'none' : 'decimal',
                paddingBottom: '10px',
              }}
            >
              <Link
                as={`/books/${book.slug}/${ch.slug}`}
                href={`/public/read-chapter?bookSlug=${book.slug}&chapterSlug=${ch.slug}`}
              >
                <a
                  style={{ color: chapter._id === ch._id ? '#1565C0' : '#222' }}
                >
                  {ch.title}
                </a>
              </Link>
              {chapter._id === ch._id ? this.renderSections() : null}
            </li>
          ))}
        </ol>
      </div>
    );
  }

  render() {
    const { chapter } = this.state;

    if (!chapter) {
      return <Error statusCode={404} />;
    }

    return (
      <div id="main-content">
        <Head>
          <title>
            {chapter.title === 'Introduction'
              ? 'Introduction'
              : `Chapter ${chapter.order - 1}. ${chapter.title}`}
          </title>
          {chapter.seoDescription ? (
            <meta name="description" content={chapter.seoDescription} />
          ) : null}
        </Head>

        {this.renderSidebar()}

        <div
          style={{
            textAlign: 'left',
            padding: '0px 10px 20px 30px',
            position: 'fixed',
            right: 0,
            bottom: 0,
            top: '64px',
            left: '400px',
            overflowY: 'auto',
            overflowX: 'hidden',
          }}
          id="main-content"
        >
          {this.renderMainContent()}
        </div>

        <div
          style={{
            position: 'fixed',
            top: '80px',
            left: '15px',
          }}
        >
          <i // eslint-disable-line
            className="material-icons"
            style={styleIcon}
          >
            format_list_bulleted
          </i>
        </div>
      </div>
    );
  }
}

export default withAuth(ReadChapter, { loginRequired: false });
