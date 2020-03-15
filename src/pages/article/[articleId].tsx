import React, { ReactElement } from 'react';
import PageFrame from '../../components/PageFrame';
import SingleArticleView from '../../components/pages/articles/SingleArticleView';
import { Article } from '../../api/@types/Article';
import { fetchArticleIds, fetchArticles } from '../../api/article';

export async function getStaticProps({params}) {
    const articles = await fetchArticles([params.articleId]);
    const article = articles[0];
    return {
        props: {
            article
        }
    };
}

export async function getStaticPaths() {
    const articleIds = await fetchArticleIds();
    return {
      paths: articleIds.map(String).map((articleId) => ({ params: { articleId } })),
      fallback: true,
    };
}

export default function article({article}: {article: Article}): ReactElement {
    return <PageFrame title={article.title} seoArticle={article}>
        <SingleArticleView article={article} />
    </PageFrame>;
}