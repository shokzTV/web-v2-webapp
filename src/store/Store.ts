import { combineReducers } from "redux";
import { entitiesReducer } from "./reducer/EntityReducer";
import { combiner } from "./reducer/combiner";
import {reducer as articleReducer} from './Article';
import {reducer as authorReducer} from './Author';
import {reducer as tagReducer} from './Tag';
import {reducer as videoReducer} from './Video';
import {reducer as eventReducer} from './Event';
import {reducer as eventLinkReducer} from './EventLink';
import {reducer as organizerReducer} from './Organizer';
import { ArticleEntities } from "./entities/Article";
import { AuthorEntities } from "./entities/Author";
import { TagEntities } from "./entities/Tag";
import { uiReducer } from './Ui';
import { EventEntities, EventLinkEntities } from "./entities/Event";
import { VideoEntities } from "./entities/Video";
import { OrganizerEntities } from "./entities/Organizer";

export interface State {
    entities: {
        article: ArticleEntities,
        author: AuthorEntities,
        event: EventEntities,
        eventLink: EventLinkEntities,
        organizer: OrganizerEntities,
        tag: TagEntities,
        video: VideoEntities,
    };

    ui: {
        articles: number[];
        events: number[];
        loadedArticles: number[];
        loadedAllTags: boolean;
        loadedEvents: number[];
        loadedFeaturedEvent: boolean;
        loadedMainEvent: boolean;
        loadedVideos: number[];
        videos: number[];
    }
}

const entityReducer = combiner({
    article: entitiesReducer(articleReducer, 'article'),
    author: entitiesReducer(authorReducer, 'author'),
    event: entitiesReducer(eventReducer, 'event'),
    eventLink: entitiesReducer(eventLinkReducer, 'eventLink'),
    organizer: entitiesReducer(organizerReducer, 'organizer'),
    tag: entitiesReducer(tagReducer, 'tag'),
    video: entitiesReducer(videoReducer, 'video'),
});


export const storeReducer = combineReducers<State>({
    //@ts-ignore
    entities: entityReducer,
    ui: uiReducer,
});
