export interface Organizer {
    id: number;
    name: string;
    description: string;
    icon: string;
    logo: string;
    events: number;
}

export interface OrganizerEntities {
    [x: number]: Organizer;
}