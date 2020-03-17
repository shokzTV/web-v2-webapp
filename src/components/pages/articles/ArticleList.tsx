import { ReactElement } from "react";
import Header from "../../Header";
import { usePagination } from "../../../hooks/entryPagination";
import { fetchArticles } from "../../../api/article";
import { Article } from "../../../api/@types/Article";
import Pagination from "../../block/Pagination";
import Row from "./ArticleList/Row";

interface Props {
  articleIds: number[];
  articles: Article[];
}

export default function ArticleList({articleIds, articles}: Props): ReactElement {
    const {
        page,
        total,
        setPage,
        entries
    } = usePagination<Article>(10, articleIds, articles, fetchArticles);

    return <>
        <Header title={'ALLE ARTIKEL'} link={'ALLE ARTIKELKATERGORIEN ANZEIGEN'} linkTarget={'/kategorien'} topHeader/>

        <Pagination  page={page} total={total} setPage={setPage} />
        {entries.map((article, index) => <Row key={(article && article.id) + '-' + index} article={article} noDivider={index + 1 === entries.length}/>)}
        <Pagination  page={page} total={total} setPage={setPage} />
    </>;
}
