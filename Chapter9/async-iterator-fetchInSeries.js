function fetchInSeries([...urls]) {
    const asyncIteratorPrototype =
        Object.getPrototypeOf(
            Object.getPrototypeOf(
                async function*(){}.prototype
            )
        );
    let index = 0;
    return Object.assign(
        Object.create(asyncIteratorPrototype),
        {
            async next() {
                if (index >= urls.length) {
                    return {done: true};
                }
                const url = urls[index++];
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error("Error getting URL: " + url);
                }
                return {value: await response.json(), done: false};
            }
        }
    );
}
