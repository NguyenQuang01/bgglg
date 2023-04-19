export default () => ({
  infUser: {},
  isAuthenticated: false,
  isUser: false,
  UserName: "",
  dataInformationReport: {
    demarcation: 0,
    partTimeNum: 0,
    studentNum: 0,
    professionLabor: 0,
    professionNotLabor: 0,
    transferRequests: [
      {
        transferNum: 0,
        type: 1,
        groupId: null,
        transferId: null,
      },
      {
        transferNum: 0,
        type: 2,
        groupId: null,
        transferId: null,
      },
    ],
    riceRequests: {
      riceEmp: 0,
      riceCus: 0,
      riceVip: 0,
      riceId: null,
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
