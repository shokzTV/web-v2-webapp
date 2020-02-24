import { useCallback } from "react"

export function useShare(url: string, title: string): () => Promise<void> {
    return useCallback(async () => {
        //@ts-ignore
        if (navigator.share !== undefined) {
            try {
                //@ts-ignore
                await navigator.share({title, url});
            } catch(error) {
                console.error(error);
            }
        }
    }, [url, title])
}