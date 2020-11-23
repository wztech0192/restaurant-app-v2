import qs from "qs";

class FetchWrapper {
    token = undefined;
    baseURL = "";

    getHeader = () => {
        const header = { "Content-Type": "application/json" };
        if (this.token) {
            header.Authorization = `Bearer ${this.token}`;
        }
        return header;
    };

    setToken = token => {
        this.token = token;
    };
    setBaseURL = url => {
        this.baseURL = url;
    };

    paramOptions = { arrayFormat: "repeat" };
    getUrl = (url, params) => {
        let result = `${this.baseURL}/${url}`;

        if (params) {
            result += "?" + qs.stringify(params, this.paramOptions);
        }
        return result;
    };

    get = (url, params) =>
        fetch(this.getUrl(url, params), {
            method: "GET",
            headers: this.getHeader()
        });
    post = (url, data, params) =>
        fetch(this.getUrl(url, params), {
            method: "POST",
            headers: this.getHeader(),
            body: JSON.stringify(data)
        });
    delete = (url, params) =>
        fetch(this.getUrl(url, params), {
            method: "DELETE",
            headers: this.getHeader()
        });
    put = (url, data, params) =>
        fetch(this.getUrl(url, params), {
            method: "PUT",
            headers: this.getHeader(),
            body: JSON.stringify(data)
        });
}

export default new FetchWrapper();
