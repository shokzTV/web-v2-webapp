import { State } from "./Store";
import { createReducer } from "./reducer/Reducer";
import { ActionDispatcher, CALL_API } from "./middleware/NetworkMiddlewareTypes";
import { availableArticlesSelector, availableVideosSelector, availableEventsSelector } from "./selectors/Ui";
import { LOAD_ARTICLE_IDS_REQUEST, LOAD_ARTICLE_IDS_SUCCESS, LOAD_ARTICLE_IDS_FAILURE, LOAD_ARTICLES_SUCCESS, LOAD_TAGS_SUCCESS, LOAD_VIDEO_IDS_REQUEST, LOAD_VIDEO_IDS_SUCCESS, LOAD_VIDEO_IDS_FAILURE, LOAD_VIDEOS_SUCCESS, LOAD_EVENT_IDS_REQUEST, LOAD_EVENT_IDS_SUCCESS, LOAD_EVENT_IDS_FAILURE, LOAD_EVENT_SUCCESS, LOAD_MAIN_EVENT_SUCCESS, LOAD_FEATURED_EVENTS_SUCCESS } from "./Actions";

interface LoadArticleIdsSuccess {
    type: typeof LOAD_ARTICLE_IDS_SUCCESS;
    response: number[];
}

interface LoadVideoIdsSuccess {
    type: typeof LOAD_VIDEO_IDS_SUCCESS;
    response: number[];
}

interface LoadEventIdsSuccess {
    type: typeof LOAD_EVENT_IDS_SUCCESS;
    response: number[];
}

interface LoadedAllTagsSuccess {
    type: typeof LOAD_TAGS_SUCCESS;
}

interface LoadArticleSuccess {
    type: typeof LOAD_ARTICLES_SUCCESS;
    options: {
        urlParams: {
            ids: number[];
        };
    };
}

interface LoadVideoSuccess {
    type: typeof LOAD_VIDEOS_SUCCESS;
    options: {
        urlParams: {
            ids: number[];
        };
    };
}

interface LoadEventSuccess {
    type: typeof LOAD_EVENT_SUCCESS;
    options: {
        urlParams: {
            ids: number[];
        };
    };
}

interface LoadedMainEventSuccess {
    type: typeof LOAD_MAIN_EVENT_SUCCESS;
    response: {
        entities: {
            event: {
                [x: number]: object;
            };
        };
    };
}
interface LoadedFeaturedEventSuccess {
    type: typeof LOAD_FEATURED_EVENTS_SUCCESS;
    response: {
        entities: {
            event: {
                [x: number]: object;
            };
        };
    };
}

const initial: State['ui'] = {
    articles: [],
    events: [],
    loadedArticles: [],
    loadedAllTags: false,
    loadedFeaturedEvent: false,
    loadedLatestNews: false,
    loadedMainEvent: false,
    loadedEvents: [],
    loadedVideos: [],
    videos: [],
};

const {addReducer, combinedReducer} = createReducer<State['ui']>(initial);
addReducer<LoadArticleIdsSuccess>(LOAD_ARTICLE_IDS_SUCCESS, (state, {response}) => {
    return {
        ...state,
        articles: response,
    };
});

addReducer<LoadVideoIdsSuccess>(LOAD_VIDEO_IDS_SUCCESS, (state, {response}) => {
    return {
        ...state,
        videos: response,
    };
});

addReducer<LoadEventIdsSuccess>(LOAD_EVENT_IDS_SUCCESS, (state, {response}) => {
    return {
        ...state,
        events: response,
    };
});

addReducer<LoadArticleSuccess>(LOAD_ARTICLES_SUCCESS, (state, {options: {urlParams: {ids}}}) => {
    return {
        ...state,
        loadedArticles: state.loadedArticles.concat(ids),
    };
});

addReducer<LoadVideoSuccess>(LOAD_VIDEOS_SUCCESS, (state, {options: {urlParams: {ids}}}) => {
    return {
        ...state,
        loadedVideos: state.loadedVideos.concat(ids),
    };
});

addReducer<LoadedAllTagsSuccess>(LOAD_TAGS_SUCCESS, (state) => {
    return {
        ...state,
        loadedAllTags: true,
    };
});

addReducer<LoadEventSuccess>(LOAD_EVENT_SUCCESS, (state, {options: {urlParams: {ids}}}) => {
    return {
        ...state,
        loadedEvents: state.loadedEvents.concat(ids),
    };
});

addReducer<LoadedMainEventSuccess>(LOAD_MAIN_EVENT_SUCCESS, (state, {response: {entities: {event}}}) => {
    const eventId = Object.keys(event)[0];
    return {
        ...state,
        loadedMainEvent: true,
        loadedEvents: state.loadedEvents.concat([+eventId]),
    };
});

addReducer<LoadedFeaturedEventSuccess>(LOAD_FEATURED_EVENTS_SUCCESS, (state, {response: {entities: {event}}}) => {
    const eventIds = Object.keys(event || {}).map(Number);
    return {
        ...state,
        loadedFeaturedEvent: true,
        loadedEvents: state.loadedEvents.concat(eventIds),
    };
});

export const uiReducer = combinedReducer;

export function loadAvailableArticles(): ActionDispatcher<Promise<void>> {
    return async (dispatch, getState) => {
        if(availableArticlesSelector(getState()).length === 0) {
            await dispatch<Promise<Response>>({
                [CALL_API]: {
                    endpoint: `${process.env.API_URL}/article/public/articleIds`,
                    types: {
                        requestType: LOAD_ARTICLE_IDS_REQUEST,
                        successType: LOAD_ARTICLE_IDS_SUCCESS,
                        failureType: LOAD_ARTICLE_IDS_FAILURE,
                    },
                },
            });
        }
    }
}

export function loadAvailableVideos(): ActionDispatcher<Promise<void>> {
    return async (dispatch, getState) => {
        if(availableVideosSelector(getState()).length === 0) {
            await dispatch<Promise<Response>>({
                [CALL_API]: {
                    endpoint: `${process.env.API_URL}/video/ids`,
                    types: {
                        requestType: LOAD_VIDEO_IDS_REQUEST,
                        successType: LOAD_VIDEO_IDS_SUCCESS,
                        failureType: LOAD_VIDEO_IDS_FAILURE,
                    },
                },
            });
        }
    }
}

export function loadAvailableEvents(): ActionDispatcher<Promise<void>> {
    return async (dispatch, getState) => {
        if(availableEventsSelector(getState()).length === 0) {
            await dispatch<Promise<Response>>({
                [CALL_API]: {
                    endpoint: `${process.env.API_URL}/event/ids`,
                    types: {
                        requestType: LOAD_EVENT_IDS_REQUEST,
                        successType: LOAD_EVENT_IDS_SUCCESS,
                        failureType: LOAD_EVENT_IDS_FAILURE,
                    },
                },
            });
        }
    }
}
