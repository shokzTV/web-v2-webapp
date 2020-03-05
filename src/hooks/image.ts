import { useSelector } from "react-redux";
import { eventEntitiesSelector } from "../store/selectors/Event";
import { tagsEntitiesSelector } from "../store/selectors/Tags";
import { useCallback } from "react";

export function getImageUrl(path: string): string {
    return `${process.env.API_URL}${path}`;
}

export function useEventImage(): (id: number, access?: string) => string | undefined {
    const events = useSelector(eventEntitiesSelector);
    const tags = useSelector(tagsEntitiesSelector);

    return useCallback((eventId, access = '') => {
            const event = events[eventId]
            const tagId = event && event.tags.find((tagId) => !!tags[tagId].image);
            const tag = tagId && tags[tagId];

            return tag && tag['image' + access];
        },
        [events, tags],
    )
}