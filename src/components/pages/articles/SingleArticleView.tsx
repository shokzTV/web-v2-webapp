import { Article } from "../../../api/@types/Article";
import { ReactElement } from "react";
import CKEditorContent from "../../CKEditorContent";
import LoadingImage, { toAlt } from "../../block/ImageLoader";
import Author from "./SingleArticleView/Author";
import Tags from "./SingleArticleView/Tags";
import TextLoader from "../../TextLoader";
import Header from "../../Header";

export default function SingleArticleView({article}: {article: Article | null}): ReactElement {
    return <>
        <Header title={'Artikel'} link={'Alle Artikel anzeigen'} linkTarget={'/artikel'} topHeader/>

        <h1>{article ? article.title : <TextLoader rows={1} type={'h1'} /> }</h1>

        <div className={'articleContent'}>
            <div className={'articleCoverWrapper'}>
                <div className={'articleCover'}>
                    <LoadingImage src={article && article.cover} webp={article && article.coverWEBP} jp2={article && article.coverJP2} altTag={toAlt((article && article.title) + ' cover')}/>
                </div>
            </div>

            <Author article={article} />
            <Tags article={article} />
                                
            {article && <CKEditorContent text={article.body} />}

            {!article && <TextLoader rows={20} type={'ckeditor'} />}
        </div>

        <style jsx>{`   
            h1 {
                margin-bottom: 25px;
            }
            .articleCoverWrapper {
                margin: 0 20px 10px 0;
                width: 512px;
                float: left;
            }
            .articleCover {
                position: relative;
                padding-bottom: 56.2%;
            }

            
            @media only screen and (max-width: 768px) {
                h1 {
                    text-align: center;
                }

                .articleCoverWrapper {
                    float: none;
                    margin: 0 auto;
                    max-width: 512px;
                    width: 100%;
                    margin-bottom: 20px;
                }
            }
            
            @media only screen and (max-width: 425px) {
            }
        `}</style>
    </>;
}