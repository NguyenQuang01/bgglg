import { HOST } from "../constants/host/host";
import request from "./AxiosConnector";
//acc
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
//report
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
export const getReportByYesterday = async (param) => {
  try {
    const response = await request.get(
      `${HOST}/getReportByYesterday?groupId=${param}`
    );
    return response.data;
  } catch (error) {}
};
///
export const addAccount = async (param) => {
  const response = await request.post(`${HOST}/api/save`, param);
  return response.data;
};
export const getAllAcc = async (pageNo, pageSize, param) => {
  const response = await request.post(
    `${HOST}/getAllUser?pageNo=${pageNo}&pageSize=${pageSize}`,
    param
  );
  return response.data;
};
export const deleteAcc = async (id) => {
  const response = await request.post(`${HOST}/api/delete?id=${id}`, {});
  return response.data;
};
export const updateAcc = async (userId, param) => {
  const response = await request.post(`${HOST}/api/update?userId=${userId}`, {
    password: param || 1,
  });
  return response.data;
};
//group
export const getTransfer = async (param) => {
  const groupId = localStorage.getItem("groupId");
  const response = await request.get(
    `${HOST}/transfer/now-date?groupId=${groupId}&reportDate=${param}`
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
// export const deleteGroupRole = async () => {
//   const response = await request.get(`${HOST}/groupRole`);
//   return response.data;
// };
export const groupRoleDetails = async (param) => {
  const response = await request.get(
    `${HOST}/groupRoleDetails?parentId=${param}`
  );
  return response.data;
};
//
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
//view
export const getView = async (param) => {
  try {
    const response = await request.get(`${HOST}/view/all?date=${param}`);
    return response.data;
  } catch (error) {
    return { status: 500 };
  }
};
export const viewExcel = async (param) => {
  try {
    const response = await request.get(
      `${HOST}/view/exportExcel?reportDate=${param}`
    );
    return response.data;
  } catch (error) {
    return { status: 500 };
  }
};
export const viewDonViLe = async (param) => {
  const response = await request.get(
    `${HOST}/view/viewDonViLe?reportDate=${param}`
  );
  return response.data;
};
//demarcation
export const updateDemarcation = async (demarcation, id, name) => {
  const response = await request.get(
    `${HOST}/groupRole/update?name=${name}&demarcation=${demarcation}&id=${id}`
  );
  return response.data;
};
export const getDemarcationDb = async (param) => {
  const response = await request.get(
    `${HOST}/groupRole/demarcation?groupId=${param}`
  );
  return response.data;
};
export const getAllDemarcation = async (groupName, pageNo, pageSize) => {
  const response = await request.get(
    `${HOST}/groupRole/getAllDemarcation?groupName=${groupName}&pageNo=${pageNo}&pageSize=${pageSize}`
  );
  return response.data;
};
//
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
  const response = await request.delete(
    `${HOST}/groupRole/delete?groupId=${param}`
  );
  return response.data;
};
export const refreshToken = async (param) => {
  try {
    const response = await request.post(
      `${HOST}/api/refresh-token?refreshToken=${param}`
    );
    return response.data;
  } catch (error) {
    return { status: 500 };
  }
};
export const getNameAll = async (param) => {
  const response = await request.get(`${HOST}/getName`);
  return response.data;
};
export const viewRoot = async (param) => {
  const response = await request.get(
    `${HOST}/groupRole/view-root?reportDate=${param}`
  );
  return response.data;
};
export const searchAllDeleteTm = async () => {
  const response = await request.get(`${HOST}/groupRoleDeleteTm`);
  return response.data;
};
//employees
export const addEmployee = async (param) => {
  const response = await request.post(`${HOST}/employee/save`, param);
  return response.data;
};
export const getAllEmployee = async (pageNo, pageSize, param) => {
  const response = await request.post(
    `${HOST}/employee/getEmployee?pageNo=${pageNo}&pageSize=${pageSize}`,
    param
  );
  return response.data;
};
export const editEmployee = async (param) => {
  const response = await request.post(`${HOST}/employee/update`, param);
  return response.data;
};
export const deleteEmployee = async (param) => {
  const response = await request.deleteWithPayload(
    `${HOST}/employee/delete`,
    param
  );
  return response.data;
};
export const deleteEm = async (param) => {
  const response = await request.post(`${HOST}/report/delete-group-emp`, param);
  return response.data;
};
export const excelEmployee = async (param) => {
  let formData = new FormData();
  formData.append("file", param);
  const response = await request.post(`${HOST}/employee/import`, formData);
  return response.data;
};
export const ExportExcelEmployee = async () => {
  const response = await request.get(`${HOST}/employee/exportExcel`);
  return response.data;
};
///
export const getIdsTomay = async () => {
  const response = await request.get(`${HOST}/getIdsTomay`);
  return response.data;
};
//
