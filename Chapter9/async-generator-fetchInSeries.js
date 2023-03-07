async function* fetchInSeries([...urls]) {
    for (const url of urls) {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("HTTP error " + response.status);
        }
        yield response.json();
    }
}
