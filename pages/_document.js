import Document, { Head, Html, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <meta charSet="utf-8" />
          {/* // tells browser that content is UTF-8 encoded */}
          <meta
            //   {/* // eslint-disable-line */}
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          {/* // sets page width to screen width, sets initial zoom */}
          <meta name="google" content="notranslate" />
          {/* // tell google to not show translate modals */}
          <meta name="theme-color" content="#1976D2" />
          {/* // specifies color of browser on mobile device */}
          <link
            rel="shortcut icon"
            href="https://storage.googleapis.com/builderbook/favicon32.png"
          />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Muli:300,400:latin"
          />
          <link
            //   {/* // eslint-disable-line */}
            rel="stylesheet"
            href="https://fonts.googleapis.com/icon?family=Material+Icons"
          />
          <link
            rel="stylesheet"
            href="https://storage.googleapis.com/builderbook/nprogress.min.css"
          />
          <link
            //   {/* // eslint-disable-line */}
            rel="stylesheet"
            href="https://storage.googleapis.com/builderbook/vs.min.css"
          />

          <style>
            {`
   a, a:focus {
     font-weight: 400;
     color: #1565C0;
     text-decoration: none;
     outline: none
   }
   a:hover, button:hover {
     opacity: 0.75;
     cursor: pointer
   }
   blockquote {
     padding: 0 1em;
     color: #555;
     border-left: 0.25em solid #dfe2e5;
   }
   pre {
     display:block;
     overflow-x:auto;
     padding:0.5em;
     background:#FFF;
     color: #000;
     border: 1px solid #ddd;
   }
   code {
     font-size: 14px;
     background: #FFF;
     padding: 3px 5px;
   }
 `}
          </style>
        </Head>
        <body
          style={{
            font: '16px Muli',
            color: '#222',
            margin: '0px auto',
            fontWeight: '300',
            lineHeight: '1.5em',
            backgroundColor: '#F7F9FC',
          }}
        >
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
