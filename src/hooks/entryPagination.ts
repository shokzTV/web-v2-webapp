import { useState, useMemo, useEffect } from "react"

interface IdEntry {
    id: number;
}

export function usePagination<T extends IdEntry = IdEntry>(
    pageSize: number = 10,
    ids: (number|string)[],
    preloaded: T[],
    entryLoader: (ids: (number | string)[]) => Promise<T[]>,
    access = 'id'
): {
    total: number;
    page: number;
    setPage: (page: number) => void;
    entries: T[];
} {
    const [page, setPage] = useState(1);
    const [loaded, setLoaded] = useState<(number | string)[]>(preloaded.map(({id}) => id));
    const [data, setData] = useState<T[]>(preloaded);
    const total = useMemo(
        () => ids.length > 0 ? (ids.length % pageSize === 0 ? (ids.length / pageSize) : Math.round((ids.length / pageSize) + .5)) : 2, 
        [ids, pageSize]
    );
    const pageIds = useMemo<(number | string)[]>(() => ids.length > 0 ? ids.slice((page - 1) * pageSize, page * pageSize) : [], [page, ids, pageSize]);

    useEffect(() => {
        const loadEntries = async () => {
            const toLoad = pageIds.filter((id) => !loaded.includes(id));
            if(toLoad.length > 0) {
                setData([...data, ...await entryLoader(toLoad)]);
                setLoaded([...loaded, ...toLoad]);
            }
        }
        loadEntries();
    }, [pageIds, loaded]);

    const entries = useMemo(() => pageIds.length > 0 ? pageIds.map((id) => data.find((entity) => entity[access]! === id)) : Array(pageSize).fill(undefined), [pageIds, data]);

    return {
        entries,
        page,
        setPage,
        total,
    }
}