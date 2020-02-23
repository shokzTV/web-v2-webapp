import React, { ReactElement, useEffect } from 'react';
import PageFrame from '../../components/PageFrame';
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import { articleSelector } from '../../store/selectors/Articles';
import { loadArticles } from '../../store/Article';
import Title from 'antd/lib/typography/Title';
import { Skeleton, Row, Col, Avatar } from 'antd';
import { getImageUrl } from '../../hooks/image';
import { resolve } from 'styled-jsx/css';
import classNames from 'classnames';
import {Parser} from 'html-to-react'; 
import { authorsSelector } from '../../store/selectors/Authors';
import { Article } from '../../store/entities/Article';

//#region <styles>
const {className, styles} = resolve`
    .articleImageWrapper {
        margin: 0 20px 20px 0;
        width: 512px;
        float: left;
    }
    .imageWrapper {
        position: relative;
        padding-bottom: 56.2%;
        overflow: hidden;
    }

    .imageWrapper img {
        position: absolute;
        object-fit: cover;
        width: 100%;
        height: 100%;
    }

    .imageSkeleton {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        display: block;
    }
    .imageSkeleton :global(.ant-skeleton-content) {
        height: 100%;
        display: block;
    }

    .imageSkeleton :global(.ant-skeleton-paragraph) {
        height: 100%;
        margin: 0;
    }
    .imageSkeleton :global(li) {
        height: 100%;
    }

    .imageTitle :global(li) {
        height: 18px;
    }
`;
//#endregion

function AuthorInfo({article}: {article: Article | null}): ReactElement {
    const authors = useSelector(authorsSelector);

    if(!article) {
        return <Skeleton avatar />
    }

    const author = authors[article.author];

    return <div className={'author'}>
        <Avatar shape={'circle'} src={getImageUrl(author.avatar)} size={'large'}/>
        <div className={'name'}>
            <div>Autor: <a href={`https://www.twitch.tv/${author.name}`}>{author.name}</a></div>
            <div>{author.title}</div>
        </div>

        <style jsx>{`
            .author {
                display: flex;
                align-items: center;
                margin-bottom: 20px;
            }    
            .name {
                margin-left: 20px;
            }
        `}</style>
    </div>;
}

export default function Home(): ReactElement {
    const router = useRouter();
    const dispatch = useDispatch();
    const articleId = +router.query.articleId;
    const selector = useSelector(articleSelector);

    useEffect(() => {
        articleId && dispatch(loadArticles([articleId]));
    }, [articleId]);

    const article = selector(articleId);

    return <PageFrame showSelectedEvent>
        {article ? <Title level={3}>{article.title}</Title> : <Skeleton title={{width: '80%'}} paragraph={false} />}

        <div className={classNames(className, 'articleContent')}>
            <div className={classNames(className, 'articleImageWrapper')}>
                <div className={classNames(className, 'imageWrapper')}>
                    {article ? <img className={className} src={getImageUrl(article.cover)}/> 
                            : <Skeleton className={classNames(className, 'imageSkeleton')} title={false} paragraph={{rows: 1, width: '100%'}} />}
                </div>
            </div>

            <div>
                <AuthorInfo article={article}/>
            </div>
                                
            {article ? <div>{(new Parser()).parse(article.body)}</div> : <Skeleton title={false} paragraph={{rows: 40}} />}
        </div>
        {styles}
    </PageFrame>;
}