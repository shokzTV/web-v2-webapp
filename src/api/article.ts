import { Article } from "./@types/Article";
import { get } from "./request";

export async function fetchFeaturedArticle(): Promise<Partial<Article[]>> {
    return await get<Partial<Article[]>>('/article/featuredArticles');
}

export async function fetchArticleIds(): Promise<number[]> {
    return await get<number[]>('/article/public/articleIds');
}

export async function fetchArticles(ids: number[] = []): Promise<Article[]> {
    return await get<Article[]>(`/article/public/articles?ids[]=${ids.join('&ids[]=')}`);
}

export async function loadArticle(id: number): Promise<Article> {
    return (await fetchArticles([id]))[0];
}