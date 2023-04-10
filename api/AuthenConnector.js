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
    return { status: 500 };
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
export const getDetail = async (param) => {
  try {
    const response = await request.get(
      `${HOST}/report?reportDate=${param.day}&groupId=${param.groupId}`
    );
    return response.data;
  } catch (error) {}
};
export const updateDetail = async (param) => {
  try {
    const groupId = localStorage.getItem("groupId");
    const response = await request.post(
      `${HOST}/report/update?groupId=${groupId}`,
      param
    );
    return response.data;
  } catch (error) {
    return { statusbar: 500 };
  }
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
export const getTransfer = async (param) => {
  const groupId = localStorage.getItem("groupId");
  const response = await request.get(
    `${HOST}/transfer/now-date?groupId=${groupId}`,
    param
  );
  return response.data;
};
export const accuracy = async () => {
  const groupId = localStorage.getItem("groupId");
  const response = await request.get(
    `${HOST}/transfer/accept?groupId=${groupId}`
  );
  return response.data;
};
export const reason = async () => {
  const response = await request.get(`${HOST}/reason`);
  return response.data;
};
export const groupRoleRoot = async () => {
  const response = await request.get(`${HOST}/groupRole`);
  return response.data;
};
export const groupRoleDetails = async (param) => {
  const response = await request.get(
    `${HOST}/groupRoleDetails?parentId=${param}`
  );
  return response.data;
};
export const getForLeave = async () => {
  const response = await request.get(`${HOST}/reason/save`);
  return response.data;
};
export const deleteLeave = async (param) => {
  const response = await request.delete(`${HOST}/reason/delete?id=${param}`);
  return response.data;
};
export const addLeave = async (param) => {
  const response = await request.post(`${HOST}/reason/save`, param);
  return response.data;
};
export const editLeave = async (param, id) => {
  const response = await request.put(`${HOST}/reason/edit?id=${id}`, {
    name: param,
  });
  return response.data;
};
export const getleaveId = async (param) => {
  const response = await request.get(`${HOST}/reason/details?id=${param}`);
  return response.data;
};
export const getView = async (param) => {
  try {
    const response = await request.get(`${HOST}/view/all?date=${param}`);
    return response.data;
  } catch (error) {
    return { status: 500 };
  }
};
export const updateDemarcation = async (demarcation, groupName, parentName) => {
  const response = await request.get(
    `${HOST}/groupRole/update?demarcation=${demarcation}&groupName=${groupName}&parentName=${parentName}`
  );
  return response.data;
};
export const getDemarcationDb = async (param) => {
  const response = await request.get(
    `${HOST}/groupRole/demarcation?groupId=${param}`
  );
  return response.data;
};
export const getViewDetail = async (param) => {
  const response = await request.get(
    `${HOST}/view/groupRoleViewDetails?reportDate=${param}`
  );
  return response.data;
};
export const deleteLisRes = async (param) => {
  const response = await request.post(`${HOST}/report/delete-rest`, param);
  return response.data;
};
export const addGroupRole = async (param) => {
  const response = await request.post(`${HOST}/groupRole/save`, param);
  return response.data;
};
export const deleteGroupRole = async (param) => {
  const response = await request.get(
    `${HOST}/groupRole/delete?groupName=${param}`
  );
  return response.data;
};
export const refreshToken = async (param) => {
  const response = await request.post(
    `${HOST}/api/refresh-token?refreshToken=${param}`
  );
  return response.data;
};
export const getNameAll = async (param) => {
  const response = await request.get(`${HOST}/getName`);
  return response.data;
};
export const viewRoot = async () => {
  const response = await request.get(`${HOST}/groupRole/view-root`);
  return response.data;
};
