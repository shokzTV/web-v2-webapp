import { ReactElement, useState, useEffect } from "react";
import Header from "../../Header";
import { Tag } from "../../../api/@types/Tag";
import { fetchLatestTags } from "../../../api/tag";
import Entry from "./RecentTags/Entry";

export default function RecentTags(): ReactElement {
    const [tags, setTags] = useState<Tag[]>(Array(8).fill(undefined));

    useEffect(() => {
        const loadTags = async () => setTags(await fetchLatestTags());
        loadTags();
    }, []);

    return <>
        <Header title={'ARTIKELKATEGORIEN'}/>

        <div className={'tagGrid'}>
            {tags.map((tag, index) => <div key={(tag && tag.id) + '-' + index} className={'column'}><Entry tag={tag} /></div>)}
        </div>

        <style jsx>{`
            .tagGrid {
                display: flex;
                margin: -20px;
                flex-wrap: wrap;
                justify-content: space-between;
            }

            .column {
                width: 50%;
                padding: 20px;
                max-width: 552px;
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