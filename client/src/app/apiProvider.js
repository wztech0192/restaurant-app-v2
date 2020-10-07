import apiCaller from "common/fetchWrapper";

apiCaller.setBaseURL(process.env.REACT_APP_API_URL);

export const postLogin = data => apiCaller.post("account/login", data);
