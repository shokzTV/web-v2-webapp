import fetch from 'isomorphic-unfetch';
import React from 'react';

export async function getServerSideProps({res}) {
  const request = await fetch(process.env.API_URL + '/sitemap');
  const xml = await request.text();

  res.setHeader('Content-Type', 'text/xml');
  res.write(xml);
  res.end();
}



class Sitemap extends React.Component {
  render = () => <></>;
}

export default Sitemap;