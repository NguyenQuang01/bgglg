export default {
  SET_STATE_ISUSER(state, data) {
    state.isUser = data;
  },
  SET_STATE_USERNAME(state, data) {
    state.UserName = data;
  },
  SET_STATE_LABOR(state, data) {
    state.dataInformationReport.restNum = data;
  },
  SET_STATE_DEMARCATION(state, data) {
    state.dataInformationReport.demarcation = data;
  },
  SET_STATE_SEASONAL(state, data) {
    state.dataInformationReport.partTimeNum = Number(data);
  },
  SET_STATE_STUDENT(state, data) {
    state.dataInformationReport.studentNum = data;
  },
  SET_STATE_PROFESSIONLABOR(state, data) {
    state.dataInformationReport.professionLabor = Number(data);
  },
  SET_STATE_PROFESSIONOTLABOR(state, data) {
    state.dataInformationReport.professionNotLabor = Number(data);
  },
  SET_STATE_TRANSFER(state, data) {
    state.dataInformationReport.transferRequests[0].transferNum =
      data.transferNum;
    state.dataInformationReport.transferRequests[0].groupId = data.groupId;
    state.dataInformationReport.transferRequests[0].transferId =
      data.transferId;
  },
  SET_STATE_SUPPORT(state, data) {
    state.dataInformationReport.transferRequests[1].transferNum =
      data.transferNum;
    state.dataInformationReport.transferRequests[1].groupId = data.groupId;
    state.dataInformationReport.transferRequests[1].transferId =
      data.transferId;
  },
  SET_STATE_MEAL(state, data) {
    state.dataInformationReport.riceRequests.riceEmp = Number(data.staff);
    state.dataInformationReport.riceRequests.riceCus = Number(data.guest);
    state.dataInformationReport.riceRequests.riceVip = Number(data.guestVip);
    state.dataInformationReport.riceRequests.riceId = data.riceId;
  },
  SET_STATE_PRODUCTIVITY(state, data) {
    state.dataInformationReport.laborProductivity = data;
  },
  SET_STATE_ARRLABOR(state, data) {
    state.dataInformationReport.restRequests = data;
  },
  SET_STATE_ISAUTHEN(state, data) {
    state.isAuthenticated = data;
  },
  SET_STATE_INFUSER(state, data) {
    state.infUser = data;
  },
  SET_STATE_NumberDeleteLabor(state, data) {
    state.numberDeleteLabor = data;
  },
  SET_STATE_codeDeleteLabor(state, data) {
    state.codeDeleteLabor = String(data);
  },
};
