import apiCaller from "common/fetchWrapper";

apiCaller.setBaseURL(process.env.REACT_APP_API_URL);

export const postLogin = data => apiCaller.post("account/login", data);
export const postAccount = data => apiCaller.post("account", data);
export const putAccount = data => apiCaller.put("account", data);

export const getAccount = () => apiCaller.get("account");

export const getMenu = menuName => apiCaller.get("menu/" + menuName);
export const getAllMenu = () => apiCaller.get("menu");
