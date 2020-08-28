/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/jsx-indent */
/* eslint-disable prettier/prettier */
import PropTypes from 'prop-types';
import Head from 'next/head';
import Link from 'next/link';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Footer from '../components/Footer';

import {
  styleBigAvatar,
  styleRaisedButton,
  styleHomepageFeature,
  styleH1,
} from '../lib/SharedStyles';
import withAuth from '../lib/withAuth';

const styleTeamMember = {
  textAlign: 'center',
  padding: '10px 5%',
};

const Index = ({ user }) => (
  <div>
    <Head>
      <title>SF BMR Guide</title>
      <meta
        name="description"
        content="Buy a below market rate home in San Francisco for as low as $200K."
      />
    </Head>
    <div style={{ padding: '10px 8%', fontSize: '15px' }}>
      <Grid container direction="row" justify="space-around" align="flex-start">
        <Grid item sm={12} xs={12} style={{ textAlign: 'center' }}>
          <br />
          <h1 style={styleH1}>
            Buy a below market rate home in San Francisco for as low as $200K
          </h1>
          <p>
            The SF-BMR Ownership Program helps first time homebuyers who
            <br />
            are low, moderate, and middle-income. BMR homes are specified units
            <br />
            in San Francisco sold at below market rate prices. As I have
            <br />
            purchased a BMR home, I have learned the benefits and
            <br />
            challenges of going through this program. My book is a
            <br />
            updated guide to finding an affordable home in San Francisco.
          </p>
          <p style={{ textAlign: 'center' }}>
            <Link
              as="/books/demo-book/introduction"
              href="/public/read-chapter?bookSlug=demo-book&chapterSlug=introduction"
            >
              <Button
                variant="contained"
                color="primary"
                style={styleRaisedButton}
              >
                Read the book
              </Button>
            </Link>
          </p>
        </Grid>
      </Grid>

      <h1 style={styleH1}>How this book can help?</h1>
      <Grid container direction="row" justify="space-around" align="flex-start">
        <Grid item sm={6} xs={12} style={styleHomepageFeature}>
          <p>
            <b> A step-by-step guide through the SF BMR program </b>
          </p>
          <p>
            {' '}
            While the
            <a
              href="https://sfmohcd.org/bmr-ownership"
              target="_blank"
              rel="noopener noreferrer"
            >
              {' '}
              SF-BMR website
            </a>
            &nbsp;covers some key eligiblity requirements to qualify for the
            program, this book goes beyond and gives a comprehensive
            step-by-step guide not found on the website. From going to your
            first first-time homebuyers seminar, to winning the lottery, to
            closing on your first home, this book covers the full procress of
            buying your first home in San Francisco.
          </p>
        </Grid>
        <Grid item sm={6} xs={12} style={styleHomepageFeature}>
          <p>
            <b> Common pitfalls to avoid and hidden programs that can help </b>
          </p>
          <p>
            {' '}
            The SF-BMR program exists between many parties, including the
            <a
              href="https://sf.gov/departments/mayors-office-housing-and-community-development"
              target="_blank"
              rel="noopener noreferrer"
            >
              {' '}
              Mayor's Office of Housing and Community Development
            </a>
            , the
            <a
              href="https://sfhdc.org/"
              target="_blank"
              rel="noopener noreferrer"
            >
              {' '}
              San Francisco Housing Development Corporation
            </a>
            , and
            <a
              href="http://www.myhomegateway.org/"
              target="_blank"
              rel="noopener noreferrer"
            >
              {' '}
              My Home Gateway
            </a>
            . Many applicants fail to meet deadlines and eligibility in all of
            these programs. This book covers each program when you need them and
            the hidden benefits they can offer.
          </p>
        </Grid>
      </Grid>

      <br />

      <h1 style={styleH1}>
        Finding the right people, the right time, and the right home
      </h1>
      <Grid container direction="row" justify="space-around" align="flex-start">
        <Grid item sm={6} xs={12} style={styleHomepageFeature}>
          <p>
            <b> Contact the right people </b>
          </p>
          <p>
            This book includes updated contact information of mortgage brokers
            and counselors. Having the right people can make of break your BMR
            application.
          </p>
        </Grid>
        <Grid item sm={6} xs={12} style={styleHomepageFeature}>
          <p>
            <b> Sooner, not later </b>
          </p>
          <p>
            The best time to buy a home in San Francisco was 20 years ago, the
            second best time is now. The third best time is later. But
            regardless, it’s the only time we've got.
          </p>
        </Grid>
        <Grid item sm={6} xs={12} style={styleHomepageFeature}>
          <p>
            <b> Not all BMR homes are created equal </b>
          </p>
          <p>
            While most only look at the square-footage, the neighborhood and the
            commute, this guide goes further. We talk about getting lottery
            preferences, BMR homes that are in large development projects, and
            what the ideal BMR home looks like.
          </p>
        </Grid>
        <Grid item sm={6} xs={12} style={styleHomepageFeature}>
          <p>
            <b> Below market rate homes are still competitive </b>
          </p>
          In is common for a 1 bedroom condo, priced at $350,000, to have as
          many as 150+ applicants. Only one will win lottery and go on to
          purchase the home. The BMR applicantion is a number's game, but there
          are ways to get higher on the lottery preference to increase the odds.
          <p />
        </Grid>
      </Grid>

      <br />

      <h1 style={styleH1}>About the Author</h1>
      <div style={{ textAlign: 'center' }}>
        A SF-BMR homeowner, I wrote this book to help people get their first
        home
      </div>
      <br />
      <Grid container direction="row" justify="space-around" align="flex-start">
        <Grid item sm={4} xs={12} style={styleTeamMember}>
          <Avatar
            src="https://avatars0.githubusercontent.com/u/13133436?s=400&u=e596f9c987157285eb55e835e6a23622515b1985&v=4"
            style={styleBigAvatar}
            alt="John Merritt"
          />
          <p>
            <a
              href="https://radiant-dawn-48704.herokuapp.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              John Merritt
            </a>
            <br />
            San Francisco, CA
          </p>
          <p>
            John is a Scientist, JavaScript Web Developer, and SF-BMR homeowner.
            He enjoys acting, piano, and all things related to San Francisco.
          </p>
        </Grid>
      </Grid>
      <br />
    </div>
    <Footer />
  </div>
);

Index.propTypes = {
  user: PropTypes.shape({
    _id: PropTypes.string.isRequired,
  }),
};

Index.defaultProps = {
  user: null,
};

Index.getInitialProps = function getInitialProps() {
  const indexPage = true;
  return { indexPage };
};

export default withAuth(Index, { loginRequired: false });
