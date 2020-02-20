import { State } from '../Store';

export const availableArticlesSelector = (state: State) => state.ui.articles;
export const loadedArticlesSelector = (state: State) => state.ui.loadedArticles;
export const loadedAllTagsSelector = (state: State) => state.ui.loadedAllTags;
export const availableVideosSelector = (state: State) => state.ui.videos;
export const loadedVideosSelector = (state: State) => state.ui.loadedVideos;
export const availableEventsSelector = (state: State) => state.ui.events;
export const loadedEventsSelector = (state: State) => state.ui.loadedEvents;
export const loadedMainEventSelector = (state: State) => state.ui.loadedMainEvent;
export const loadedFeaturedEventSelector = (state: State) => state.ui.loadedFeaturedEvent;
export const loadedLatestNewsSelector = (state: State) => state.ui.loadedLatestNews;