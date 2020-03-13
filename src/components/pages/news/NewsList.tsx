import { ReactElement, useState, useEffect, useMemo } from "react";
import { News } from "../../../api/@types/News";
import { fetchAllNews } from "../../../api/news";
import Pagination from "../../block/Pagination";
import TextLoader from "../../TextLoader";
import classNames from "classnames";
import Divider from "../../Divider";
import { COLORS } from "../../../style/colors";

const pageSize = 10;
export default function NewsList(): ReactElement {
    const [news, setNews] = useState<News[]>(Array(10).fill(undefined));
    const [page, setPage] = useState<number>(1);

    useEffect(() => {
        const load = async () => {
            setNews(await fetchAllNews());
        };

        load();
    }, []);

    const total = useMemo(
        () => news.length > 0 ? (news.length % pageSize === 0 ? (news.length / pageSize) : Math.round((news.length / pageSize) + .5)) : 2, 
        [news, pageSize]
    );

    const pageNews = useMemo(() => news.slice((page - 1) * pageSize, page * pageSize), [news, page]);

    return <>
        <div className={'spacer'} />

        <Pagination  page={page} total={total} setPage={setPage} noTopSpacing />
        {pageNews.map((entry, index) => <div key={(entry && entry.id) + '-' + index}>
            <a className={'newsEntry'} href={entry && entry.source} target={'_blank'} rel={'noreferrer'}>
                <div className={classNames('link', {hasSource: entry && entry.source.length > 0})}>
                    <svg viewBox="64 64 896 896" focusable="false" className="" data-icon="link" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M574 665.4a8.03 8.03 0 00-11.3 0L446.5 781.6c-53.8 53.8-144.6 59.5-204 0-59.5-59.5-53.8-150.2 0-204l116.2-116.2c3.1-3.1 3.1-8.2 0-11.3l-39.8-39.8a8.03 8.03 0 00-11.3 0L191.4 526.5c-84.6 84.6-84.6 221.5 0 306s221.5 84.6 306 0l116.2-116.2c3.1-3.1 3.1-8.2 0-11.3L574 665.4zm258.6-474c-84.6-84.6-221.5-84.6-306 0L410.3 307.6a8.03 8.03 0 000 11.3l39.7 39.7c3.1 3.1 8.2 3.1 11.3 0l116.2-116.2c53.8-53.8 144.6-59.5 204 0 59.5 59.5 53.8 150.2 0 204L665.3 562.6a8.03 8.03 0 000 11.3l39.8 39.8c3.1 3.1 8.2 3.1 11.3 0l116.2-116.2c84.5-84.6 84.5-221.5 0-306.1zM610.1 372.3a8.03 8.03 0 00-11.3 0L372.3 598.7a8.03 8.03 0 000 11.3l39.6 39.6c3.1 3.1 8.2 3.1 11.3 0l226.4-226.4c3.1-3.1 3.1-8.2 0-11.3l-39.5-39.6z"></path></svg>
                </div>
                <div className={'newsDetails'}>
                    <div className={'headline'}>{entry ? <b>{entry.headline}</b> : <TextLoader rows={2} />}</div>
                    <div className={'description'}>{entry ? entry.description : <TextLoader rows={2} />}</div>
                </div>
            </a>
            <Divider />

        </div>)}
        <Pagination  page={page} total={total} setPage={setPage} />

        <style jsx>{`
            .newsEntry {
                display: flex;
                align-items: center;
                margin: -20px;
                text-decoration: none;
            }

            .newsDetails {
                display: flex;
                align-items: center;
                flex: 1;
            }

            .link {
                width: 60px;
                padding: 20px;
            }

            .headline, .description {
                padding: 20px;
                width: 50%;
                font-size: 18px;
            }

            .headline b {
                color: ${COLORS.PRIMARY};
            }
            
            .spacer {
                height: 40px;
            }

            @media only screen and (max-width: 425px) {
                .newsEntry {
                    margin: 0;
                }

                .newsDetails {
                    flex-direction: column;
                }

                .link {
                    padding: 5px;
                    width: 40px;
                }

                .headline, .description {
                    padding: 5px;
                    width: 100%;
                }
            }
        `}</style>
    </>;
}