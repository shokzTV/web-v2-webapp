import { createReducer } from "./reducer/Reducer";
import { AuthorEntities } from "./entities/Author";
import { schema } from "normalizr";

export const author = new schema.Entity('author');

const {combinedReducer} = createReducer<AuthorEntities>({});
export const reducer = combinedReducer;
