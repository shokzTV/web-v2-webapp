import { Tag } from "../../../api/@types/Tag";
import { ReactElement } from "react";
import Header from "../../Header";
import TagRelations from "./SingleTagView/TagRelations";

export default function SingleTagView({tag}: {tag: Tag}): ReactElement {
    return <>
        <Header title={'Kategorie: ' + (tag && tag.name)} link={'Alle Kategorien anzeigen'} linkTarget={'/tags'} topHeader/>

        <TagRelations tagId={tag && tag.id} />

        <style jsx>{`
            .tagDetails {
                display: flex;
                margin: -20px;
            }

            .details {
                padding-top: 50px;
            }

            .coverColumn {
                padding: 20px;
                width: 512px;
            }

            .tagCover {
                position: relative;
                padding-bottom: 56.2%;
            }

            h1 {
                margin-bottom: 25px;
            }

            .detailsColumn {
                flex: 1;
                display: flex;
                padding: 20px;
                margin: -20px;
            }
            
            @media only screen and (max-width: 768px) { 
                h1 {
                    text-align: center;
                }

                .details {
                    padding-top: 0;
                    width: 100%;
                    text-align: center;
                }

                .coverColumn {
                    max-width: 512px;
                    width: 100%;
                    margin: 0 auto;
                }

                .tagDetails {
                    margin: 0;
                    flex-direction: column;
                }

                .detailsColumn {
                    margin: 0;
                }

            }

            @media only screen and (max-width: 425px) { 
                .detailsColumn {
                    flex-direction: column;
                }
            }
        `}</style>
    </>;
}