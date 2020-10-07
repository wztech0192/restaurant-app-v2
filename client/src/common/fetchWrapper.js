class FetchWrapper {
    token = undefined;
    baseURL = "";

    getHeader = () => ({
        Authorization: `Bearer ${this.token}`,
        "Content-Type": "application/json"
    });

    setToken = token => {
        this.token = token;
    };
    setBaseURL = url => {
        this.baseURL = url;
    };

    getUrl = url => {
        return `${this.baseURL}/${url}`;
    };

    get = url =>
        fetch(this.getUrl(url), {
            method: "GET",
            headers: this.getHeader()
        });
    post = (url, data) =>
        fetch(this.getUrl(url), {
            method: "POST",
            headers: this.getHeader(),
            body: JSON.stringify(data)
        });
    delete = url =>
        fetch(this.getUrl(url), {
            method: "DELETE",
            headers: this.getHeader()
        });
    put = (url, data) =>
        fetch(this.getUrl(url), {
            method: "PUT",
            headers: this.getHeader(),
            body: JSON.stringify(data)
        });
}

export default new FetchWrapper();
