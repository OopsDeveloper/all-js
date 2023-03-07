function fetchInSeries(urls) {
    let chain = Promise.resolve([]);
    for (const url of urls) {
        chain = chain.then(results => {
            return fetch(url)
                .then(response => {
                    if (!response.ok) {
                        throw new Error("HTTP error " + response.status);
                    }
                    return response.json();
                })
                .then(result => {
                    results.push(result);
                    return results;
                });
        });
    }
    return chain;
}
fetchInSeries(["1.json", "2.json", "3.json"])
    .then(results => {
        console.log(results);
    })
    .catch(err => {
        console.error(err);
    });
