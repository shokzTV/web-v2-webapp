import { ReactElement, useMemo, useEffect } from "react";
import { Row, Col } from "antd";
import Title from "antd/lib/typography/Title";
import {resolve} from 'styled-jsx/css';
import classnames from 'classnames';
import Header from "../Header";
import Divider from "../Divider";
import { Skeleton } from 'antd';
import Link from "next/link";
import { motion } from 'framer-motion';
import { articlesSelector } from "../../store/selectors/Articles";
import { useSelector, useDispatch } from "react-redux";
import LoadingImage from "./LoadingImage";
import { eventRelationsSelector } from "../../store/selectors/Ui";
import { loadArticles } from "../../store/Article";
import { COLORS } from "../../style/colors";

//#region <styles>
const {className, styles} = resolve`
    .imageWrapper {
        position: relative;
        padding-bottom: 56.2%;
    }

    .content {
        line-height: 200%;
    }

    .imageTitle :global(ul) {
        padding-top: 6px;
        margin-bottom: 4px;
    }

    .imageTitle :global(li) {
        height: 18px;
        margin-left: 0;
    }

    .imageTitle :global(li + li) {
        margin-top: 10px;
    }

    .titleSkeleton :global(.ant-skeleton-title) {
        margin-top: 1px;
        margin-bottom: 15px;
    }

    .link {
        color: ${COLORS.WEAK}!important;
    }
`;
//#endregion

export default function EventArticles({eventId}: {eventId: number}): ReactElement | null{
    const eventRelation = useSelector(eventRelationsSelector)[eventId];
    const articles = useSelector(articlesSelector);
    const articleIds = useMemo(() => eventRelation ? eventRelation.articles.slice(-3) : [], [eventRelation]);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(loadArticles(articleIds));
    }, [articleIds]);

    if(eventRelation && articleIds.length > 0) {
        return <motion.div initial="exit" animate="enter" exit="exit">
            <Divider />
            <Header title={'Artikel zum Event'} link={'Alle Artikel zum Event'} />
            <br />
            <Row type={'flex'} gutter={[30, 30]}>
                {articleIds.map((articleId) => {
                    const article = articles[articleId];
                    return <Col key={articleId} sm={8} xs={12}>
                        <div className={classnames(className, 'article')}>
                            <Title level={4} ellipsis={{rows: 2}}>
                                <Link href={'/article/[articleId]'} as={`/article/${articleId}`}>
                                    <a className={classnames(className, 'link')}>
                                        {article ? article.title : <Skeleton active={true} title={false} paragraph={{rows: 2, width: '100%'}} className={classnames(className, 'imageTitle')} />}
                                    </a>
                                </Link>
                            </Title>
                            <motion.div className={classnames(className, 'imageWrapper')}>
                                <LoadingImage src={article && article.cover} />
                            </motion.div>
                        </div>
                    </Col>
                })}
            </Row>

            {styles}
        </motion.div>;
    } else if(!eventRelation) {
        return <>
            <Divider />
            <Skeleton paragraph={false} className={classnames(className, 'titleSkeleton')} title={{width: '20%'}} />

            <Row type={'flex'} gutter={[30, 30]}>
                {[0,0,0].map((articleId, index) => {
                    return <Col key={`${articleId}-${index}`} sm={7} xs={12}>
                        <div>
                            <Title level={4} ellipsis={{rows: 2}}>
                                <Link href={'/article/[articleId]'} as={`/article/${articleId}`}>
                                    <a>
                                        <Skeleton active={true} title={false} paragraph={{rows: 2, width: '100%'}} className={classnames(className, 'imageTitle')} />
                                    </a>
                                </Link>
                            </Title>
                        </div>
                        <div className={classnames(className, 'imageWrapper')}>
                            <LoadingImage src={undefined} />
                        </div>
                    </Col>
                })}
            </Row>
            {styles}
        </>;
    }

    return null;
}