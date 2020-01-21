import { State } from "../Store";

export const articlesSelector = (state: State) => state.entities.article || {}; 