import { createReducer } from "./reducer/Reducer";
import { schema } from "normalizr";
import { EventLinkEntities } from "./entities/Event";

export const eventLink = new schema.Entity('eventLink');

const {combinedReducer} = createReducer<EventLinkEntities>({});
export const reducer = combinedReducer;
