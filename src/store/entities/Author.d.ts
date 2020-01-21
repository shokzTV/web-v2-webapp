export interface Author {
    id: number;
    twitch: number;
    name: string;
    avatar: string;
    title: string;
}

export interface AuthorEntities {
    [x: number]: Author;
}