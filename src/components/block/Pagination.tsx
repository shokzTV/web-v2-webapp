import { ReactElement, useMemo } from "react";
import classNames from "classnames";
import { COLORS } from "../../style/colors";

interface Props {
    page: number;
    setPage: (id: number) => void;
    total: number;
}

export default function Pagination({total, page, setPage}: Props): ReactElement | null {
    const pagesOfIntrest = useMemo(() => {
        if(page <= 3) {
            return [...Array(total).keys()].slice(0, 5).map((id) => id + 1);
        } else if(total - page >= 3) {
            return [total - 4, total - 3, total - 2, total - 1, total];
        }

        return [page - 2, page - 1, page, page + 1, page + 2];
    }, [page, total]);

    if(total > 1) {
        return <div className={'paginationWrapper'}>
            <div className={'pagination'}>
                <div className={classNames('page', 'prev', {disabled: page === 1})} onClick={() => setPage(page > 1 ? --page : page)}>
                    <svg viewBox="64 64 896 896" focusable="false" data-icon="left" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M724 218.3V141c0-6.7-7.7-10.4-12.9-6.3L260.3 486.8a31.86 31.86 0 000 50.3l450.8 352.1c5.3 4.1 12.9.4 12.9-6.3v-77.3c0-4.9-2.3-9.6-6.1-12.6l-360-281 360-281.1c3.8-3 6.1-7.7 6.1-12.6z"></path></svg>
                </div>
    
                {pagesOfIntrest.map((currentPage) => <div key={currentPage}
                                                          onClick={() => setPage(currentPage)}
                                                          className={classNames('page', {active: currentPage === page})}>
                    {currentPage}
                </div>)}

                <div className={classNames('page', 'next', {disabled: page === total})} onClick={() => setPage(page < total ? ++page : total)}>
                    <svg viewBox="64 64 896 896" focusable="false" data-icon="right" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M765.7 486.8L314.9 134.7A7.97 7.97 0 00302 141v77.3c0 4.9 2.3 9.6 6.1 12.6l360 281.1-360 281.1c-3.9 3-6.1 7.7-6.1 12.6V883c0 6.7 7.7 10.4 12.9 6.3l450.8-352.1a31.96 31.96 0 000-50.4z"></path></svg>
                </div>
            </div>
    
            <style jsx>{`
                .paginationWrapper {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    padding-bottom: 20px;
                }

                .page {
                    font-size: 16px;
                    padding: 5px 10px;
                    border: 1px solid #CCC;
                    border-radius: 4px;
                    margin: 0 5px;
                    cursor: pointer;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }

                .active {
                    color: ${COLORS.PRIMARY};
                    border-color: ${COLORS.PRIMARY}; 
                }

                .next, .prev {
                    font-size: 12px;
                    padding: 8px;
                }

                .disabled {
                    cursor: default;
                }

                .disabled svg {
                    fill: #CCC;
                }

                .pagination {
                    display: flex;
                }
            `}</style>
        </div>;
    }

    return null;
}