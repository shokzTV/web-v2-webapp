import { ReactElement } from "react";
import { Article } from "../../../../api/@types/Article";
import LoadingImage from "../../../block/ImageLoader";
import Divider from "../../../Divider";
import Link from "next/link";
import dayjs from "dayjs";
import { formatDate } from "../../../../hooks/eventDate";
import CKEditorContent from "../../../CKEditorContent";


export default function Row({article, noDivider = false}: {article: Article | null; noDivider?: boolean}): ReactElement {

    return <>
        <Link href={'/article/[articleId]'} as={'/article/' + (article && article.id)}>
            <div className={'articleRow'}>
                <div className={'coverColumn'}>
                    <div className={'articleCover'}>
                        <LoadingImage src={article && article.cover} webp={article && article.coverWEBP} jp2={article && article.coverJP2} />
                    </div>
                </div>

                <div className={'detailsColumn'}>
                    <h2>{article ? article.title : <>&nbsp;</>}</h2>
                    <div className={'articleDetails'}>
                        veröffentlicht am {formatDate(article && article.created)} von {article && article.author.name}
                    </div>

                    <CKEditorContent text={article && article.body} rows={2}/>
                </div>
            </div>
        </Link>

        {!noDivider && <Divider />}

        <style jsx>{`
            .articleRow {
                display: flex;
                align-items: center;
                margin: -20px;
                cursor: pointer;
            }     

            .coverColumn {
                width: 33%;
                padding: 20px;
            }

            .detailsColumn {
                width: 66%;
                padding: 20px;
            }

            .articleCover {
                position: relative;
                padding-bottom: 56.2%;
            }

            .articleDetails {
                font-size: 16px;
                font-weight: normal;
                margin-bottom: 20px;
            }
        `}</style>
    </>;
}