import { createReducer } from "./reducer/Reducer";
import { schema } from "normalizr";
import { ActionDispatcher, CALL_API } from "./middleware/NetworkMiddlewareTypes";
import { loadedEventsSelector, loadedMainEventSelector, loadedFeaturedEventSelector } from "./selectors/Ui";
import { LOAD_EVENT_REQUEST, LOAD_EVENT_SUCCESS, LOAD_EVENT_FAILURE, LOAD_MAIN_EVENT_REQUEST, LOAD_MAIN_EVENT_SUCCESS, LOAD_MAIN_EVENT_FAILURE, LOAD_FEATURED_EVENTS_REQUEST, LOAD_FEATURED_EVENTS_SUCCESS, LOAD_FEATURED_EVENTS_FAILURE } from "./Actions";
import { eventLink } from "./EventLink";
import { tag } from "./Tag";
import { EventEntities } from "./entities/Event";
import { organizer } from "./Organizer";

export const event = new schema.Entity('event', {
    organizer: organizer,
    tags: [tag],
    links: [eventLink]
});

const {combinedReducer} = createReducer<EventEntities>({});
export const reducer = combinedReducer;

export function loadEvents(ids: number[]): ActionDispatcher<Promise<void>> {
    return async (dispatch, getState) => {
        const loadedIds = loadedEventsSelector(getState());
        const toBeLoaded = ids.filter((id) => !loadedIds.includes(id));
        if(toBeLoaded.length) {
            const query = toBeLoaded.join('&ids[]=')
            await dispatch<Promise<Response>>({
                [CALL_API]: {
                    endpoint: `${process.env.API_URL}/event/byId?ids[]=${query}`,
                    schema: [event],
                    types: {
                        requestType: LOAD_EVENT_REQUEST,
                        successType: LOAD_EVENT_SUCCESS,
                        failureType: LOAD_EVENT_FAILURE,
                    },
                    options: {
                        urlParams: {
                            ids: toBeLoaded,
                        },
                    },
                },
            });
        }
    }
}

export function loadMainEvent(): ActionDispatcher<Promise<void>> {
    return async (dispatch, getState) => {
        const loadedMainEvent = loadedMainEventSelector(getState());
        if(!loadedMainEvent) {
            await dispatch<Promise<Response>>({
                [CALL_API]: {
                    endpoint: `${process.env.API_URL}/event/main`,
                    schema: event,
                    types: {
                        requestType: LOAD_MAIN_EVENT_REQUEST,
                        successType: LOAD_MAIN_EVENT_SUCCESS,
                        failureType: LOAD_MAIN_EVENT_FAILURE,
                    },
                },
            });
        }
    }
}

export function loadFeaturedEvents(): ActionDispatcher<Promise<void>> {
    return async (dispatch, getState) => {
        const loadedFeaturedEvents = loadedFeaturedEventSelector(getState());
        if(!loadedFeaturedEvents) {
            await dispatch<Promise<Response>>({
                [CALL_API]: {
                    endpoint: `${process.env.API_URL}/event/featured`,
                    schema: [event],
                    types: {
                        requestType: LOAD_FEATURED_EVENTS_REQUEST,
                        successType: LOAD_FEATURED_EVENTS_SUCCESS,
                        failureType: LOAD_FEATURED_EVENTS_FAILURE,
                    },
                },
            });
        }
    }
}
