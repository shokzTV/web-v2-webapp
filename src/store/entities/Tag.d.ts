export interface Tag {
    id: number;
    name: string;
    description: string;
    image: string;
    lastAction: number | null;
}

export interface TagEntities {
    [x: number]: Tag;
}