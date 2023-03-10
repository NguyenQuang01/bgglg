import { HOST } from "../constants/host/host";
import request from "./AxiosConnector";
export const signInAPI = async (param) => {
  try {
    const response = await request.postLogin(`${HOST}/api/login`, {
      userLogin: param.user,
      password: param.pass,
    });
    return response.data;
  } catch (error) {
    console.log(error, 44444);
  }
};
export const signUpAPI = async (username, email, password) => {
  const response = await request.post(`${HOST}/v1/auth/sign-up`, {
    username,
    email,
    password,
  });
  return response.data;
};
export const getDetail = async () => {
  const response = await request.get(
    `${HOST}/report/detail?userGroupId=1&orderDate=2023-03-13`
  );
  return response.data;
};
export const saveDetail = async (param) => {
  const response = await request.post(`${HOST}/report/save`, param);
  return response.data;
};
