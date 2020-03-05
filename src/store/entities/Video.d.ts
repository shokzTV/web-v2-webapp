export interface Video {
    id: number;
    title: string;
    source: string;
    thumbnail: string;
    thumbnailWEBP: string;
    thumbnailJP2: string;
}

export interface VideoEntities {
    [x: number]: Video;
}