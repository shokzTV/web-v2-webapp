import { ReactElement, useMemo } from "react";
import { Row, Col } from "antd";
import Title from "antd/lib/typography/Title";
import Paragraph from "antd/lib/typography/Paragraph";
import {resolve} from 'styled-jsx/css';
import classnames from 'classnames';
import Header from "../Header";
import Divider from "../Divider";
import {Parser} from 'html-to-react'; 
import { Skeleton } from 'antd';
import { useArticleList } from "../../hooks/articlesList";
import Link from "next/link";
import { motion } from 'framer-motion';
import { articlesSelector } from "../../store/selectors/Articles";
import { useSelector } from "react-redux";
import LoadingImage from "./LoadingImage";

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
`;
//#endregion

export default function LastArticleEntries(): ReactElement {
    const articleIds = useArticleList();
    const articles = useSelector(articlesSelector);
    const featuredArticle = articleIds.length > 0 && articles[articleIds[0]];
    const lastArticleRow = articleIds.length > 0 ? articleIds.slice(-3) : [];

    const featuredArticleBody = useMemo(() => {
        return featuredArticle ? (new Parser()).parse(featuredArticle.body) : '';
    }, [featuredArticle]);

    return <motion.div initial="exit" animate="enter" exit="exit" className={classnames(className, 'LastArticleEntries')}>
        <Header title={'Neue Artikel'} link={'Alle Artikel anzeigen'} />
        <Row type={'flex'} align={'middle'}>
            <Col sm={11} xs={24}>
                <motion.div className={classnames(className, 'imageWrapper')}>
                    <LoadingImage src={featuredArticle && featuredArticle.cover} />
                </motion.div>
            </Col>
            <Col offset={1} sm={12} xs={24}>
                 <motion.div>
                    <Title level={3}>
                        {featuredArticle 
                        ? <Link key={`/article/${featuredArticle.id}`} href={`/article/${featuredArticle.id}`}>{featuredArticle.title}</Link>
                        : <Skeleton active={true} title={{width: '100%'}} paragraph={false} />}
                    </Title>

                    <Paragraph ellipsis={{rows: 5}} className={classnames(className, 'content')}>
                        {featuredArticleBody ? <div>{featuredArticleBody}</div> : <Skeleton active={true} title={false} paragraph={{rows: 5, width: '100%'}} />}
                    </Paragraph>
                </motion.div>
            </Col>
        </Row>

        <Divider />

        <Row type={'flex'} justify={'space-around'}>
            {lastArticleRow.map((articleId) => {
                const article = articles[articleId];
                return <Col key={articleId} sm={7} xs={12}>
                    <div>
                        <Title level={4} ellipsis={{rows: 2}}>
                            <Link href={`/article/${articleId}`}>
                                <a>
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
}