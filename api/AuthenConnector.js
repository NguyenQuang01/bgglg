import { HOST } from "../constants/host/host";
import request from "./AxiosConnector";
export const signInAPI = async (param) => {
  try {
    const response = await request.postLogin(`${HOST}/api/login`, {
      userLogin: param.user,
      password: param.pass,
    });
    return response.data;
  } catch (error) {}
};
export const signUpAPI = async (username, email, password) => {
  const response = await request.post(`${HOST}/v1/auth/sign-up`, {
    username,
    email,
    password,
  });
  return response.data;
};
export const getDetail = async (param) => {
  const response = await request.get(
    `${HOST}/report?reportDate=${param.day}&groupId=${param.groupId}`
  );
  return response.data;
};
export const updateDetail = async (param) => {
  const response = await request.post(`${HOST}/report/update?groupId=2`, param);
  return response.data;
};
export const saveDetail = async (param) => {
  const groupId = localStorage.getItem("groupId");
  try {
    const response = await request.post(
      `${HOST}/report/save?groupId=${groupId}`,
      param
    );

    return response.data;
  } catch (error) {
    return { status: "500", name: "err" };
  }
};

export const addAccount = async (param) => {
  const response = await request.post(`${HOST}/api/save`, param);
  return response.data;
};
