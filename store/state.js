export default () => ({
  infUser: {},
  isAuthenticated: false,
  isUser: false,
  UserName: "",
  dataInformationReport: {
    demarcation: 0,
    partTimeNum: 0,
    studentNum: 0,
    transferRequests: [
      { transferNum: 0, type: 1, groupName: 0, transferId: "" },
      { transferNum: 0, type: 2, groupName: 0, transferId: "" },
    ],
    riceRequests: {
      riceEmp: 0,
      riceCus: 0,
      riceVip: 0,
      riceId: "",
    },
    restNum: 0,
    laborProductivity: 0,
    restRequests: [
      // {
      //   reasonId: "",
      //   restName: "",
      // },
    ],
    // restNum:,
  },
});
