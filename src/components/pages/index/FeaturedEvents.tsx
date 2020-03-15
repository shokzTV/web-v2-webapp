import { ReactElement } from "react";
import Header from "../../Header";
import { Event } from '../../../api/@types/Event';
import Row from "./FeaturedEvents/Row";

export default function FeaturedEvents({featured}: {featured: Partial<Event>[]}): ReactElement {
    return <>
        <Header title={'EVENTKALENDER'} link={'ALLE EVENTS ANZEIGEN'} linkTarget={'/events'} />
        
        {featured.map((event, index) => <Row key={event.id + '-' + index} 
                                         event={event.id !== 0 ? event as Event : null} 
                                         noDivider={index === featured.length - 1} />)}
    </>;
}
