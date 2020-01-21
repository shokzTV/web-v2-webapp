import { createReducer } from "./reducer/Reducer";
import { TagEntities } from "./entities/Tag";
import { schema } from "normalizr";

export const tag = new schema.Entity('tag');

const {combinedReducer} = createReducer<TagEntities>({});
export const reducer = combinedReducer;
