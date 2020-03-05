import { State } from "../Store";
import { createSelector } from "reselect";
import { loadedMainEventSelector, availableEventsSelector, loadedFeaturedEventSelector } from './Ui';
import { Event } from "../entities/Event";
import { organizerEntitiesSelector } from "./Organizer";
import memoize from 'lodash/memoize';
import dayjs from "dayjs";
import { getImageUrl } from "../../hooks/image";

export const eventEntitiesSelector = (state: State) => state.entities.event;

export const eventsSelector = createSelector(
    eventEntitiesSelector,
    (events) => memoize((id: number) => events[id])
)

export const mainEventSelector = createSelector(
    eventEntitiesSelector,
    loadedMainEventSelector,
    (eventEntities, loadedMainEvent): null | Event => {
        if(loadedMainEvent) {
            return Object.values(eventEntities).find(({isMainEvent}) => isMainEvent);
        }
        return null;
    }
)

function getPriority(start: number, end: number): number {
    const currentTs = dayjs().unix();

    if(currentTs > end) {
        return 0;
    } else if(currentTs < start) {
        return 1;
    } 

    return 2;
}

function sort({start: aStart, end: aEnd}, {start: bStart, end: bEnd}): number {
    return getPriority(bStart, bEnd) - getPriority(aStart, aEnd);
}

function featureFilter({isFeatured}) {
    return isFeatured;
}

export const featuredEventsSelector = createSelector(
    eventEntitiesSelector,
    (events) => Object.values(events).filter(featureFilter).sort(sort).map(({id}) => id)
)

export const pastEventIdsSelector = createSelector(
    availableEventsSelector,
    loadedFeaturedEventSelector,
    eventEntitiesSelector,
    (ids, loadedFeatured, events) => {
        if(loadedFeatured) {
            return ids.filter((id) => !events[id] || !events[id].isFeatured);
        }

        return ids;
    }
)

export const organizerEventLogoSelector = createSelector(
    eventEntitiesSelector,
    organizerEntitiesSelector,
    (events, organizer) => memoize((eventId: number) => {
        const event = events[eventId];
        if(event) {
            if(event.organizerLogo) {
                return {
                    jpeg: getImageUrl(event.organizerLogo),
                    jp2: getImageUrl(event.organizerLogoJP2),
                    webp: getImageUrl(event.organizerLogoWEBP),
                };
            }
            return {
                jpeg: getImageUrl(organizer[event.organizer].logo),
                jp2: getImageUrl(organizer[event.organizer].logo_jpeg_2000),
                webp: getImageUrl(organizer[event.organizer].logo_webp),
            };
        }
        return {
            jpeg: '',
            jp2: '',
            webp: '',
        };
    })
)