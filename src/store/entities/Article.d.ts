export interface Article {
    id: number;
    title: string;
    body: string;
    cover: string;
    status: string;
    created: number;
    author: number;
    tags: number[];
}

export interface ArticleEntities {
    [x: number]: Article;
}