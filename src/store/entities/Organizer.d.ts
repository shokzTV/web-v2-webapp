export interface Organizer {
    id: number;
    name: string;
    description: string;
    logo_small: string;
    logo: string;
    events: number;
}

export interface OrganizerEntities {
    [x: number]: Organizer;
}