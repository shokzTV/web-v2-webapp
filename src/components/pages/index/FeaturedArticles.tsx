import { ReactElement, useState, useEffect, useMemo } from "react";
import Header from "../../Header";
import { Article } from '../../../api/@types/Article';
import { fetchFeaturedArticle } from "../../../api/article";
import LoadingImage from "../../block/ImageLoader";
import CKEditorContent from "../../CKEditorContent";
import Link from "next/link";
import Divider from "../../Divider";

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
                    <h1 className={'lastArticleHeader'}>{lastArticle ? lastArticle.title : <>&nbsp;</>}</h1>
                    <CKEditorContent text={lastArticle && lastArticle.body ? lastArticle.body : '<p></p>'} rows={5} />
                </div>
            </div>
        </Link>

        <Divider />

        <div className={'lastArticleRow'}>
            {previousArticles.map((article) => <Link href={'/article/[articleId]'} as={'/article/' + article.id}>
                <div className={'prevArticleCol'}>
                    <h3 className={'pastArticleHeader'}>{article.title}</h3>
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
        `}</style>

    </>;
}
