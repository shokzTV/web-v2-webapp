import { State } from "../Store";
import { createSelector } from "reselect";
import { loadedMainEventSelector } from './Ui';
import { Event } from "../entities/Event";
import { organizerEntitiesSelector } from "./Organizer";
import memoize from 'lodash/memoize';

export const eventEntitiesSelector = (state: State) => state.entities.event;

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

export const organizerEventLogoSelector = createSelector(
    eventEntitiesSelector,
    organizerEntitiesSelector,
    (events, organizer) => memoize((eventId: number) => {
        const event = events[eventId];
        if(event) {
            return event.organizerLogo ? event.organizerLogo : organizer[event.organizer].logo;
        }
        return '';
    })
)