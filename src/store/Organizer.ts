import { createReducer } from "./reducer/Reducer";
import { schema } from "normalizr";
import { OrganizerEntities } from './entities/Organizer';

export const organizer = new schema.Entity('organizer');

const {combinedReducer} = createReducer<OrganizerEntities>({});
export const reducer = combinedReducer;
