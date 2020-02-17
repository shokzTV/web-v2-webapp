import React, { ReactElement } from 'react';
import PageFrame from '../Components/PageFrame';
import ArticleList from '../Components/blocks/ArticleList';
import RecentArticleTags from '../Components/blocks/RecentArticleTags';

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