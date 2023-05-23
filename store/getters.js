export default {
  getIsUser: (state) => state.isUser,
  getUserName: (state) => state.UserName,
  getDataInformationReport: (state) => state.dataInformationReport,
  getIsAuthenticated: (state) => state.isAuthenticated,
  getInfUsers: (state) => state.infUser,
  getNumberDeleteLabor: (state) =>
    state.dataInformationReport.numberDeleteLabor,
  getCodeDeleteLabor: (state) => state.dataInformationReport.codeDeleteLabor,
};
