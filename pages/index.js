import Head from 'next/head';
import Header from '../components/Header';

const Index = () => (
  <div style={{ padding: '10px 45px' }}>
    <Head>
      <title>Index page</title>
      <meta
        //   {/* // eslint-disable-line */}
        name="description"
        content="This is the description of the Index page"
      />
    </Head>
    <Header />
    <p>Content on Index page</p>
  </div>
);

export default Index;
