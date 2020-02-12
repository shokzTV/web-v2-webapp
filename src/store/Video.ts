import { createReducer } from "./reducer/Reducer";
import { schema } from "normalizr";
import { ActionDispatcher, CALL_API } from "./middleware/NetworkMiddlewareTypes";
import { loadedVideosSelector } from "./selectors/Ui";
import { LOAD_VIDEOS_REQUEST, LOAD_VIDEOS_SUCCESS, LOAD_VIDEOS_FAILURE } from "./Actions";
import { VideoEntities } from "./entities/Video";
import { tag } from "./Tag";

export const video = new schema.Entity('video', {
    tags: [tag]
});

const {combinedReducer} = createReducer<VideoEntities>({});
export const reducer = combinedReducer;

export function loadVideos(ids: number[]): ActionDispatcher<Promise<void>> {
    return async (dispatch, getState) => {
        const loadedIds = loadedVideosSelector(getState());
        const toBeLoaded = ids.filter((id) => !loadedIds.includes(id));
        if(toBeLoaded.length) {
            const query = toBeLoaded.join('&ids[]=')
            await dispatch<Promise<Response>>({
                [CALL_API]: {
                    endpoint: `${process.env.API_URL}/video/list?ids[]=${query}`,
                    schema: [video],
                    types: {
                        requestType: LOAD_VIDEOS_REQUEST,
                        successType: LOAD_VIDEOS_SUCCESS,
                        failureType: LOAD_VIDEOS_FAILURE,
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
