import { State } from "../Store";
import { createSelector } from "reselect";
import memoize from "lodash/memoize";

export const articlesSelector = (state: State) => state.entities.article || {}; 

export const articleSelector = createSelector(
    articlesSelector,
    (articles) => memoize((id: number) => articles[id])
)