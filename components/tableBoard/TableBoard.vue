<template lang="">
  <div>
    <table>
      <tr>
        <th>Bộ phận</th>
        <th>Văn phòng</th>
        <th>XÍ nghiệp</th>
        <th>Lao động báo năng suất</th>
        <th>Số lao động nghỉ</th>
        <th colspan="2">Tỉ lệ %</th>
        <th>Tổng lao động báo năng suất</th>
        <th>Báo cơm</th>
      </tr>
      <!-- <tr v-for="(item, index) in valueTable">
        <td class="font-bold backgroundBlue">{{ item.department }}</td>
        <td>{{ item.totalEmp ||0 }}</td>
        <td>{{ item.totalEmp ||0 }}</td>
        <td>{{ item.laborProductivityTeam||0 }}</td>
        <td>{{ item.restEmp||0 }}</td>
        <td>{{ item.ratio||0 }}</td> -->
      <!-- <td rowspan="2">afds</td> -->
      <!-- rowspan="6"  -->
      <!-- <td class="font-bold">1682.0</td> -->
      <!-- <td v-if="index === 0" :rowspan="valueTable.length" class="font-bold">
          {{ laborProductivity }}
        </td>
        <td></td>
      </tr> -->
      <tr>
        <td class="font-bold backgroundBlue">Văn phòng</td>
        <td class="font-bold">{{ office.totalEmp || "" }}</td>
        <td class="font-bold"></td>
        <td class="font-bold">{{ office.laborProductivityTeam || "" }}</td>
        <td class="font-bold">{{ office.restEmp || "" }}</td>
        <td class="font-bold">{{ radioOffice.toFixed(2) || "" }}</td>
        <td class="font-bold" rowspan="2">
          {{ totalRadioVPDVL.toFixed(2) || "" }}
        </td>
        <td class="font-bold" rowspan="6">{{ totalLaborReports }}</td>
        <td>
          <div>Nhân viên:{{ totalRiceCus || "" }}</div>
          <div>khách:{{ totalRiceEmp || "" }}</div>
          <div>khách vip:{{ totalRiceVip || "" }}</div>
        </td>
      </tr>
      <tr>
        <td class="font-bold backgroundBlue">Đơn vị lẻ</td>
        <td class="font-bold"></td>
        <td class="font-bold">{{ oddUnit.totalEmp || "" }}</td>
        <td class="font-bold">{{ oddUnit.laborProductivityTeam || "" }}</td>
        <td class="font-bold">{{ oddUnit.restEmp || "" }}</td>
        <td class="font-bold">{{ radioOddUnit.toFixed(2) || "" }}</td>

        <td>
          <!-- <div>Nhân viên:{{ riceCus }}</div>
          <div>khách:{{ riceEmp }}</div>
          <div>khách vip:{{ riceVip }}</div> -->
        </td>
      </tr>
      <tr>
        <td class="font-bold backgroundBlue">Tổ may (không tính thời vụ)</td>
        <td class="font-bold"></td>
        <td class="font-bold">{{ sewingTeamNo.totalEmp || "" }}</td>
        <td class="font-bold">
          {{ sewingTeamNo.laborProductivityTeam || "" }}
        </td>
        <td class="font-bold">{{ sewingTeamNo.restEmp || "" }}</td>
        <td class="font-bold" colspan="2">
          {{ radioSewingTeamNo.toFixed(2) || "" }}
        </td>

        <td>
          <!-- <div>Nhân viên:{{ riceCus }}</div>
          <div>khách:{{ riceEmp }}</div>
          <div>khách vip:{{ riceVip }}</div> -->
        </td>
      </tr>
      <tr>
        <td class="font-bold backgroundBlue">Học sinh chưa báo năng suất</td>
        <td class="font-bold"></td>
        <td class="font-bold">{{ studentsNotReported.totalEmp || "" }}</td>
        <td class="font-bold">
          {{ studentsNotReported.laborProductivityTeam || "" }}
        </td>
        <td class="font-bold">{{ studentsNotReported.restEmp || "" || "" }}</td>
        <td class="font-bold" colspan="2">
          {{ radioStudentsNotReported.toFixed(2) || "" }}
        </td>

        <td>
          <!-- <div>Nhân viên:{{ riceCus }}</div>
          <div>khách:{{ riceEmp }}</div>
          <div>khách vip:{{ riceVip }}</div> -->
        </td>
      </tr>
      <tr>
        <td class="font-bold backgroundBlue">Thời vụ tổ may</td>
        <td class="font-bold"></td>
        <td class="font-bold">{{ sewingTeamTime.totalEmp || "" }}</td>
        <td class="font-bold">
          {{ sewingTeamTime.laborProductivityTeam || "" }}
        </td>
        <td class="font-bold">{{ sewingTeamTime.restEmp || "" }}</td>
        <td class="font-bold" colspan="2">
          {{ radioSewingTeamTime.toFixed(2) || "" }}
        </td>

        <td>
          <!-- <div>Nhân viên:{{ riceCus }}</div>
          <div>khách:{{ riceEmp }}</div>
          <div>khách vip:{{ riceVip }}</div> -->
        </td>
      </tr>
      <tr>
        <td class="font-bold backgroundBlue">Thời vụ đơn vị lẻ</td>
        <td class="font-bold"></td>
        <td class="font-bold">{{ seasonalUnit.totalEmp || "" }}</td>
        <td class="font-bold">
          {{ seasonalUnit.laborProductivityTeam || "" }}
        </td>
        <td class="font-bold">{{ seasonalUnit.restEmp || "" }}</td>
        <td class="font-bold" colspan="2">
          {{ radioSeasonalUnit.toFixed(2) || "" }}
        </td>

        <td>
          <!-- <div>Nhân viên:{{ riceCus }}</div>
          <div>khách:{{ riceEmp }}</div>
          <div>khách vip:{{ riceVip }}</div> -->
        </td>
      </tr>
      <tr>
        <td class="font-bold backgroundBlue">Tổng thực tế làm việc</td>
        <td class="font-bold">{{ totalActualWorking.Office || "" }}</td>
        <td class="font-bold">{{ totalActualWorking.Enterprise || "" }}</td>
        <td class="font-bold">
          {{ totalActualWorking.Laborreportsproductivity || "" }}
        </td>
        <td class="font-bold">
          {{ this.totalActualWorking.Numberleave || "" }}
        </td>
        <td class="font-bold" colspan="2">
          {{ this.totalActualWorking.ratio }}
        </td>
        <td></td>
        <td>
          <!-- <div>Nhân viên:{{ riceCus }}</div>
          <div>khách:{{ riceEmp }}</div>
          <div>khách vip:{{ riceVip }}</div> -->
        </td>
      </tr>
    </table>
  </div>
