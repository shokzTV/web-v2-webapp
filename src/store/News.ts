import { createReducer } from "./reducer/Reducer";
import { schema } from "normalizr";
import { NewsEntities } from "./entities/News";
import { ActionDispatcher, CALL_API } from "./middleware/NetworkMiddlewareTypes";
import { loadedLatestNewsSelector } from "./selectors/Ui";
import { LOAD_LATEST_NEWS_REQUEST, LOAD_LATEST_NEWS_SUCCESS, LOAD_LATEST_NEWS_FAILURE } from "./Actions";

export const news = new schema.Entity('news');

const {combinedReducer} = createReducer<NewsEntities>({});
export const reducer = combinedReducer;

export function loadLatestNews(): ActionDispatcher<Promise<void>> {
    return async (dispatch, getState) => {
        if(!loadedLatestNewsSelector(getState())) {
            await dispatch({
                [CALL_API]: {
                    endpoint: `${process.env.API_URL}/news/latest`,
                    schema: [news],
                    types: {
                        requestType: LOAD_LATEST_NEWS_REQUEST,
                        successType: LOAD_LATEST_NEWS_SUCCESS,
                        failureType: LOAD_LATEST_NEWS_FAILURE,
                    }
                }
            });
        }
    }
}
