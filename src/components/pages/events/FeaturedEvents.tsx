import { ReactElement } from "react";
import Header from "../../Header";
import { loadFeaturedEvents } from "../../../hooks/featuredEvents";
import Entry from "./FeaturedEvents/Entry";

export default function FeaturedEvents(): ReactElement {
    const list = loadFeaturedEvents();

    return <>
        <Header title={'EVENTS'} link={'VORHERIGE EVENTS ANZEIGEN'} />

        <div className={'eventsGrid'}>
            {list.map((event, index) => <div key={event.id + '-' + index} className={'column'}><Entry event={event} /></div>)}
        </div>

        <style jsx>{`
            .eventsGrid {
                display: flex;
                margin: -20px;
                flex-wrap: wrap;
            }

            .column {
                width: 50%;
                padding: 20px;
            }
        `}</style>
    </>;
}