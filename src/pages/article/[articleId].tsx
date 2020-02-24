import React, { ReactElement, useEffect } from 'react';
import PageFrame from '../../components/PageFrame';
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import { articleSelector } from '../../store/selectors/Articles';
import { loadArticles } from '../../store/Article';
import Title from 'antd/lib/typography/Title';
import { Skeleton, Avatar } from 'antd';
import { getImageUrl } from '../../hooks/image';
import { resolve } from 'styled-jsx/css';
import classNames from 'classnames';
import { authorsSelector } from '../../store/selectors/Authors';
import { Article } from '../../store/entities/Article';
import dayjs from 'dayjs';
import LoadingImage from '../../components/blocks/LoadingImage';
import { useShare } from '../../hooks/share';
import CKEditorContent from '../../components/CKEditorContent';
import Divider from '../../components/Divider';

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

    .imageTitle :global(li) {
        height: 18px;
    }

    .author {
        display: flex;
        align-items: center;
        margin-bottom: 20px;
    }    
    .name {
        margin-left: 20px;
    }

    .skeleton {
        width: auto;
    }

    .skeleton2 {
        width: 45%;
        margin-top: 20px;
    }

    .articleTitleSkeleton {
        margin-bottom: 0.5em;
    }
`;
//#endregion

function AuthorInfo({article}: {article: Article | null}): ReactElement {
    const authors = useSelector(authorsSelector);

    if(!article) {
        return <>
            <Skeleton className={classNames(className, 'skeleton')} 
                    avatar 
                    title={false} 
                    paragraph={{rows: 2, width: '75%'}}/>
            <Skeleton className={classNames(className, 'skeleton2')} title={false} paragraph={{rows: 4, width: '75%'}}/>
            <Skeleton className={classNames(className, 'skeleton2')} title={false} paragraph={{rows: 2, width: '75%'}}/>
        </>;    
    }

    const author = authors[article.author];

    return <div className={classNames(className, 'author')}>
        <Avatar shape={'circle'} src={getImageUrl(author.avatar)} size={'large'}/>
        <div className={classNames(className, 'name')}>
            <div>Autor: <a href={`https://www.twitch.tv/${author.name}`}>{author.name}</a></div>
            {author.title.length > 0 && <div><i>author.title}</i></div>}
            <div className={classNames(className, 'publishInfo')}>veröffentlicht am {dayjs.unix(article.created).format('DD.MM.YYYY')}</div>
        </div>

        {styles}
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
    //@ts-ignore
    const share = useShare(global.location && global.location.href, article && article.title);

    return <PageFrame showSelectedEvent>
        {article ? <Title level={3}>{article.title}</Title> : <Skeleton  className={classNames(className, 'articleTitleSkeleton')} title={{width: '80%'}} paragraph={false} />}

        <div className={classNames(className, 'articleContent')}>
            <div className={classNames(className, 'articleImageWrapper')}>
                <div className={classNames(className, 'imageWrapper')}>
                    <LoadingImage src={article && article.cover} />
                </div>
            </div>

            <div>
                <AuthorInfo article={article}/>
            </div>
                                
            {article && <CKEditorContent text={article.body} />}
            {!article && <>
                <Skeleton title={false} paragraph={{rows: 4, width: '75%'}}/>
                <Skeleton title={false} paragraph={{rows: 6, width: '75%'}}/>
                <Skeleton title={false} paragraph={{rows: 3, width: '75%'}}/>
                <Skeleton title={false} paragraph={{rows: 6, width: '75%'}}/>
                <Skeleton title={false} paragraph={{rows: 3, width: '75%'}}/>
            </>}
        </div>

        <Divider />



        {styles}
    </PageFrame>;
}