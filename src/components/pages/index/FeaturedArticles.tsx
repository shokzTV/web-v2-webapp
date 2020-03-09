import { ReactElement, useState, useEffect, useMemo } from "react";
import Header from "../../Header";
import { Article } from '../../../api/@types/Article';
import { fetchFeaturedArticle } from "../../../api/article";
import LoadingImage from "../../block/ImageLoader";
import CKEditorContent from "../../CKEditorContent";
import Link from "next/link";
import Divider from "../../Divider";
import TextLoader from "../../TextLoader";

export default function FeaturedArticles(): ReactElement {
    const [featured, setFeatured] = useState<Partial<Article[]> | null>(null);

    useEffect(() => {
        const loadEvent = async () => setFeatured(await fetchFeaturedArticle());
        loadEvent();
    }, []);
    
    const lastArticle = useMemo<Partial<Article>>(() => featured && featured.slice(-1)[0], [featured]);
    const previousArticles = useMemo<Partial<Article>[]>(() => featured ? featured.slice(0, 3).reverse() : [{id:0},{id:0},{id:0}], [featured]);

    return <>
        <Header title={'NEUE ARTIKEL'} link={'ALLE ARTIKEL ANZEIGEN'} linkTarget={'/articles'} />

        <Link href={'/article/[articleId]'} as={'/article/' + (lastArticle && lastArticle.id)}>
            <div className={'lastArticleRow'}>
                <div className={'lastArticleCol'}>
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
            {previousArticles.map((article, index) => <Link href={'/article/[articleId]'} as={'/article/' + article.id} key={article.id + '-' + index}>
                <div className={'prevArticleCol'}>
                    <h3 className={'pastArticleHeader'}>{article.title ? article.title : <TextLoader rows={2} type={'h3'} />}</h3>
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

            .lastArticleCol {
                width: 50%;
                padding: 20px;
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
