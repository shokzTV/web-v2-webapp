import { ReactElement } from "react";
import { Tag } from "../../../../api/@types/Tag";
import LoadingImage from "../../../block/ImageLoader";

export default function Entry({tag}: {tag: Tag | null}): ReactElement {
    return <div className={'tagEntry'}>
        <LoadingImage src={tag && tag.image} webp={tag && tag.imageWEBP} jp2={tag && tag.imageJP2} />

        <div className={'tagDescription'}>
            <h3>{tag ? tag.name : <>&nbsp;</>}</h3>
            <div className={'desc'}>{tag && tag.description}</div>
        </div>

        <style jsx>{`
            .tagEntry {
                position: relative;
                padding-bottom: 56.2%;
            }

            .tagDescription {
                position: absolute;
                width: 100%;
                bottom: 0;
                background-color: rgba(0, 0, 0, 0.7);
                z-index: 3;
                padding: 12px 15px;
                border-radius: 0 0 4px 4px;
            }

            h3 {
                color: #FFF;
                font-size: 24px;
            }

            .desc {
                color: #FFF;
                font-size: 18px;
            }
        `}</style>
    </div>
}