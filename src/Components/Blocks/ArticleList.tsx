import React, { ReactElement, useState, useMemo } from "react";
import Header from "../Header";
import { useSelector } from "react-redux";
import { availableArticlesSelector } from "../../store/selectors/Ui";
import { Pagination, Row, Col, Skeleton } from "antd";
import { useArticleList } from "../../hooks/articlesListt";
import classNames from "classnames";
import { resolve } from "styled-jsx/css";
import Paragraph from "antd/lib/typography/Paragraph";
import Title from "antd/lib/typography/Title";
import Divider from "../Divider";
import {Parser} from 'html-to-react'; 

//#region <styles>
const {className, styles} = resolve`

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


const pageSize = 4;
export default function ArticleList(): ReactElement {
    const totalCount = useSelector(availableArticlesSelector).length;
    const [page, setPage] = useState(1);
    const pageArticles = useArticleList(page - 1, pageSize);
    const preloadCount = useMemo(() => {
        if(pageArticles.length > 0) {
            return 0;
        }
        if(totalCount > 0 && page * pageSize > totalCount) {
            return totalCount % pageSize;
        }
        return pageSize;
    }, [page, pageArticles, totalCount]);

    return <>
        <Header title={'Artikel > Alle Artikel'} />
        <Divider />

        {pageArticles.map((article) => <React.Fragment key={article.id}>
            <Row type={'flex'} align={'middle'}>
                <Col sm={6} xs={24}>
                    <div className={classNames(className, 'imageWrapper')}>
                        <img className={className} src={`${process.env.API_URL}${article.cover}`} />
                    </div>
                </Col>
                <Col offset={1} sm={17} xs={24}>
                    <>
                        <Title level={3}>
                            {article.title}
                        </Title>

                        <Paragraph ellipsis={{rows: 2}} className={classNames(className, 'content')}>
                            <div>{(new Parser()).parse(article.body)}</div>
                        </Paragraph>
                    </>
                </Col>
            </Row>

            <Divider />    
        </React.Fragment>)}


        {[...Array(preloadCount).keys()].map((article) => <React.Fragment key={article}>
            <Row type={'flex'} align={'middle'}>
                <Col sm={6} xs={24}>
                    <div className={classNames(className, 'imageWrapper')}>
                        <Skeleton className={classNames(className, 'imageSkeleton')} active={true} title={false} paragraph={{ rows: 1, width: '100%' }} />
                    </div>
                </Col>
                <Col offset={1} sm={17} xs={24}>
                    <>
                        <Title level={3}>
                            <Skeleton active={true} title={{width: '100%'}} paragraph={false} />
                        </Title>

                        <Paragraph ellipsis={{rows: 2}} className={classNames(className, 'content')}>
                            <div><Skeleton active={true} title={false} paragraph={{rows: 2, width: '100%'}} /></div>
                        </Paragraph>
                    </>
                </Col>
            </Row>
            <Divider />    
        </React.Fragment>)}
        
        <Pagination current={page} onChange={(page) => setPage(page)} total={totalCount} pageSize={pageSize} />

        {styles}
    </>;
}