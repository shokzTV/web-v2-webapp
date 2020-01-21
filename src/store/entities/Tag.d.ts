export interface Tag {
    id: number;
    name: string;
    image: string;
}

export interface TagEntities {
    [x: number]: Tag;
}