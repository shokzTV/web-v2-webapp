import { ReactElement } from "react";
import Header from "../../Header";
import { Event } from '../../../api/@types/Event';
import Row from "./FeaturedEvents/Row";
import { loadFeaturedEvents } from '../../../hooks/featuredEvents';

export default function FeaturedEvents(): ReactElement {
    const list = loadFeaturedEvents();
    return <>
        <Header title={'EVENTKALENDER'} link={'ALLE EVENTS ANZEIGEN'} linkTarget={'/events'} />
        
        {list.map((event, index) => <Row key={event.id + '-' + index} 
                                         event={event.id !== 0 ? event as Event : null} 
                                         noDivider={index === list.length - 1} />)}
    </>;
}
