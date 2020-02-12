import { State } from '../Store';

export const availableArticlesSelector = (state: State) => state.ui.articles;
export const loadedArticlesSelector = (state: State) => state.ui.loadedArticles;
export const loadedAllTagsSelector = (state: State) => state.ui.loadedAllTags;
export const availableVideosSelector = (state: State) => state.ui.videos;
export const loadedVideosSelector = (state: State) => state.ui.loadedVideos;