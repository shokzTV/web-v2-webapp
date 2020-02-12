export interface Video {
    id: number;
    title: string;
    source: string;
    thumbnail: string;
}

export interface VideoEntities {
    [x: number]: Video;
}