import apiCaller from "common/fetchWrapper";

apiCaller.setBaseURL(process.env.REACT_APP_API_URL);

export const postLogin = data => apiCaller.post("account/login", data);
export const postAccount = data => apiCaller.post("account", data);

export const getAccount = () => apiCaller.get("account");
