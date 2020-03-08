import { Article } from "../../../api/@types/Article";
import { ReactElement } from "react";
import CKEditorContent from "../../CKEditorContent";
import LoadingImage from "../../block/ImageLoader";
import Author from "./SingleArticleView/Author";
import Tags from "./SingleArticleView/Tags";

export default function SingleArticleView({article}: {article: Article | null}): ReactElement {
    return <>
        <h1>{article && article.title}</h1>

        <div className={'articleContent'}>
            <div className={'articleCoverWrapper'}>
                <div className={'articleCover'}>
                    <LoadingImage src={article && article.cover} webp={article && article.coverWEBP} jp2={article && article.coverJP2} />
                </div>
            </div>

            <Author article={article} />
            <Tags article={article} />
                                
            {article && <CKEditorContent text={article.body} />}
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
        `}</style>
    </>;
}