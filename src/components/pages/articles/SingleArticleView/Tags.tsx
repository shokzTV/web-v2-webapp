import { Article } from "../../../../api/@types/Article";
import { ReactElement } from "react";

export default function Tags({article}: {article: Article | null }): ReactElement {
    const tags = article ? article.tags : [];

    return <>
        <div className={'tagList'}>
            <div className={'caption'}><b>Artikelkategorien:</b>&nbsp;&nbsp;</div>
            {tags.map((tag) => {
                return <div className={'tag'} key={tag.id}>{tag.name}&nbsp;&nbsp;</div>;
            })}
        </div>

        <style jsx>{`
            .tagList {
                display: flex;
                flex-direction: row;
                flex-wrap: wrap;
                margin-top: 10px;
                border-bottom: 1px solid #DDD;
                margin-bottom: 10px;
                padding-bottom: 10px;
            }
        `}</style>
    </>;
}