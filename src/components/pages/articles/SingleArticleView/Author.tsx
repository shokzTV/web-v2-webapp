import { Article } from "../../../../api/@types/Article";
import { ReactElement } from "react";
import { formatDate } from "../../../../hooks/eventDate";
import LoadingImage from "../../../block/ImageLoader";
import { COLORS } from "../../../../style/colors";
import TextLoader from "../../../TextLoader";

export default function Author({article}: {article: Article | null}): ReactElement {
    const author = article && article.author;

    return <div className={'author'}>
        <div className={'userAvatar'}>
            <LoadingImage src={author && author.avatar}
                          webp={author && author.avatarWEBP}
                          jp2={author && author.avatarJP2} />
        </div>
        <div className={'name'}>
            <div className={'userName'}>
                Autor:&nbsp;<a className={'link'} href={`https://www.twitch.tv/${author && author.name}`} target={'_blank'} rel={'noreferrer'}>{author ? author.name: <TextLoader rows={1} />}</a>
            </div>
            {author && author.title.length > 0 && <div className={'userTitle'}><i>{author.title}</i></div>}
            <div className={'publishInfo'}>veröffentlicht am {formatDate(article && article.created)}</div>
        </div>

        <style jsx>{`
            .author {
                display: flex;
                align-items: center;
                margin-bottom: 20px;
            }    

            .userAvatar {
                position: relative;
                height: 70px;
                width: 70px;
                border-radius: 35px;
                overflow: hidden;
            }

            .name {
                margin-left: 20px;
            }

            .userName {
                font-size: 18px;
                display: flex;
            }

            .userTitle {
                font-size: 16px;
            }

            .publishInfo {
                font-size: 14px;
            }

            .link {
                text-decoration: none;
                color: ${COLORS.PRIMARY};
            }
        `}</style>
    </div>;
}