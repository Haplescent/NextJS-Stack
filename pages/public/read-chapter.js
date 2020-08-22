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
import isEqual from 'lodash/isEqual';
import Header from '../../components/Header';

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
      showTOC: false,
      chapter,
      htmlContent,
      hideHeader: false,
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

  onScroll = throttle(() => {
    this.onScrollActiveSection();
    this.onScrollHideHeader();
  }, 500);

  componentWillUnmount() {
    document
      .getElementById('main-content')
      .removeEventListener('scroll', this.onScroll);
  }

  onScrollHideHeader = () => {
    const distanceFromTop = document.getElementById('main-content').scrollTop;
    const hideHeader = distanceFromTop > 500;

    if (this.state.hideHeader !== hideHeader) {
      this.setState({ hideHeader });
    }
  };

  onScrollActiveSection = () => {
    const sectionElms = document.querySelectorAll('span.section-anchor');
    let activeSection;

    let aboveSection;
    for (let i = 0; i < sectionElms.length; i += 1) {
      const s = sectionElms[i];
      const b = s.getBoundingClientRect();
      const anchorBottom = b.bottom;

      if (anchorBottom >= 0 && anchorBottom <= window.innerHeight) {
        activeSection = {
          hash: s.attributes.getNamedItem('name').value,
        };

        break;
      }

      if (anchorBottom > window.innerHeight && i > 0) {
        if (aboveSection.bottom <= 0) {
          activeSection = {
            hash: sectionElms[i - 1].attributes.getNamedItem('name').value,
          };
          break;
        }
      } else if (i + 1 === sectionElms.length) {
        activeSection = {
          hash: s.attributes.getNamedItem('name').value,
        };
      }

      aboveSection = b;
    }

    if (!isEqual(this.state.activeSection, activeSection)) {
      this.setState({ activeSection });
    }
  };

  toggleChapterList = () => {
    this.setState({ showTOC: !this.state.showTOC });
  };

  renderMainContent() {
    const { chapter, htmlContent } = this.state;

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
    const { showTOC, chapter, hideHeader } = this.state;
    const { book } = chapter;
    const { chapters } = book;

    if (!showTOC) {
      return null;
    }

    return (
      <div
        style={{
          textAlign: 'left',
          position: 'absolute',
          bottom: 0,
          top: hideHeader ? 0 : '64px',
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
    const { user } = this.props;

    const { chapter, showTOC, hideHeader } = this.state;

    if (!chapter) {
      return <Error statusCode={404} />;
    }

    return (
      <div>
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

        <Header user={user} hideHeader={hideHeader} />

        {this.renderSidebar()}

        <div
          style={{
            textAlign: 'left',
            padding: '0px 10px 20px 30px',
            position: 'fixed',
            right: 0,
            bottom: 0,
            top: hideHeader ? 0 : '64px',
            transition: 'top 0.5s ease-in',
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
            top: hideHeader ? '20px' : '80px',
            transition: 'top 0.5s ease-in',
            left: '15px',
          }}
        >
          <i //eslint-disable-line
            className="material-icons"
            style={styleIcon}
            onClick={this.toggleChapterList}
            onKeyPress={this.toggleChapterList}
            role="button"
          >
            format_list_bulleted
          </i>
        </div>
      </div>
    );
  }
}

export default withAuth(ReadChapter, { loginRequired: false });
