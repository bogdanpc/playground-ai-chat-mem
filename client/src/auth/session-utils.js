const tokenKey = "authToken";

export const isUserAuthenticated = () =>
  sessionStorage.getItem(tokenKey) != null;

export const setAccessToken = (accessToken) =>
  sessionStorage.setItem(tokenKey, accessToken);

export const setRole = (role) =>
  sessionStorage.setItem("role", role);


export const accessToken = () => sessionStorage.getItem(tokenKey);

export const role = () => sessionStorage.getItem("role");

export const closeSession = () => {
  sessionStorage.removeItem(tokenKey);
};
