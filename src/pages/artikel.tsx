import React, { ReactElement } from 'react';
import PageFrame from '../components/PageFrame';
import ArticleList from '../components/pages/articles/ArticleList';
import RecentTags from '../components/pages/articles/RecentTags';
import Divider from '../components/Divider';
import { fetchArticles, fetchArticleSlugs } from '../api/article';
import { fetchLatestTags } from '../api/tag';
import { Article } from '../api/@types/Article';
import { Tag } from '../api/@types/Tag';
import { fetchMainEvent } from '../api/event';
import { Event } from '../api/@types/Event';

const pageSize = 10;
export async function getStaticProps() {
  const slugs = await fetchArticleSlugs();
  const articles = await fetchArticles(slugs.slice(0, pageSize));
  const tags = await fetchLatestTags();
  const mainEvent = await fetchMainEvent();

  return {
    props: {
      slugs,
      mainEvent,
      articles,
      tags
    }
  }
}

interface Props {
  slugs: string[];
  articles: Article[];
  tags: Tag[];
  mainEvent: Event;
}

export default function articles({slugs, articles, tags, mainEvent}: Props): ReactElement {
  return <PageFrame title={'Artikel'} mainEvent={mainEvent}>
    <ArticleList slugs={slugs} articles={articles} />

    <Divider double />

    <RecentTags tags={tags} />
  </PageFrame>;
}
