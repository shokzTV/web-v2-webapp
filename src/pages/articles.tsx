import React, { ReactElement } from 'react';
import PageFrame from '../components/PageFrame';
import ArticleList from '../components/pages/articles/ArticleList';
import RecentTags from '../components/pages/articles/RecentTags';
import Divider from '../components/Divider';

export default function articles(): ReactElement {
  return <PageFrame>
    <ArticleList />

    <Divider double />

    <RecentTags />
  </PageFrame>;
}