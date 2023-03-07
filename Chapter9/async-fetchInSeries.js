async function fetchInSeries(urls) {
    const results = [];
    for (const url of urls) {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("HTTP error " + response.status);
        }
        results.push(await response.json());
    }
    return results;
}
(async () => {
    try {
        const results = await fetchInSeries(["1.json", "2.json", "3.json"]);
        console.log(results);
    } catch (err) {
        console.error(err);
    }
})();
