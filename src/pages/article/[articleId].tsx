import React, { ReactElement, useState, useEffect } from 'react';
import PageFrame from '../../components/PageFrame';
import { useRouter } from 'next/router';
import { Article } from '../../api/@types/Article';
import { loadArticle } from '../../api/article';
import SingleArticleView from '../../components/pages/articles/SingleArticleView';

export default function article(): ReactElement {
    const router = useRouter();
    const articleId = +router.query.articleId;
    const [article, setArticle] = useState<Article | null>(null);

    useEffect(() => {
        const load = async () => setArticle(await loadArticle(articleId));
        if(!article && articleId) {
            load();
        }
    }, [articleId]);

    return <PageFrame title={article && article.title}>
        <SingleArticleView article={article} />
    </PageFrame>;
}
