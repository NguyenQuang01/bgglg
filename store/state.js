export default () => ({
  infUser: {},
  isAuthenticated: false,
  isUser: false,
  UserName: "",
  numberDeleteLabor: 0,
  codeDeleteLabor: [],
  dataInformationReport: {
    demarcation: 0,
    partTimeNum: 0,
    studentNum: 0,
    professionLabor: 0,
    professionNotLabor: 0,
    transferRequests: [],
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
