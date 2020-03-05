export interface Organizer {
    id: number;
    name: string;
    description: string;
    icon: string;
    icon_webp: string;
    icon_jpeg_2000: string;
    logo: string;
    logo_webp: string;
    logo_jpeg_2000: string;
    events: number;
}

export interface OrganizerEntities {
    [x: number]: Organizer;
}