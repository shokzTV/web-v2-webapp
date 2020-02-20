import { State } from "../Store";
import { createSelector } from "reselect";

export const newsEntities = (state: State) => state.entities.news;

export const latestNewsSelector = createSelector(
    newsEntities,
    (news) => Object.values(news).sort(({created: a}, {created: b}) => b - a).slice(0, 15)
)