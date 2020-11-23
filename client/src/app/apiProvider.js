import apiCaller from "common/fetchWrapper";

apiCaller.setBaseURL(process.env.REACT_APP_API_URL);

export const postLogin = data => apiCaller.post("account/login", data);
export const postAccount = data => apiCaller.post("account", data);
export const putAccount = data => apiCaller.put("account", data);

export const getAccount = () => apiCaller.get("account");

export const postMenu = (menu, updateStatus) => apiCaller.post(`menu?updateStatus=${updateStatus}`, menu);

export const deleteMenu = menuID => apiCaller.delete(`menu/${menuID}`);
export const getMenu = menuID => apiCaller.get(`menu/${menuID}`);
export const getActiveMenu = () => apiCaller.get("menu/active");
export const getAllMenu = () => apiCaller.get("menu/all");

export const postOrder = data => apiCaller.post("order", data);
export const putOrderStatus = (id, status) => apiCaller.put(`order/${id}/status/${status}`);
export const getOrder = id => apiCaller.get(`order/${id}`);
export const getRecentOrder = () => apiCaller.get(`order/recent/10`);
export const getOrderQuery = filter => apiCaller.get("order/query", filter);
export const getOrderStatus = ids => apiCaller.get("order/status", { ids });

export const getOrderRules = () => apiCaller.get("orderRules");
export const postOrderRule = rule => apiCaller.post("orderRules", rule);
export const deleteOrderRules = ruleName => apiCaller.delete(`orderRules/${ruleName}`);
