import { useDispatch, useSelector } from "react-redux";
import { loadAvailableEvents } from "../store/Ui";
import { useMemo } from "react";
import { pastEventIdsSelector, eventEntitiesSelector } from "../store/selectors/Event";
import { loadEvents } from "../store/Event";


export function usePastEventsList(page: number = 0, pageSize: number = 10): number[] {
    const dispatch = useDispatch();
    const eventIds = useSelector(pastEventIdsSelector);
    const events = useSelector(eventEntitiesSelector);
    const start = pageSize * page;
    const eventsOfIntrest = eventIds.slice(start, start + pageSize);
    const pageEvents = useMemo(() => eventsOfIntrest.map((id) => events[id])
                                                    .sort(({start: a}, {start: b}) => b - a)
                                                    .map((event) => event && event.id), [eventsOfIntrest, events]);

    if(!eventsOfIntrest.length) {
        dispatch(loadAvailableEvents());
        return [...Array(pageSize).keys()];
    }

    if(eventsOfIntrest.find((id) => !events[id])) {
        dispatch(loadEvents(eventsOfIntrest));
        return [...Array(pageSize).keys()];
    }

    return pageEvents;
}