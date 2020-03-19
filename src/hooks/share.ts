import { useCallback } from "react"

export function useShare(url: string, title: string, text?: string): () => Promise<void> {
    return useCallback(async () => {
        //@ts-ignore
        if (navigator.share !== undefined) {
            try {
                //@ts-ignore
                await navigator.share({title, url, text});
            } catch(error) {
                console.error(error);
            }
        }
    }, [url, title])
}
