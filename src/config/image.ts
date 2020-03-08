
export function getImageUrl(path: string): string {
    return `${process.env.API_URL}${path}`;
}