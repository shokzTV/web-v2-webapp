import React, { ReactElement } from 'react';
import PageFrame from '../components/PageFrame';
import ArticleList from '../components/blocks/ArticleList';
import Divider from '../components/Divider';

export default function Home(): ReactElement {
  return <PageFrame>
    <ArticleList />
    <Divider />
  </PageFrame>;
}