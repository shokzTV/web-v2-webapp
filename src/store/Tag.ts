import { createReducer } from "./reducer/Reducer";
import { TagEntities } from "./entities/Tag";
import { schema } from "normalizr";
import { ActionDispatcher, CALL_API } from "./middleware/NetworkMiddlewareTypes";
import { loadedAllTagsSelector } from "./selectors/Ui";
import { LOAD_TAGS_REQUEST, LOAD_TAGS_SUCCESS, LOAD_TAGS_FAILURE } from "./Actions";

export const tag = new schema.Entity('tag');

const {combinedReducer} = createReducer<TagEntities>({});
export const reducer = combinedReducer;

export function loadTags(): ActionDispatcher<Promise<void>> {
    return async (dispatch, getState) => {
        if(!loadedAllTagsSelector(getState())) {
            await dispatch({
                [CALL_API]: {
                    endpoint: `${process.env.API_URL}/tag/list`,
                    schema: [tag],
                    types: {
                        requestType: LOAD_TAGS_REQUEST,
                        successType: LOAD_TAGS_SUCCESS,
                        failureType: LOAD_TAGS_FAILURE,
                    }
                }
            });
        }
    }
}
