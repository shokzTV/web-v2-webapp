export interface Article {
    id: number;
    title: string;
    body: string;
    cover: string;
    coverWEBP: string;
    coverJP2: string;
    status: string;
    created: number;
    author: {
        id: number;
        name: string;
        twitch: string;
        avatar: string;
        avatarWEBP: string;
        avatarJP2: string;
    };
    tags: number[];
}