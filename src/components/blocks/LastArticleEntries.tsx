import { ReactElement, useMemo } from "react";
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Skeleton from 'antd/lib/skeleton';
import Title from "antd/lib/typography/Title";
import Paragraph from "antd/lib/typography/Paragraph";
import {resolve} from 'styled-jsx/css';
import classnames from 'classnames';
import Header from "../Header";
import Divider from "../Divider";
import { useArticleList } from "../../hooks/articlesList";
import Link from "next/link";
import { articlesSelector } from "../../store/selectors/Articles";
import { useSelector } from "react-redux";
import LoadingImage from "./LoadingImage";
import CKEditorContent from "../CKEditorContent";
import { COLORS } from "../../style/colors";

//#region <styles>
const {className, styles} = resolve`
    .imageWrapper {
        position: relative;
        padding-bottom: 56.2%;
    }

    .content {
        line-height: 200%;
        font-size: 18px;
        position: relative;
    }
    
    .readMore {
        position: absolute;
        bottom: 0;
        right: 0;
        background: #FFF;
        padding: 0 0 0 0px;
        color: ${COLORS.PRIMARY};
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

    return <div className={classnames(className, 'LastArticleEntries')}>
        <Header title={'Neue Artikel'} link={'Alle Artikel anzeigen'} />
        <Row align={'middle'} gutter={[30, 30]}>
            <Col sm={11} xs={24}>
                <div className={classnames(className, 'imageWrapper')}>
                    <LoadingImage src={featuredArticle && featuredArticle.cover} webp={featuredArticle && featuredArticle.coverWEBP} jp2={featuredArticle && featuredArticle.coverJP2} />
                </div>
            </Col>
            <Col sm={13} xs={24}>
                 <div>
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

                        <div className={classnames(className, 'readMore')}>
                            <Link href={'/article/[articleId]'} as={`/article/${featuredArticle.id}`}>
                                <a>...weiterlesen</a>
                            </Link>
                        </div>
                    </Paragraph>}

                    {featuredArticleBody.length === 0 && <Skeleton active={true} title={false} paragraph={{rows: 5}} />}
                </div>
            </Col>
        </Row>

        <Divider />

        <Row gutter={[30, 30]}>
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
                        <div className={classnames(className, 'imageWrapper')}>
                            <LoadingImage src={article && article.cover} webp={article && article.coverWEBP} jp2={article && article.coverJP2} />
                        </div>
                    </div>
                </Col>
            })}
        </Row>

        {styles}
    </div>;
}