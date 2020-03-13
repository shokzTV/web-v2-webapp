import React, { ReactElement } from 'react'
import PageFrame from '../components/PageFrame';
import NewsListHeader from '../components/pages/news/NewsListHeader';
import Header from '../components/Header';
import Divider from '../components/Divider';
import NewsList from '../components/pages/news/NewsList';

export default function news(): ReactElement {
  return <PageFrame title={'News'}>
      <Header title={'Kurznachrichten'} />
      <Divider />
      <NewsListHeader />
      <NewsList />
  </PageFrame>;
}
