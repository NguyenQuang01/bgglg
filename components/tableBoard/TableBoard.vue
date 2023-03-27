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
      <tr v-for="(item, index) in valueTable">
        <td class="font-bold backgroundBlue">{{ item.department }}</td>
        <td>{{ item.totalEmp }}</td>
        <td>{{ item.totalEmp }}</td>
        <td>{{ item.laborProductivityTeam }}</td>
        <td>{{ item.restEmp }}</td>
        <td>{{ item.ratio }}</td>
        <!-- <td rowspan="2">afds</td> -->
        <!-- rowspan="6"  -->
        <!-- <td class="font-bold">1682.0</td> -->
        <td v-if="index === 0" :rowspan="valueTable.length" class="font-bold">
          {{ laborProductivity }}
        </td>
        <td></td>
      </tr>

      <tr>
        <td class="font-bold backgroundBlue">Tổng thực tế làm việc</td>
        <td class="font-bold">{{ totalAllVp }}</td>
        <td class="font-bold">{{ totalAllVp }}</td>
        <td class="font-bold"></td>
        <td class="font-bold">{{ totalRest }}</td>
        <td class="font-bold">{{ totalratio }}</td>
        <td class="font-bold"></td>
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
import { message } from "ant-design-vue";
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
      const res = await getView(day);
      console.log(res);

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
      if (res === undefined) {
        message.warning("ngày không có dữ liệu");
        this.valueTable = "";
        this.actualWork = "";
        this.laborProductivity = "";
        this.totalratio = "";
        this.totalAllVp = "";
        this.totalRest = "";
        this.riceCus = "";
        this.riceEmp = "";
        this.riceVip = "";
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
