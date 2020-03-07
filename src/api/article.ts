import { Article } from "./@types/Article";
import { get } from "./request";

export async function fetchFeaturedArticle(): Promise<Partial<Article[]>> {
    return await get<Partial<Article[]>>('/article/featuredArticles');
}