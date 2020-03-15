import React, { ReactElement } from 'react'
import PageFrame from '../components/PageFrame';
import NewsListHeader from '../components/pages/news/NewsListHeader';
import Header from '../components/Header';
import Divider from '../components/Divider';
import NewsList from '../components/pages/news/NewsList';
import { News } from '../api/@types/News';
import { fetchAllNews } from '../api/news';

export async function getStaticProps() {
  const news = (await fetchAllNews()).sort(({id: a}, {id: b}) => b - a);
  return {
      props: {
        news
      }
  };
}

export default function news({news}: {news: News[]}): ReactElement {
  return <PageFrame title={'News'}>
      <Header title={'Kurznachrichten'} topHeader />
      <Divider />
      <NewsListHeader />
      <NewsList news={news} />
  </PageFrame>;
}
