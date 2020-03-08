import { useState, useMemo, useEffect } from "react"

interface IdEntry {
    id: number;
}

export function usePagination<T extends IdEntry = IdEntry>(
    pageSize: number = 10,
    idLoader: () => Promise<number[]>,
    entryLoader: (ids: number[]) => Promise<T[]>,
): {
    total: number;
    page: number;
    setPage: (page: number) => void;
    entries: T[];
} {
    const [page, setPage] = useState(1);
    const [ids, setIds] = useState<number[]>([]);
    const [loaded, setLoaded] = useState<number[]>([]);
    const [data, setData] = useState<T[]>([]);
    const total = useMemo(
        () => ids.length % pageSize === 0 ? (ids.length / pageSize) : Math.round((ids.length / pageSize) + .5), 
        [ids, pageSize]
    );
    const pageIds = useMemo<number[]>(() => ids.length > 0 ? ids.slice((page - 1) * pageSize, page * pageSize) : [], [page, ids, pageSize]);

    useEffect(() => {
        const loadIds = async () => {
            setIds(await idLoader());
        };
        loadIds();
    }, []);

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

    const entries = useMemo(() => pageIds.map((id) => data.find((entity) => entity.id! === id)), [pageIds, data]);

    return {
        entries,
        page,
        setPage,
        total,
    }
}