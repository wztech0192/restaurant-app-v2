import apiCaller from "common/fetchWrapper";

apiCaller.setBaseURL(process.env.REACT_APP_API_URL);

export const postLogin = data => apiCaller.post("account/login", data);
export const postAccount = data => apiCaller.post("account", data);
export const putAccount = data => apiCaller.put("account", data);

export const getAccount = () => apiCaller.get("account");

export const postMenu = (menu, updateStatus) =>
    apiCaller.post(`menu?updateStatus=${updateStatus}`, menu);

export const deleteMenu = menuID => apiCaller.delete(`menu/${menuID}`);
export const getMenu = menuID => apiCaller.get(`menu/${menuID}`);
export const getActiveMenu = () => apiCaller.get("menu/active");
export const getAllMenu = () => apiCaller.get("menu/all");

export const postOrder = data => apiCaller.post("order", data);
export const getOrder = id => apiCaller.get(`order/${id}`);
export const getRecentOrder = () => apiCaller.get(`order/recent/10`);
