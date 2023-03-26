<template lang="">
  <div>
    <table>
      <tr>
        <th>Bộ phận</th>
        <th>Văn phòng</th>
        <th>XÍ nghiệp</th>
        <th>Lao động báo năng suất</th>
        <th>Số lao động nghỉ</th>
        <th>Tỉ lệ %</th>
        <th>Tổng lao động báo năng suất</th>
        <th>Báo cơm</th>
      </tr>
      <tr v-for="item in valueTable">
        <td class="font-bold backgroundBlue">{{ item.department }}</td>
        <td>{{ item.totalEmp }}</td>
        <td>{{ item.totalEmp }}</td>
        <td></td>
        <td>{{ item.restEmp }}</td>
        <td>{{ item.ratio }}</td>
        <!-- <td rowspan="2">afds</td> -->
        <!-- rowspan="6"  -->
        <!-- <td class="font-bold">1682.0</td> -->
        <td>{{ item.laborProductivityTeam }}</td>
        <td></td>

        <!-- </tr>
      <tr>
        <td class="font-bold backgroundBlue">Đơn vị lẻ</td>
        <td></td>
        <td>293.5</td>
        <td>293.5</td>
        <td></td>
        <td>17.51</td>
        <td></td>
      </tr>
      <tr>
        <td class="font-bold backgroundBlue">Tổ may</td>
        <td></td>
        <td>1197.5</td>
        <td>1197.5</td>
        <td>71.10</td>
        <td colspan="2">71.10</td>
        <td></td>
      </tr>
      <tr>
        <td class="font-bold backgroundBlue">Học sinh chưa báo năng suất</td>
        <td></td>
        <td>1197.5</td>
        <td>1197.5</td>
        <td>71.10</td>
        <td colspan="2"></td>
        <td></td>
      </tr>
      <tr>
        <td class="font-bold backgroundBlue">Thời vụ tổ may</td>
        <td></td>
        <td>1197.5</td>
        <td>1197.5</td>
        <td>71.10</td>
        <td colspan="2">71.10</td>
        <td></td>
      </tr>
      <tr>
        <td class="font-bold backgroundBlue">Thời vụ đơn vị lẻ</td>
        <td></td>
        <td>1197.5</td>
        <td>1197.5</td>
        <td>71.10</td>
        <td colspan="2">71.10</td>
        <td></td>
      </tr> -->
      </tr>

      <tr>
        <td class="font-bold backgroundBlue">Tổng thực tế làm việc</td>
        <td class="font-bold">{{ totalAllVp }}</td>
        <td class="font-bold">{{ totalAllVp }}</td>
        <td class="font-bold"></td>
        <td class="font-bold">{{ totalRest }}</td>
        <td class="font-bold">{{ totalratio }}</td>
        <td class="font-bold">{{ laborProductivity }}</td>
        <td>
          <div>Nhân viên:{{ riceCus }}</div>
          <div>khách:{{ riceEmp }}</div>
          <div>khách vip:{{ riceVip }}</div>
        </td>
      </tr>
    </table>
  </div>
</template>
<script>
import { getView } from "@/api/AuthenConnector.js";
import dayjs from "dayjs";
export default {
  props: ["valueDay"],
  data() {
    return {
      valueTable: "",
      actualWork: "",
      laborProductivity: "",
      totalratio: "",
      totalAllVp: "",
      totalRest: "",
      riceCus: "",
      riceEmp: "",
      riceVip: "",
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
      const res = await getView();
      if (res) {
        this.valueTable = res.responseList;
        this.actualWork = res.actualWork;
        this.laborProductivity = res.laborProductivity;
        this.totalratio = res.totalratio;
        this.riceCus = res.totalRiceCus;
        this.riceEmp = res.totalRiceEmp;
        this.riceVip = res.totalRiceVip;
        this.totalAllVp = res.responseList
          .map((item) => [item.totalEmp])
          .reduce(
            (accumulator, currentValue) =>
              Number(accumulator) + Number(currentValue),
            0
          );
        this.totalRest = res.responseList
          .map((item) => [item.restEmp])
          .reduce(
            (accumulator, currentValue) =>
              Number(accumulator) + Number(currentValue),
            0
          );
      }
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
