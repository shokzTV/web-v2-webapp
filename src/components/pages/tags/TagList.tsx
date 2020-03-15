import { ReactElement, useState, useMemo } from "react";
import { Tag } from "../../../api/@types/Tag";
import Header from "../../Header";
import Pagination from "../../block/Pagination";
import Entry from "../articles/RecentTags/Entry";

const pageSize = 8;
export default function TagList({allTags}: {allTags: Tag[]}): ReactElement {
    const [page, setPage] = useState(1);

    const total = useMemo(
        () => allTags.length > 0 ? (allTags.length % pageSize === 0 ? (allTags.length / pageSize) : Math.round((allTags.length / pageSize) + .5)) : 2, 
        [allTags, pageSize]
    );

    const pageTags = useMemo(() => allTags.slice((page - 1) * pageSize, page * pageSize), [allTags, page]);

    return <>
        <Header title={'Alle Tags'} topHeader/>

        <Pagination  page={page} total={total} setPage={setPage} noTopSpacing />
        <div className={'tagGrid'}>
            {pageTags.map((tag, index) => <div key={(tag && tag.id) + '-' + index} className={'column'}><Entry tag={tag} /></div>)}
        </div>
        <Pagination  page={page} total={total} setPage={setPage} />

        <style jsx>{`
            .tagGrid {
                display: flex;
                margin: -20px;
                flex-wrap: wrap;
                justify-content: space-around;
            }

            .column {
                max-width: 552px;
                width: 50%;
                padding: 20px;
            }

            @media only screen and (max-width: 768px) {
                .tagGrid {
                    margin: 0;
                }
            }

            @media only screen and (max-width: 425px) {
                .tagGrid {
                    flex-direction: column;
                }
                .column {
                    padding: 5px;
                    width: 100%;
                }                    
            }
        `}</style>
    </>;
}