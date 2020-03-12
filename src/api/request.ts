export async function get<T>(url: string): Promise<T> {
    try {
        const response = await fetch(process.env.API_URL + url);
        return await response.json();
    } catch(error) {
        console.log(error);
    }
}