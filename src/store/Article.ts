import { ArticleEntities } from "./entities/Article";
import { createReducer } from "./reducer/Reducer";
import { ActionDispatcher, CALL_API } from "./middleware/NetworkMiddlewareTypes";
import { schema } from "normalizr";
import { author } from './Author';
import { tag } from './Tag';
import { LOAD_ARTICLES_REQUEST, LOAD_ARTICLES_SUCCESS, LOAD_ARTICLES_FAILURE } from './Actions';
import { loadedArticlesSelector } from "./selectors/Ui";

export const article = new schema.Entity('article', {
    author,
    tags: [tag]
});

const {combinedReducer} = createReducer<ArticleEntities>({});
export const reducer = combinedReducer;

export function loadArticles(ids: number[]): ActionDispatcher<Promise<void>> {
    return async (dispatch, getState) => {
        const loadedIds = loadedArticlesSelector(getState());
        const toBeLoaded = ids.filter((id) => !loadedIds.includes(id));
        if(toBeLoaded.length) {
            const query = toBeLoaded.join('&ids[]=')
            await dispatch<Promise<Response>>({
                [CALL_API]: {
                    endpoint: `${process.env.API_URL}/article/public/articles?ids[]=${query}`,
                    schema: [article],
                    types: {
                        requestType: LOAD_ARTICLES_REQUEST,
                        successType: LOAD_ARTICLES_SUCCESS,
                        failureType: LOAD_ARTICLES_FAILURE,
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
