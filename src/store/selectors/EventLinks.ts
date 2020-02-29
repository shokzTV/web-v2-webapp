import { State } from "../Store";
import { createSelector } from "reselect";
import { eventEntitiesSelector } from "./Event";
import memoize from "lodash/memoize";

export const eventLinkEntitiesSelector = (state: State) => state.entities.eventLink;

const prio = {
    homepage: 2,
    liquipedia: 1,
    custom: 0,
};

function sortPriority({linkType: a}, {linkType: b}): number {
    return prio[b] - prio[a];
}

export const eventLinksSelector = createSelector(
    eventEntitiesSelector,
    eventLinkEntitiesSelector,
    (events, eventLinks) => memoize((id: number) => {
        if(events[id]) {
            return events[id].links.map((linkId) => eventLinks[linkId]).sort(sortPriority)
        }
        return [];
    })
)