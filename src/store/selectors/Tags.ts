import { State } from "../Store";
import { createSelector } from 'reselect';

export const tagsEntitiesSelector = (state: State) => state.entities.tag;

export const orderedLastTagesSelector = createSelector(
    tagsEntitiesSelector,
    (tags) => Object.values(tags).sort(({lastAction: a}, {lastAction: b}) => (b || 0) - (a || 0)).splice(-4).map(({id}) => id)
);