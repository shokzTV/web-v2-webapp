import { ReactElement } from "react";
import { Event } from "../../../api/@types/Event";
import LoadingImage from "../../block/ImageLoader";
import EventDetails from "./SingleEventView/EventDetails";
import EventLinks from "./SingleEventView/EventLinks";
import EventDescription from "./SingleEventView/EventDescription";
import EventDisclaimer from "./SingleEventView/EventDisclaimer";

export default function SingleEventView({event}: {event: Event | null}): ReactElement {
    const tag = event && event.tags[0];
    
    return <>
        <h1>{event && event.name}</h1>

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

        `}</style>
    </>;
}