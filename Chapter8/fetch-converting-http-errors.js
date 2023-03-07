class FetchError extends Error {
    constructor(response, message = "HTTP error " + response.status) {
        super(message);
        this.response = response;
    }
}
const myFetch = (...args) => {
    return fetch(...args).then(response => {
        if (!response.ok) {
            throw new FetchError(response);
        }
        return response;
    });
};
