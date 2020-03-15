import { ReactElement } from "react";
import Header from "../../Header";
import { usePagination } from "../../../hooks/entryPagination";
import { fetchArticleIds, fetchArticles } from "../../../api/article";
import { Article } from "../../../api/@types/Article";
import Pagination from "../../block/Pagination";
import Row from "./ArticleList/Row";

export default function ArticleList(): ReactElement {
    const {
        page,
        total,
        setPage,
        entries
    } = usePagination<Article>(10, fetchArticleIds, fetchArticles);

    return <>
        <Header title={'ALLE ARTIKEL'} link={'ALLE ARTIKELKATERGORIEN ANZEIGEN'} linkTarget={'/tags'} topHeader/>

        <Pagination  page={page} total={total} setPage={setPage} />
        {entries.map((article, index) => <Row key={(article && article.id) + '-' + index} article={article} noDivider={index + 1 === entries.length}/>)}
        <Pagination  page={page} total={total} setPage={setPage} />
    </>;
}
