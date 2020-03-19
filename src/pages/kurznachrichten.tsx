import React, { ReactElement } from 'react'
import PageFrame from '../components/PageFrame';
import NewsListHeader from '../components/pages/news/NewsListHeader';
import Header from '../components/Header';
import NewsList from '../components/pages/news/NewsList';
import { News } from '../api/@types/News';
import { fetchAllNews } from '../api/news';
import { fetchMainEvent } from '../api/event';
import { Event } from '../api/@types/Event';

export async function getStaticProps() {
  const news = (await fetchAllNews()).sort(({id: a}, {id: b}) => b - a);
  const mainEvent = await fetchMainEvent();
  return {
      props: {
        mainEvent,
        news,
      }
  };
}

export default function news({mainEvent, news}: {news: News[]; mainEvent: Event}): ReactElement {
  return <PageFrame title={'Kurznachrichten'} mainEvent={mainEvent}>
      <Header title={'Kurznachrichten'} topHeader />
      <NewsListHeader />
      <NewsList news={news} />
  </PageFrame>;
}
