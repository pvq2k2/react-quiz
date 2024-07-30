export const FETCH_USER_LOGIN_SUCCESS = "FETCH_USER_LOGIN_SUCCESS";
export const USER_LOGOUT_SUCCESS = "USER_LOGOUT_SUCCESS";
export const FETCH_REFRESH_TOKEN = "FETCH_REFRESH_TOKEN";
export const loginAction = (data) => {
  return {
    type: FETCH_USER_LOGIN_SUCCESS,
    payload: data,
  };
};

export const refreshTokenAction = (data) => {
  return {
    type: FETCH_REFRESH_TOKEN,
    payload: data,
  };
};

export const logoutAction = (data) => {
  return {
    type: USER_LOGOUT_SUCCESS,
  };
};
