import { combineReducers } from "redux";
import { entitiesReducer } from "./reducer/EntityReducer";
import { combiner } from "./reducer/combiner";
import {reducer as articleReducer} from './Article';
import {reducer as authorReducer} from './Author';
import {reducer as tagReducer} from './Tag';
import { ArticleEntities } from "./entities/Article";
import { AuthorEntities } from "./entities/Author";
import { TagEntities } from "./entities/Tag";
import { uiReducer } from './Ui';

export interface State {
    entities: {
        article: ArticleEntities,
        author: AuthorEntities,
        tag: TagEntities,
    };

    ui: {
        articles: number[];
        loadedArticles: number[];
        loadedAllTags: boolean;
    }
}

const entityReducer = combiner({
    article: entitiesReducer(articleReducer, 'article'),
    author: entitiesReducer(authorReducer, 'author'),
    tag: entitiesReducer(tagReducer, 'tag'),
});


export const storeReducer = combineReducers<State>({
    //@ts-ignore
    entities: entityReducer,
    ui: uiReducer,
});
