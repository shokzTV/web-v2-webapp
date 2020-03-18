import { ReactElement, useMemo } from "react";
import Header from "../../Header";
import { Article } from '../../../api/@types/Article';
import LoadingImage from "../../block/ImageLoader";
import CKEditorContent from "../../CKEditorContent";
import Link from "next/link";
import Divider from "../../Divider";
import TextLoader from "../../TextLoader";
import Truncate from "react-truncate";

export default function FeaturedArticles({featured}: {featured: Partial<Article[]>}): ReactElement {
    const lastArticle = useMemo<Partial<Article>>(() => featured && featured.slice(-1)[0], [featured]);
    const previousArticles = useMemo<Partial<Article>[]>(() => featured ? featured.slice(0, 3).reverse() : [{id:0},{id:0},{id:0}], [featured]);

    return <>
        <Header title={'NEUE ARTIKEL'} link={'ALLE ARTIKEL ANZEIGEN'} linkTarget={'/artikel'} topHeader />

        <Link href={'/artikel/[slug]'} as={'/artikel/' + (lastArticle && lastArticle.slug)}>
            <div className={'lastArticleRow'}>
                <div className={'lastArticleCol lastArticleCover'}>
                    <div className={'articleCover'}>
                        <LoadingImage src={lastArticle && lastArticle.cover} 
                                    webp={lastArticle && lastArticle.coverWEBP} 
                                    jp2={lastArticle && lastArticle.coverJP2} />
                    </div>
                </div>
                <div className={'lastArticleCol'}>
                    <h1 className={'lastArticleHeader'}>{lastArticle ? lastArticle.title : <TextLoader rows={2} type={'h1'} />}</h1>
                    <CKEditorContent text={lastArticle && lastArticle.body ? lastArticle.body : '<p></p>'} rows={5} />

                    {!lastArticle && <TextLoader rows={5} />}
                </div>
            </div>
        </Link>
        
        <Divider />

        <div className={'lastArticleRow pastArticleRow'}>
            {previousArticles.map((article, index) => <Link href={'/artikel/[slug]'} as={'/artikel/' + article.slug} key={article.id + '-' + index}>
                <div className={'prevArticleCol'}>
                    <h3 className={'pastArticleHeader'}>{article.title ? <span className={'header'}><Truncate lines={2}>{article.title}</Truncate></span> : <TextLoader rows={2} type={'h3'} />}</h3>
                    <div className={'articleCover'}>
                        <LoadingImage src={article.cover} webp={article.coverWEBP} jp2={article.coverJP2} />
                    </div>
                </div>
            </Link>)}
        </div>

        <style jsx>{`
            .lastArticleRow {
                display: flex;
                margin: -20px;
                align-items: center;
                cursor: pointer;
            }

            .pastArticleRow {
                justify-content: space-between;
            }

            .lastArticleCol {
                width: 50%;
                padding: 20px;
            }

            .lastArticleCover {
                width: 552px;
            }

            .prevArticleCol {
                width: 33%;
                padding: 20px;
            }

            .articleCover {
                position: relative;
                padding-bottom: 56.2%;
            }

            .lastArticleHeader {
                margin-bottom: 20px;
            }

            .pastArticleHeader {
                height: 3em;
                margin-bottom: .5em;
                line-height: 1.4;
                display: flex;
            }

            .pastArticleHeader .header {
                align-self: flex-end;
            }

            @media only screen and (max-width: 768px) { 
                .lastArticleRow {
                    margin: 0;
                    flex-direction: column;
                    align-items: center;
                }

                .lastArticleCol {
                    width: 100%;
                }

                .lastArticleCol:first-child {
                    max-width: 512px;
                    width: 100%;
                }

                .prevArticleCol {
                    width: 50%;
                }

                .pastArticleRow {
                    justify-content: space-around;
                    flex-direction: row;
                    flex-wrap: wrap;
                }
            } 
            @media only screen and (max-width: 425px) { 
                .prevArticleCol, .lastArticleCol {
                    width: 100%;
                    padding: 5px;
                }
            }
        `}</style>

    </>;
}
