import { ReactElement } from "react";
import Header from "../../Header";
import { usePagination } from "../../../hooks/entryPagination";
import { Event } from "../../../api/@types/Event";
import { fetchPastEventIds, fetchEventsById } from "../../../api/event";
import Pagination from "../../block/Pagination";
import Entry from "./PastEvents/Entry";

export default function PastEvents(): ReactElement {
    const {
        page,
        total,
        setPage,
        entries
    } = usePagination<Event>(10, fetchPastEventIds, fetchEventsById);
    
    return <>
        <Header title={'VORHERIGE EVENTS'} />

        <Pagination  page={page} total={total} setPage={setPage} />
        <div className={'eventGrid'}>
            {entries.map((event, index) => <div className={'colummn'} key={(event && event.id) + '-' + index}>
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

            .colummn {
                padding: 20px;
                width: 50%;
            }
            
        `}</style>
    </>;
}