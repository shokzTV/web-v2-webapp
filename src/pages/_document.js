// _document is only rendered on the server side and not on the client side
// Event handlers like onClick can't be added to this file

// ./pages/_document.js
import Document, { Html, Head, Main, NextScript } from 'next/document';
import Navigation from '../components/Navigation';

class MyDocument extends Document {
  render() {
    return (
      <Html lang="de">
        <Head />
        <body>
          <Navigation />
          <Main />
          <NextScript />
          <link href="https://fonts.googleapis.com/css?family=Roboto+Condensed:400,400i,700&display=swap" rel="stylesheet" />
        </body>
      </Html>
    )
  }
}

export default MyDocument
