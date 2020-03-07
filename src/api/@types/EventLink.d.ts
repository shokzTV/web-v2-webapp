export type EventLinkType = 'homepage' | 'liquipedia' | 'custom';

export interface EventLink {
    id: number;
    event: number;
    linkType: EventLinkType;
    name: string;
    link: string;
}