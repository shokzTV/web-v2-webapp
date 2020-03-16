import { ReactElement } from "react";
import Header from "../../Header";
import Entry from "./FeaturedEvents/Entry";
import { Event } from "../../../api/@types/Event";

export default function FeaturedEvents({featuredEvents}: {featuredEvents: Event[]}): ReactElement {
    return <>
        <Header title={'Alle EVENTS'} link={'VORHERIGE EVENTS ANZEIGEN'} topHeader/>

        <div className={'eventsGrid'}>
            {featuredEvents.map((event, index) => <div key={event.id + '-' + index} className={'column'}><Entry event={event} /></div>)}
        </div>

        <style jsx>{`
            .eventsGrid {
                display: flex;
                margin: -20px;
                justify-content: space-between;
                flex-wrap: wrap;
            }

            .column {
                width: 50%;
                padding: 20px;
                max-width: 552px;
            }
            
            @media only screen and (max-width: 768px) {
                .eventsGrid {
                    margin: 0;
                }
            }
            
            @media only screen and (max-width: 425px) {
                .eventsGrid {
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