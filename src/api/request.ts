export async function get<T>(url: string): Promise<T> {
    const response = await fetch(process.env.API_URL + url);
    return await response.json();
}