import { ReactElement, useMemo } from "react";
import { Row, Col } from "antd";
import Title from "antd/lib/typography/Title";
import Paragraph from "antd/lib/typography/Paragraph";
import {resolve} from 'styled-jsx/css';
import classnames from 'classnames';
import Header from "../Header";
import Divider from "../Divider";
import { Skeleton } from 'antd';
import { useArticleList } from "../../hooks/articlesList";
import Link from "next/link";
import { motion } from 'framer-motion';
import { articlesSelector } from "../../store/selectors/Articles";
import { useSelector } from "react-redux";
import LoadingImage from "./LoadingImage";
import CKEditorContent from "../CKEditorContent";

//#region <styles>
const {className, styles} = resolve`
    .imageWrapper {
        position: relative;
        padding-bottom: 56.2%;
    }

    .content {
        line-height: 200%;
        font-size: 18px;
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

    .articleTitle {
        height: 3em;
    }
`;
//#endregion

export default function LastArticleEntries(): ReactElement {
    const articleIds = useArticleList();
    const articles = useSelector(articlesSelector);
    const featuredArticle = articleIds.length > 0 && articles[articleIds[0]];
    const lastArticleRow = articleIds.length > 0 ? articleIds.slice(-3) : [];
    const featuredArticleBody = useMemo(() => featuredArticle ? featuredArticle.body : '', [featuredArticle]);

    return <motion.div initial="exit" animate="enter" exit="exit" className={classnames(className, 'LastArticleEntries')}>
        <Header title={'Neue Artikel'} link={'Alle Artikel anzeigen'} />
        <Row type={'flex'} align={'middle'} gutter={[30, 30]}>
            <Col sm={11} xs={24}>
                <motion.div className={classnames(className, 'imageWrapper')}>
                    <LoadingImage src={featuredArticle && featuredArticle.cover} />
                </motion.div>
            </Col>
            <Col sm={13} xs={24}>
                 <motion.div>
                    <Title level={2}>
                        {featuredArticle 
                        ? <Link href={'/article/[articleId]'} as={`/article/${featuredArticle.id}`}><a>{featuredArticle.title}</a></Link>
                        : <>
                            <Skeleton active={true} title={{width: '100%'}} paragraph={false} />
                            <Skeleton active={true} title={{width: '50%'}} paragraph={false} />
                        </>}
                    </Title>

                    {featuredArticleBody.length > 0 && <Paragraph ellipsis={{rows: 5}} className={classnames(className, 'content')}>
                        <div>
                            <CKEditorContent text={featuredArticleBody} />
                        </div>
                    </Paragraph>}

                    {featuredArticleBody.length === 0 && <Skeleton active={true} title={false} paragraph={{rows: 5}} />}
                </motion.div>
            </Col>
        </Row>

        <Divider />

        <Row type={'flex'} gutter={[30, 30]}>
            {lastArticleRow.map((articleId) => {
                const article = articles[articleId];
                return <Col key={articleId} sm={8} xs={24}>
                    <div>
                        <Title level={4} ellipsis={{rows: 2}} className={classnames(className, 'articleTitle')}>
                            <Link href={'/article/[articleId]'} as={`/article/${articleId}`}>
                                <a>
                                    {article ? article.title 
                                             : <Skeleton active={true} title={false} paragraph={{rows: 2, width: '100%'}} className={classnames(className, 'imageTitle')} />}
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
}