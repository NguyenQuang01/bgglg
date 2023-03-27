<template lang="">
  <div>
    <table>
      <tr>
        <th colspan="2">Bộ phận</th>
        <th>Văn phòng</th>
        <th>XÍ nghiệp</th>
        <th>Lao động báo năng suất</th>
        <th>Số lao động nghỉ</th>
        <th colspan="2">Tỉ lệ %</th>
        <th>Tổng lao động báo năng suất</th>
        <th>Báo cơm</th>
      </tr>
      <tr>
        <td colspan="2" class="font-bold backgroundBlue" @click="test">
          {{ dataTable.Vp.name }}
        </td>
        <td>{{ dataTable.Vp.vp }}</td>
        <td>{{ dataTable.Vp.xn }}</td>
        <td>{{ dataTable.Vp.ldnx }}</td>
        <td>{{ dataTable.Vp.ndn }}</td>
        <td>{{ dataTable.Vp.tl }}</td>
        <td rowspan="2">afds</td>

        <td rowspan="6" class="font-bold">1682.0</td>
        <td>190 2 khách 2 khách VIP</td>
      </tr>

      <tr v-if="dataTable.Vp.child && isVp" v-for="item in dataTable.Vp.child">
        <td></td>
        <td>{{ item.name }}</td>
        <td>{{ item.vp }}</td>
        <td>{{ item.xn }}</td>
        <td>{{ item.ldnx }}</td>
        <td>{{ item.ndn }}</td>
        <td>{{ item.tl }}</td>
      </tr>

      <tr>
        <td colspan="2" class="font-bold backgroundBlue">
          {{ dataTable.Dvl.name }}
        </td>
        <td>{{ dataTable.Dvl.vp }}</td>
        <td>{{ dataTable.Dvl.xn }}</td>
        <td>{{ dataTable.Dvl.ldnx }}</td>
        <td>{{ dataTable.Dvl.ndn }}</td>
        <td>{{ dataTable.Dvl.tl }}</td>
      </tr>
      <tr v-if="dataTable.Vp.child && isVp" v-for="item in dataTable.Vp.child">
        <td></td>
        <td>{{ item.name }}</td>
        <td>{{ item.vp }}</td>
        <td>{{ item.xn }}</td>
        <td>{{ item.ldnx }}</td>
        <td>{{ item.ndn }}</td>
        <td>{{ item.tl }}</td>
      </tr>

      <tr>
        <td colspan="2" class="font-bold backgroundBlue">
          {{ dataTable.Tm.name }}
        </td>
        <td>{{ dataTable.Tm.vp }}</td>
        <td>{{ dataTable.Tm.xn }}</td>
        <td>{{ dataTable.Tm.ldnx }}</td>
        <td>{{ dataTable.Tm.ndn }}</td>
        <td colspan="2">{{ dataTable.Tm.tl }}</td>
      </tr>
    </table>
  </div>
</template>
<script>
export default {
  data() {
    return {
      dataTable: {
        Vp: {
          name: "Văn phòn",
          vp: 191,
          xn: 0,
          ldnx: 191.0,
          ndn: 10,
          tl: 11.39,
          child: [
            {
              name: "Lãnh đạo",
              vp: 191,
              xn: 0,
              ldnx: 191.0,
              ndn: 10,
              tl: 11.39,
            },
            {
              name: "Phòng TCHC",
              vp: 191,
              xn: 0,
              ldnx: 191.0,
              ndn: 10,
              tl: 11.39,
            },
          ],
        },
        Dvl: {
          name: "Đơn vị lẻ",
          vp: 0,
          xn: 293.5,
          ldnx: 293.5,
          ndn: 0,
          tl: 17.51,
        },
        Tm: {
          name: "Tổ may",
          vp: 0,
          xn: 1197.5,
          ldnx: 1197.5,
          ndn: 0,
          tl: 71.1,
        },
      },
      isVp: true,
    };
  },
  methods: {
    test() {
      console.log(4544);
      this.isVp = !this.isVp;
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
.yellow {
  background-color: yellow;
}
.btnDay {
  background-color: #0daeff;
  color: #ffffff;
}
@media only screen and (max-width: 600px) {
  table {
    width: 200% !important;
  }
}
</style>
