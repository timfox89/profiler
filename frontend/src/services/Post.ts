export default async function Post(
    url: string,
    body: Record<string, unknown>,
    headers:Record<string, unknown> = {}
    ): Promise<any>{
    try {
        console.log(body);
        const response: Response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                ...headers
            },
            body: JSON.stringify(body)
        });
        return response.json();
    } catch (e: any) {
        throw new Error(e);
    }
}
