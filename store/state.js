export default () => ({
  isUser: false,
  UserName: "",
  dataInformationReport: {
    demarcation: 0,
    partTimeNum: 0,
    studentNum: 0,
    transferRequests: [
      { transferNum: 0, type: 1 },
      { transferNum: 0, type: 2 },
    ],
    riceRequests: {
      riceEmp: 0,
      riceCus: 0,
      riceVip: 0,
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
