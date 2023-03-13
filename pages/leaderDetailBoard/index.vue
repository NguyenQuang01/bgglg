<template lang="">
  <div class="container">
    <div class="text-center mt-16 text-3xl font-bold title mb-16">
      Bảng báo cáo chi tiết
    </div>
    <b-button   @click="$router.back()"  class="text-blue-500 border-none p-0"
          ><b-icon icon="arrow-bar-left" aria-hidden="true"></b-icon>trở lại</a
        ></b-button>
    <div class="mb-2 flex">
      <a-date-picker v-model="valueDay" class="mx-2" placeholder="Chọn ngày" />
      <a-button class="btnDay">Lọc</a-button>
      <a-button class="btnDay">Xuất excel</a-button>
    </div>
    <div class="m-auto m-0 overflow-auto">
      <TableDetail />
    </div>
    <div class="float-right mt-2 mb-10">
      <div class="mb-16">text</div>
    </div>
  </div>
</template>
<script>
import TableDetail from "../../components/tableDetaileBoard/TableDetail.vue";
export default {
  components: {
    TableDetail,
  },
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
.btnDay {
  background-color: #0daeff;
  color: #ffffff;
}
</style>
