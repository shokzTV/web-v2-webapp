import React, { ReactElement } from 'react';
import PageFrame from '../components/PageFrame';
import ArticleList from '../components/blocks/ArticleList';
import RecentArticleTags from '../components/blocks/RecentArticleTags';

export default function Home(): ReactElement {
  return <PageFrame>
    <div className={'pageFrame'}>
      <ArticleList />
      <div className={'articleTagsDivider'} />
      <RecentArticleTags />
    </div>

    <style jsx>{`
      .articleTagsDivider {
        margin-top: 50px;
      }

      .pageFrame {
        padding-bottom: 40px;
      }
    `}</style>
  </PageFrame>;
}