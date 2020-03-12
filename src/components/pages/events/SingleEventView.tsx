import { ReactElement } from "react";
import { Event } from "../../../api/@types/Event";
import LoadingImage from "../../block/ImageLoader";
import EventDetails from "./SingleEventView/EventDetails";
import EventLinks from "./SingleEventView/EventLinks";
import EventDescription from "./SingleEventView/EventDescription";
import EventDisclaimer from "./SingleEventView/EventDisclaimer";
import EventRelations from "./SingleEventView/EventRelations";
import TextLoader from "../../TextLoader";
import Header from "../../Header";

export default function SingleEventView({event}: {event: Event | null}): ReactElement {
    const tag = event && event.tags[0];
    
    return <>
        <Header title={'EVENTS'} link={'Alle events anzeigen'} linkTarget={'/events'} />

        <h1>{event ? event.name : <div style={{paddingBottom: '1px'}}><TextLoader type={'h1'} rows={1} /></div>}</h1>

        <div className={'eventDetails'}>
            <div className={'coverColumn'}>
                <div className={'eventCover'}>
                    <LoadingImage src={tag && tag.image} webp={tag && tag.imageWEBP} jp2={tag && tag.imageJP2} />
                </div>
            </div>

            <div className={'detailsColumn'}>
                <div className={'details'}>
                    <EventDetails event={event} />
                </div>
                <div className={'eventLinks'}>
                    <EventLinks event={event} />
                </div>
            </div>
        </div>

        <EventDescription event={event} />

        <EventRelations event={event} />

        <EventDisclaimer event={event} />

        <style jsx>{`
            .eventDetails {
                display: flex;
                margin: -20px;
            }

            .coverColumn {
                padding: 20px;
                width: 512px;
            }

            .eventCover {
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

            .details {
                padding: 20px;
                width: 66%;
            }

            .eventLinks {
                padding: 20px;
            }
            
            @media only screen and (max-width: 768px) { 
                h1 {
                    text-align: center;
                }

                .coverColumn {
                    max-width: 512px;
                    width: 100%;
                }

                .eventDetails {
                    margin: 0;
                    flex-direction: column;
                }

                .coverColumn {
                    margin: 0 auto;
                }

                .detailsColumn {
                    margin: 0;
                }

            }

            @media only screen and (max-width: 425px) { 
                .detailsColumn {
                    flex-direction: column;
                }
                .details, .eventLinks {
                    width: 100%;
                    padding: 5px;
                }
                .eventLinks {
                    margin-top: 20px;
                }
            }
        `}</style>
    </>;
}