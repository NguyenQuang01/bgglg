export default {
  SET_STATE_ISUSER(state, data) {
    state.isUser = data;
  },
  SET_STATE_USERNAME(state, data) {
    state.UserName = data;
  },
  SET_STATE_LABOR(state, data) {
    state.dataInformationReport.labor = data;
  },
  SET_STATE_DEMARCATION(state, data) {
    state.dataInformationReport.demarcation = data;
  },
  SET_STATE_SEASONAL(state, data) {
    state.dataInformationReport.seasonal = data;
  },
  SET_STATE_STUDENT(state, data) {
    state.dataInformationReport.student = data;
  },
  SET_STATE_TRANSFER(state, data) {
    state.dataInformationReport.transfer = data;
  },
  SET_STATE_SUPPORT(state, data) {
    state.dataInformationReport.support = data;
  },
  SET_STATE_MEAL(state, data) {
    state.dataInformationReport.meal = data;
  },
  SET_STATE_PRODUCTIVITY(state, data) {
    state.dataInformationReport.productivity = data;
  },
  SET_STATE_ARRLABOR(state, data) {
    state.dataInformationReport.arrLabor = data;
  },
};
