import React, { ReactElement } from 'react'
import PageFrame from '../components/PageFrame';
import FeaturedArticles from '../components/pages/index/FeaturedArticles';

export default function index(): ReactElement {
  return <PageFrame>
    <FeaturedArticles />
  </PageFrame>;
}