export default () => ({
  infUser: {},
  isAuthenticated: false,
  isUser: false,
  UserName: "",
  dataInformationReport: {
    numberDeleteLabor: 0,
    codeDeleteLabor: [],
    demarcation: 0,
    demarcationAvailable: 0,
    partTimeNum: 0,
    studentNum: 0,
    id: 0,
    professionLabor: 0,
    professionNotLabor: 0,
    transferRequests: [],
    riceRequests: {
      riceEmp: 0,
      riceCus: 0,
      riceVip: 0,
      riceId: 0,
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
