export default () => ({
  isUser: false,
  UserName: "",
  dataInformationReport: {
    demarcation: "",
    partTimeNum: "",
    studentNum: "",
    transferRequests: [
      { transferNum: "", type: 1 },
      { transferNum: "", type: 2 },
    ],
    riceRequests: {
      riceEmp: "",
      riceCus: "",
      riceVip: "",
    },
    restNum: "",
    laborProductivity: "",
    restRequests: [
      // {
      //   reasonId: "",
      //   restName: "",
      // },
    ],
    // restNum:,
  },
});
