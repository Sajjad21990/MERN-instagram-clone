import { GLOBAL_TYPES } from "./globalTypes";

import { postData } from "../../utils/fetchData";
import valid from "../../utils/validator";

export const login = (data) => async (dispatch) => {
  try {
    dispatch({ type: GLOBAL_TYPES.ALERT, payload: { loading: true } });

    const response = await postData("/auth/login", data);
    console.log(response);
    localStorage.setItem("firstLogin", true);
    dispatch({
      type: GLOBAL_TYPES.AUTH,
      payload: { token: response.data.access_token, user: response.data.user },
    });
    dispatch({
      type: GLOBAL_TYPES.ALERT,
      payload: { success: response.data.msg },
    });
  } catch (err) {
    console.error(err.response.data.msg);
    dispatch({
      type: GLOBAL_TYPES.ALERT,
      payload: { error: err.response.data.msg },
    });
  }
};

export const register = (data) => async (dispatch) => {
  const check = valid(data);

  if (check.errLength > 0)
    return dispatch({ type: GLOBAL_TYPES.ALERT, payload: check.errMsg });
  try {
    console.log(data);

    dispatch({ type: GLOBAL_TYPES.ALERT, payload: { loading: true } });

    const response = await postData("/auth/register", data);

    console.log(response);
    localStorage.setItem("firstLogin", true);
    dispatch({
      type: GLOBAL_TYPES.AUTH,
      payload: { token: response.data.access_token, user: response.data.user },
    });
    dispatch({
      type: GLOBAL_TYPES.ALERT,
      payload: { success: response.data.msg },
    });
  } catch (err) {
    console.error(err.response.data.msg);
    dispatch({
      type: GLOBAL_TYPES.ALERT,
      payload: { error: err.response.data.msg },
    });
  }
};

export const logout = () => async (dispatch) => {
  try {
    localStorage.removeItem("firstLogin");

    await postData("/auth/logout");
    window.location.href = "/";
  } catch (err) {
    console.error(err.response.data.msg);
    dispatch({
      type: GLOBAL_TYPES.ALERT,
      payload: { error: err.response.data.msg },
    });
  }
};

export const refreshToken = () => async (dispatch) => {
  const firsLogin = localStorage.getItem("firstLogin");
  if (firsLogin) {
    dispatch({ type: GLOBAL_TYPES.ALERT, payload: { loading: true } });
    try {
      const res = await postData("/auth/refresh_token");
      console.log(res.data);
      dispatch({
        type: GLOBAL_TYPES.AUTH,
        payload: {
          token: res.data.access_token,
          user: res.data.user,
        },
      });

      dispatch({ type: GLOBAL_TYPES.ALERT, payload: {} });
    } catch (err) {
      dispatch({
        type: GLOBAL_TYPES.ALERT,
        payload: { err: err.response.data.msg },
      });
      console.error(err.response.data.msg);
    }
  }
};
