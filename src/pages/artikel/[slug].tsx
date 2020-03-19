import React, { ReactElement } from 'react';
import PageFrame from '../../components/PageFrame';
import SingleArticleView from '../../components/pages/articles/SingleArticleView';
import { Article } from '../../api/@types/Article';
import { fetchArticles, fetchArticleSlugs } from '../../api/article';
import { Event } from '../../api/@types/Event';
import { fetchMainEvent } from '../../api/event';
import { getImageUrl } from '../../config/image';
import Share from '../../components/block/Share';

export async function getStaticProps({params}) {
    const articles = await fetchArticles([params.slug]);
    const article = articles[0];
    const mainEvent = await fetchMainEvent();
    return {
        props: {
            article,
            mainEvent
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

export default function article({article, mainEvent}: {article: Article; mainEvent: Event}): ReactElement {
    return <PageFrame title={article && article.title} seoArticle={article} mainEvent={mainEvent} ogTitle={article && article.title} ogImage={getImageUrl(article && article.cover)}>
        <SingleArticleView article={article} />

        <Share url={`https://shokz.tv/artikel/${article && article.slug}`} title={article && article.title} />
    </PageFrame>;
}