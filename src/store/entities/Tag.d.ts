export interface Tag {
    id: number;
    name: string;
    description: string;
    image: string;
    imageWEBP: string;
    imageJP2: string;
    lastAction: number | null;
}

export interface TagEntities {
    [x: number]: Tag;
}