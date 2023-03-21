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
    state.dataInformationReport.partTimeNum = data;
  },
  SET_STATE_STUDENT(state, data) {
    state.dataInformationReport.studentNum = data;
  },
  SET_STATE_TRANSFER(state, data) {
    state.dataInformationReport.transferRequests[0].transferNum = data;
  },
  SET_STATE_SUPPORT(state, data) {
    state.dataInformationReport.transferRequests[1].transferNum = data;
  },
  SET_STATE_MEAL(state, data) {
    state.dataInformationReport.riceRequests.riceEmp = data.staff;
    state.dataInformationReport.riceRequests.riceCus = data.guest;
    state.dataInformationReport.riceRequests.riceVip = data.guestVip;
  },
  SET_STATE_PRODUCTIVITY(state, data) {
    state.dataInformationReport.laborProductivity = data;
  },
  SET_STATE_ARRLABOR(state, data) {
    state.dataInformationReport.arrLabor = data;
  },
};
