import { Article } from "./@types/Article";
import { get } from "./request";

export async function fetchFeaturedArticle(): Promise<Partial<Article[]>> {
    return await get<Partial<Article[]>>('/article/featuredArticles');
}

export async function fetchArticleSlugs(): Promise<string[]> {
    return await get<string[]>('/article/slugs');
}

export async function fetchArticles(slugs: string[] = []): Promise<Article[]> {
    return await get<Article[]>(`/article/bySlug?slugs[]=${slugs.join('&slugs[]=')}`);
}

export async function loadArticle(slug: string): Promise<Article> {
    return (await fetchArticles([slug]))[0];
}