import { Article } from "../../../../api/@types/Article";
import { ReactElement } from "react";
import Link from "next/link";
import { COLORS } from "../../../../style/colors";

export default function Tags({article}: {article: Article | null }): ReactElement {
    const tags = article ? article.tags : [];

    return <>
        <div className={'tagList'}>
            <div className={'caption'}><b>Artikelkategorien:</b>&nbsp;&nbsp;</div>
            {tags.map((tag) => {
                return <Link href={'/kategorie/[tagId]'} as={`/kategorie/${tag.id}`} key={tag.id}><div className={'tag'}>{tag.name}&nbsp;&nbsp;</div></Link>;
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

            .tag {
                color: ${COLORS.PRIMARY};
                cursor: pointer;
            }
        `}</style>
    </>;
}