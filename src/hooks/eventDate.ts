import 'dayjs/locale/de';
import dayjs from 'dayjs';
import { useCallback } from 'react';
import { Event } from '../api/@types/Event';

dayjs.locale('de')

export function useEventDate(onlyMonth = false): (event: Event) => string | null {
    return useCallback((event) => {
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
    }, []);
}

