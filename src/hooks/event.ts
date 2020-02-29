import 'dayjs/locale/de';
import { useSelector } from 'react-redux';
import { eventEntitiesSelector } from '../store/selectors/Event';
import dayjs from 'dayjs';
import { organizerEntitiesSelector } from '../store/selectors/Organizer';
import { useMemo, useCallback } from 'react';

dayjs.locale('de')

export function useEventDate(onlyMonth = false): (eventId: number) => string | null {
    const events = useSelector(eventEntitiesSelector);
    return useCallback((eventId) => {
        const event = events[eventId];
        if(event) {
            const start = dayjs.unix(event.start);
            const end = dayjs.unix(event.end);
            const month = onlyMonth ? 'MMMM' : 'MMM';
            const year = onlyMonth ? '' : ' YYYY';

            if(start.isSame(end, 'month')) {
                return `${start.format('DD.')} - ${end.format(`DD. ${month}${year}`)}`;
            } else if(start.isSame(end, 'day')) {
                return `${start.format(`DD. ${month}${year}`)}`;
            } else {
                return `${start.format(`DD. ${month}`)} - ${end.format(`DD. ${month}${year}`)}`;
            }
        }

        return null;
    }, [events]);
}

export function useEventOrganizer(eventId: number): string | null {
    const events = useSelector(eventEntitiesSelector);
    const organizers = useSelector(organizerEntitiesSelector);
    const event = events[eventId];

    return useMemo(() => {
        if(event) {
            const organizer = organizers[event.organizer];
            return organizer.name;
        }
        return null;
    }, [event, organizers])

}