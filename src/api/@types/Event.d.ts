import { EventLink } from './EventLink';
import { Organizer } from './Organizer';
import { Tag } from './Tag';

export type EventDescriptionType = 'description' | 'information' | 'advice';

export interface Event {
    id: number;
    organizer: Organizer;
    name: string;
    descriptionShort: string;
    start: number | null;
    end: number | null;
    country: string;
    location: string;
    pricePool: string;
    banner: string;
    bannerJP2: string;
    bannerWEBP: string;
    description: string;
    descriptionType: EventDescriptionType;
    disclaimer: string;
    isFeatured: boolean;
    isMainEvent: boolean;
    organizerLogo: string;
    organizerLogoJP2: string;
    organizerLogoWEBP: string;
    tags: Tag[];
    links: EventLink[];
}