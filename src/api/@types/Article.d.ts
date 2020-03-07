export interface Article {
    id: number;
    title: string;
    body: string;
    cover: string;
    coverWEBP: string;
    coverJP2: string;
    status: string;
    created: number;
    author: number;
    tags: number[];
}