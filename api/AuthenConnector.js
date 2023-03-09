import { HOST } from "../constants/host/host";
import request from "./AxiosConnector";
export const signInAPI = async (username, password) => {
  try {
    const response = await request.post(`${HOST}/auth/api/v1/users/sign-in`, {
      username,
      password,
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
