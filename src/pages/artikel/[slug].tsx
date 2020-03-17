import React, { ReactElement } from 'react';
import PageFrame from '../../components/PageFrame';
import SingleArticleView from '../../components/pages/articles/SingleArticleView';
import { Article } from '../../api/@types/Article';
import { fetchArticles, fetchArticleSlugs } from '../../api/article';

export async function getStaticProps({params}) {
    const articles = await fetchArticles([params.slug]);
    const article = articles[0];
    return {
        props: {
            article
        }
    };
}

export async function getStaticPaths() {
    const slugs = await fetchArticleSlugs();
    return {
      paths: slugs.map((slug) => ({ params: { slug } })),
      fallback: true,
    };
}

export default function article({article}: {article: Article}): ReactElement {
    return <PageFrame title={article && article.title} seoArticle={article}>
        <SingleArticleView article={article} />
    </PageFrame>;
}