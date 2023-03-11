<template lang="">
  <div class="container">
    <div class="text-center mt-16 text-3xl font-bold title mb-16">
      Bảng báo cáo
    </div>
    <div class="mb-2" @click="$router.back()">
      <a href="#"
        ><b-icon icon="arrow-bar-left" aria-hidden="true"></b-icon>trở lại</a
      >
    </div>
    <div class="mb-2 flex">
      <a-button class="btnDay">Ngày trước</a-button>
      <a-date-picker v-model="valueDay" class="mx-2" placeholder="Chọn ngày" />
      <a-button class="btnDay">ngày sau</a-button>
    </div>
    <div class="m-auto m-0 overflow-auto">
      <table>
        <tr>
          <th>Bộ phận</th>
          <th>Văn phòng</th>
          <th>Xí nghiệp</th>
          <th>Lao động báo năng suất</th>
          <th>Tỉ lệ %</th>
          <th>Tổng lao động báo năng suất</th>
        </tr>
        <tr>
          <td class="font-bold backgroundBlue">văn phòng</td>
          <td>191(+3)</td>
          <td>191(+3)</td>
          <td>191(+3)</td>
          <td>191(+3)</td>
          <td>191(+3)</td>
        </tr>
        <tr>
          <td class="font-bold backgroundBlue">Tổ may + thời vụ</td>
          <td>191(+3)</td>
          <td>191(+3)</td>
          <td>191(+3)</td>
          <td>191(+3)</td>
          <td>191(+3)</td>
        </tr>
        <tr>
          <td class="font-bold backgroundBlue">Đơn vị lẻ</td>
          <td>191(+3)</td>
          <td>191(+3)</td>
          <td>191(+3)</td>
          <td>191(+3)</td>
          <td>191(+3)</td>
        </tr>
        <tr>
          <td class="font-bold backgroundBlue">Học sinh chưa báo năng suất</td>
          <td>191(+3)</td>
          <td>191(+3)</td>
          <td>191(+3)</td>
          <td>191(+3)</td>
          <td>191(+3)</td>
        </tr>
        <tr>
          <td class="font-bold backgroundBlue">Thời vụ đơn vị lẻ</td>
          <td>191(+3)</td>
          <td>191(+3)</td>
          <td>191(+3)</td>
          <td>191(+3)</td>
          <td>191(+3)</td>
        </tr>
        <tr>
          <td class="font-bold backgroundBlue">Tổng thực tế làm việc</td>
          <td>191(+3)</td>
          <td>191(+3)</td>
          <td>191(+3)</td>
          <td>191(+3)</td>
          <td>191(+3)</td>
        </tr>
      </table>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      valueDay: "",
      day: new Date().getDate(),
      month: new Date().getMonth() + 1,
      year: new Date().getFullYear(),
    };
  },
  created() {
    this.valueDay = `${this.day}/${this.month}/${this.year}` || "";
  },
  // methods: {
  //   btnBack() {},
  // },
  // watch: {
  //   valueDay: {
  //     deep: true,
  //     handler() {
  //       console.log(this.valueDay, 55555);
  //     },
  //   },
  // },
};
</script>
<style scoped>
.title {
  color: #0daeff;
}
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
    width: 150% !important;
  }
  th {
    background-color: #0daeff;
    color: #ffffff;
  }
}
</style>
