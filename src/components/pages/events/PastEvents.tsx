import { ReactElement } from "react";
import Header from "../../Header";
import { usePagination } from "../../../hooks/entryPagination";
import { Event } from "../../../api/@types/Event";
import { fetchEventsById } from "../../../api/event";
import Pagination from "../../block/Pagination";
import Entry from "./PastEvents/Entry";

interface Props {
    pastEventIds: number[];
    pastEvents: Event[];
}

export default function PastEvents({pastEventIds, pastEvents}: Props): ReactElement {
    const {
        page,
        total,
        setPage,
        entries
    } = usePagination<Event>(10, pastEventIds, pastEvents, fetchEventsById);
    
    return <>
        <Header title={'VORHERIGE EVENTS'} />

        <Pagination  page={page} total={total} setPage={setPage} />
        <div className={'eventGrid'}>
            {entries.map((event, index) => <div className={'column'} key={(event && event.id) + '-' + index}>
                <Entry event={event}/>
            </div>)}
        </div>
        <Pagination  page={page} total={total} setPage={setPage} />

        <style jsx>{`
            .eventGrid {
                display: flex;
                flex-wrap: wrap;
                margin: -20px;
            }

            .column {
                padding: 20px;
                width: 50%;
            }
            
            @media only screen and (max-width: 768px) { 
                .eventGrid {
                    margin: 0;
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