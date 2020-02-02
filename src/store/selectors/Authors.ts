import { State } from "../Store";

export const authorsSelector = (state: State) => state.entities.author || {}; 