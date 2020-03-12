import { get } from "./request";

export async function fetchVersion(): Promise<string> {
    return await get<string>('/version');
}
