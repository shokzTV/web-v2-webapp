import { Article } from "../store/entities/Article";
import { useDispatch, useSelector } from "react-redux";
import { loadAvailableArticles } from "../store/Ui";
import { loadArticles } from "../store/Article";
import { articlesSelector } from "../store/selectors/Articles";
import { availableArticlesSelector } from "../store/selectors/Ui";
import { useMemo } from "react";


export function useArticleList(page: number = 0, pageSize: number = 4): Article[] {
    const dispatch = useDispatch();
    const articleIds = useSelector(availableArticlesSelector);
    const articles = useSelector(articlesSelector);
    const start = pageSize * page;
    const articlesOfIntrest = articleIds.slice(start, start + pageSize);
    const pageArticles = useMemo(() => articlesOfIntrest.map((id) => articles[id]).sort(({created: a}, {created: b}) => b - a), [articlesOfIntrest, articles]);

    if(!articleIds.length) {
        dispatch(loadAvailableArticles());
        return [];
    }

    if(articlesOfIntrest.find((id) => !articles[id])) {
        dispatch(loadArticles(articlesOfIntrest));
        return [];
    }

    return pageArticles;
}