</template>
<script>
import { getView } from "@/api/AuthenConnector.js";
import dayjs from "dayjs";
import { message } from "ant-design-vue";
export default {
  props: ["valueDay"],
  data() {
    return {
      // valueTable: "",
      // actualWork: "",
      // laborProductivity: "",
      // : "",
      // : "",
      // : "",
      // riceCus: "",
      // riceEmp: "",
      // riceVip: "",

      office: [],
      oddUnit: [],
      sewingTeamNo: [],
      studentsNotReported: [],
      sewingTeamTime: [],
      seasonalUnit: [],
      totalActualWorking: {
        Office: 0,
        Enterprise: 0,
        Laborreportsproductivity: 0,
        Numberleave: 0,
        ratio: 0,
      },
      totalLaborReports: "",
      radioOffice: 0,
      radioOddUnit: 0,
      radioSewingTeamNo: 0,
      radioStudentsNotReported: 0,
      radioSewingTeamTime: 0,
      radioSeasonalUnit: 0,
      totalRadioVPDVL: 0,
      totalRiceCus: 0,
      totalRiceEmp: 0,
      totalRiceVip: 0,
    };
  },
  created() {
    this.getDataTable();
  },
  watch: {
    valueDay: {
      handler: function (value) {
        this.getDataTable();
      },
      deep: true,
    },
  },
  methods: {
    async getDataTable() {
      const day = dayjs(this.valueDay).format("YYYY/MM/DD");
      const res = await getView(day);

      if (res) {
        // this.valueTable = res.responseList;
        // this.actualWork = res.actualWork;
        // this.laborProductivity = res.laborProductivity;
        // this. = res.;
        // this.riceCus = res.totalRiceCus;
        // this.riceEmp = res.totalRiceEmp;
        // this.riceVip = res.totalRiceVip;
        // this. = res.responseList
        //   .map((item) => [item.totalEmp ||0])
        //   .reduce(
        //     (accumulator, currentValue) =>
        //       Number(accumulator) + Number(currentValue),
        //     0
        //   );
        // this. = res.responseList
        //   .map((item) => [item.restEmp||0])
        //   .reduce(
        //     (accumulator, currentValue) =>
        //       Number(accumulator) + Number(currentValue),
        //     0
        //   );

        this.office = res[0];
        this.oddUnit = res[1];
        this.sewingTeamNo = res[2];
        this.studentsNotReported = res[3];
        this.sewingTeamTime = res[4];
        this.seasonalUnit = res[5];
        this.totalLaborReports = res
          .map((item) => [item.laborProductivityTeam])
          .reduce(
            (accumulator, currentValue) =>
              Number(accumulator) + Number(currentValue),
            0
          );
        this.radioOffice =
          (res[0].laborProductivityTeam / this.totalLaborReports) * 100;
        this.radioOddUnit =
          (res[1].laborProductivityTeam / this.totalLaborReports) * 100;
        this.radioSewingTeamNo =
          (res[2].laborProductivityTeam / this.totalLaborReports) * 100;
        this.radioStudentsNotReported =
          (res[3].laborProductivityTeam / this.totalLaborReports) * 100;
        this.radioSewingTeamTime =
          (res[4].laborProductivityTeam / this.totalLaborReports) * 100;
        this.radioSeasonalUnit =
          (res[5].laborProductivityTeam / this.totalLaborReports) * 100;
        this.totalActualWorking.Office = this.office.totalEmp;
        const totalActualWorking =
          res
            .map((item) => [item.totalEmp])
            .reduce(
              (accumulator, currentValue) =>
                Number(accumulator) + Number(currentValue),
              0
            ) - this.totalActualWorking.Office;

        this.totalActualWorking.Enterprise = totalActualWorking;

        this.totalActualWorking.Laborreportsproductivity = res
          .map((item) => [item.laborProductivityTeam])
          .reduce(
            (accumulator, currentValue) =>
              Number(accumulator) + Number(currentValue),
            0
          );
        0;
        this.totalActualWorking.Numberleave = res
          .map((item) => [item.restEmp])
          .reduce(
            (accumulator, currentValue) =>
              Number(accumulator) + Number(currentValue),
            0
          );
        this.totalRadioVPDVL = this.radioOffice + this.radioOddUnit;
        this.totalActualWorking.ratio =
          this.radioOffice +
          this.radioOddUnit +
          this.radioSewingTeamNo +
          this.radioStudentsNotReported +
          this.radioSewingTeamTime +
          this.radioSeasonalUnit;
        this.totalRiceCus = res
          .map((item) => [item.riceCus])
          .reduce(
            (accumulator, currentValue) =>
              Number(accumulator) + Number(currentValue),
            0
          );
        this.totalRiceEmp = res
          .map((item) => [item.riceEmp])
          .reduce(
            (accumulator, currentValue) =>
              Number(accumulator) + Number(currentValue),
            0
          );
        this.totalRiceVip = res
          .map((item) => [item.riceVip])
          .reduce(
            (accumulator, currentValue) =>
              Number(accumulator) + Number(currentValue),
            0
          );
      }
      // if (res === undefined) {
      // message.warning("ngày không có dữ liệu");
      // this.valueTable = "";
      // this.actualWork = "";
      // this.laborProductivity = "";
      // this. = "";
      // this. = "";
      // this. = "";
      // this.riceCus = "";
      // this.riceEmp = "";
      // this.riceVip = "";
      // }
    },
  },
};
</script>
<style scoped>
table {
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 100%;
}

td,
th {
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
}
th {
  background-color: #0daeff;
  color: #ffffff;
}
.backgroundBlue {
  background-color: #0daeff;
  color: #ffffff;
}
.btnDay {
  background-color: #0daeff;
  color: #ffffff;
}
@media only screen and (max-width: 600px) {
  table {
    width: 200% !important;
  }
  th {
    background-color: #0daeff;
    color: #ffffff;
  }
}
</style>
