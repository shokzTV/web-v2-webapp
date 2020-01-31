import { ReactElement, useMemo } from "react";
import { Row, Col } from "antd";
import Title from "antd/lib/typography/Title";
import Paragraph from "antd/lib/typography/Paragraph";
import {resolve} from 'styled-jsx/css';
import classnames from 'classnames';
import Header from "./../Header";
import Divider from "./../Divider";
import {Parser} from 'html-to-react'; 
import { Skeleton } from 'antd';
import { useArticleList } from "./../../hooks/articlesListt";

//#region <styles>
const {className, styles} = resolve`
    .lastNewsEntries {
        padding: 10px 20px;
    }
    .imageWrapper {
        position: relative;
        padding-bottom: 56.2%;
    }

    .imageWrapper img {
        position: absolute;
        object-fit: cover;
        width: 100%;
        height: 100%;
    }

    .content {
        line-height: 200%;
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

export default function LastNewsEntries(): ReactElement {
    const articles = useArticleList();
    const featuredArticle = articles.length > 0 && articles[0];
    const lastArticleRow = articles.length > 0 ? articles.slice(-3) : [];

    const featuredArticleBody = useMemo(() => {
        return featuredArticle ? (new Parser()).parse(featuredArticle.body) : '';
    }, [featuredArticle]);

    return <div className={classnames(className, 'lastNewsEntries')}>
        <Header title={'Neuigkeiten'} />
        <Row type={'flex'} align={'middle'}>
            <Col sm={11} xs={24}>
                <div className={classnames(className, 'imageWrapper')}>
                    {featuredArticle && <img className={className} src={`${process.env.API_URL}${featuredArticle.cover}`} />}
                    {!featuredArticle && <Skeleton className={classnames(className, 'imageSkeleton')} active={true} title={false} paragraph={{ rows: 1, width: '100%' }} />}
                </div>
            </Col>
            <Col offset={1} sm={12} xs={24}>
                 <>
                    <Title level={3}>
                        {featuredArticle ? featuredArticle.title : <Skeleton active={true} title={{width: '100%'}} paragraph={false} />}
                    </Title>

                    <Paragraph ellipsis={{rows: 5}} className={classnames(className, 'content')}>
                        {featuredArticleBody ? <div>{featuredArticleBody}</div> : <Skeleton active={true} title={false} paragraph={{rows: 5, width: '100%'}} />}
                    </Paragraph>
                </>
            </Col>
        </Row>

        <Divider />

        <Row type={'flex'} justify={'space-around'}>
            {lastArticleRow.map(({id, title, cover}) => <Col key={id} sm={7} xs={12}>
                <Title level={4} ellipsis={{rows: 2}}>{title}</Title>
                <div className={classnames(className, 'imageWrapper')}>
                    <img className={className} src={`${process.env.API_URL}${cover}`} />
                </div>
            </Col>)}
            {lastArticleRow.length === 0 && [1, 2, 3].map((article) => <Col key={article} sm={7} xs={12}>
                <Skeleton active={true} title={false} paragraph={{rows: 2, width: '100%'}} className={classnames(className, 'imageTitle')} />

                <div className={classnames(className, 'imageWrapper')}>
                    <Skeleton className={classnames(className, 'imageSkeleton')} active={true} title={false} paragraph={{ rows: 1, width: '100%' }} />
                </div>
            </Col>)}
        </Row>

        {styles}
    </div>;
}