import React, { ReactElement } from 'react';
import PageFrame from '../Components/PageFrame';
import ArticleList from '../Components/Blocks/ArticleList';
import RecentArticleTags from '../Components/Blocks/RecentArticleTags';

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