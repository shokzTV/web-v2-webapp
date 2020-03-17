import React, { ReactElement } from 'react';
import PageFrame from '../components/PageFrame';
import ArticleList from '../components/pages/articles/ArticleList';
import RecentTags from '../components/pages/articles/RecentTags';
import Divider from '../components/Divider';
import { fetchArticleIds, fetchArticles } from '../api/article';
import { fetchLatestTags } from '../api/tag';
import { Article } from '../api/@types/Article';
import { Tag } from '../api/@types/Tag';

const pageSize = 10;
export async function getStaticProps() {
  const articleIds = await fetchArticleIds();
  const articles = await fetchArticles(articleIds.slice(0, pageSize));
  const tags = await fetchLatestTags();

  return {
    props: {
      articleIds,
      articles,
      tags
    }
  }
}

interface Props {
  articleIds: number[];
  articles: Article[];
  tags: Tag[];
}

export default function articles({articleIds, articles, tags}: Props): ReactElement {
  return <PageFrame title={'Artikel'}>
    <ArticleList articleIds={articleIds} articles={articles} />

    <Divider double />

    <RecentTags tags={tags} />
  </PageFrame>;
}
