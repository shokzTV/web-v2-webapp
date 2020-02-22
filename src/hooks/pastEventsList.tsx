import { useDispatch, useSelector } from "react-redux";
import { loadAvailableEvents } from "../store/Ui";
import { useMemo } from "react";
import { pastEventIdsSelector, eventEntitiesSelector } from "../store/selectors/Event";
import { loadEvents } from "../store/Event";
import { Event } from "../store/entities/Event";


export function usePastEventsList(page: number = 0, pageSize: number = 10): Event[] {
    const dispatch = useDispatch();
    const eventIds = useSelector(pastEventIdsSelector);
    const events = useSelector(eventEntitiesSelector);
    const start = pageSize * page;
    const eventsOfIntrest = eventIds.slice(start, start + pageSize);
    const pageEvents = useMemo(() => eventsOfIntrest.map((id) => events[id]).sort(({start: a}, {start: b}) => b - a), [eventsOfIntrest, events]);

    if(!eventsOfIntrest.length) {
        dispatch(loadAvailableEvents());
        return [];
    }

    if(eventsOfIntrest.find((id) => !events[id])) {
        dispatch(loadEvents(eventsOfIntrest));
        return [];
    }

    return pageEvents;
}