import fetch from 'isomorphic-unfetch';
import React from 'react';

export async function getServerSideProps({res}) {
  const request = await fetch(process.env.API_URL + '/sitemap');
  const posts = await request.text();

  res.setHeader('Content-Type', 'text/xml');
  res.write(posts);
  res.end();
}



class Sitemap extends React.Component {
}

export default Sitemap;