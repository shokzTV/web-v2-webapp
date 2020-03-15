import { ReactElement } from "react";
import { Article } from "../../../../api/@types/Article";
import LoadingImage from "../../../block/ImageLoader";
import Divider from "../../../Divider";
import Link from "next/link";
import { formatDate } from "../../../../hooks/eventDate";
import CKEditorContent from "../../../CKEditorContent";
import TextLoader from "../../../TextLoader";


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
                    <h2>{article ? article.title : <TextLoader rows={1} type={'h2'} />}</h2>
                    <div className={'articleDetails'}>
                        veröffentlicht am {formatDate(article && article.created)} von {article && article.author.name}
                    </div>

                    <CKEditorContent text={article ? article.body : '<p></p>'} rows={2}/>
                    {!article && <TextLoader rows={2} type={'ckeditor'} />}
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

            h2 {
                margin-bottom: 5px;
            }
            
            @media only screen and (max-width: 768px) {
                .articleRow {
                    margin: 0;
                }
            }
            
            @media only screen and (max-width: 425px) {
                .articleRow {
                    flex-direction: column;
                    align-items: center;
                }
                .coverColumn {
                    max-width: 512px;
                    width: 100%;
                    padding: 5px;
                }

                .detailsColumn {
                    width: 100%;
                    padding: 5px;
                }
            }
        `}</style>
    </>;
}