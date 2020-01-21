import { State } from "./Store";
import { createReducer } from "./reducer/Reducer";
import { ActionDispatcher, CALL_API } from "./middleware/NetworkMiddlewareTypes";
import { availableArticlesSelector } from "./selectors/Ui";
import { LOAD_ARTICLE_IDS_REQUEST, LOAD_ARTICLE_IDS_SUCCESS, LOAD_ARTICLE_IDS_FAILURE, LOAD_ARTICLES_SUCCESS } from "./Actions";

interface LoadArticleIdsSuccess {
    type: typeof LOAD_ARTICLE_IDS_SUCCESS;
    response: number[];
}
interface LoadArticleSuccess {
    type: typeof LOAD_ARTICLES_SUCCESS;
    options: {
        urlParams: {
            ids: number[];
        };
    };
}

const initial: State['ui'] = {
    articles: [],
    loadedArticles: [],
};

const {addReducer, combinedReducer} = createReducer<State['ui']>(initial);
addReducer<LoadArticleIdsSuccess>(LOAD_ARTICLE_IDS_SUCCESS, (state, {response}) => {
    return {
        ...state,
        articles: response,
    };
});
addReducer<LoadArticleSuccess>(LOAD_ARTICLES_SUCCESS, (state, {options: {urlParams: {ids}}}) => {
    return {
        ...state,
        loadedArticles: state.loadedArticles.concat(ids),
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
