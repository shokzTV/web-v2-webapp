import { State } from "./Store";
import { createReducer } from "./reducer/Reducer";
import { ActionDispatcher, CALL_API } from "./middleware/NetworkMiddlewareTypes";
import { availableArticlesSelector, availableVideosSelector } from "./selectors/Ui";
import { LOAD_ARTICLE_IDS_REQUEST, LOAD_ARTICLE_IDS_SUCCESS, LOAD_ARTICLE_IDS_FAILURE, LOAD_ARTICLES_SUCCESS, LOAD_TAGS_SUCCESS, LOAD_VIDEO_IDS_REQUEST, LOAD_VIDEO_IDS_SUCCESS, LOAD_VIDEO_IDS_FAILURE, LOAD_VIDEOS_SUCCESS } from "./Actions";

interface LoadArticleIdsSuccess {
    type: typeof LOAD_ARTICLE_IDS_SUCCESS;
    response: number[];
}
interface LoadVideoIdsSuccess {
    type: typeof LOAD_VIDEO_IDS_SUCCESS;
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

const initial: State['ui'] = {
    articles: [],
    loadedArticles: [],
    loadedAllTags: false,
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
