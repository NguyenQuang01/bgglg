<template lang="">
  <div class="container">
    <div class="text-center mt-16 text-3xl font-bold title mb-16">
      Bảng báo cáo
    </div>
    <b-button   @click="$router.back()"  class="text-blue-500 border-none"
          ><b-icon icon="arrow-bar-left" aria-hidden="true"></b-icon>trở lại</a
        ></b-button>
    <div class="mb-2 flex">
      <a-button class="btnDay">Ngày trước</a-button>
      <a-date-picker v-model="valueDay" class="mx-2" placeholder="Chọn ngày" />
      <a-button class="btnDay">ngày sau</a-button>
    </div>
    <div class="m-auto m-0 overflow-auto">
      <TableBoardVue />
    </div>
    <div class="float-right mt-2">
      <a-button class="btnDay" @click="btnPageToDetail">Xem chi tiết</a-button>
    </div>
  </div>
</template>
<script>
import TableBoardVue from "../../components/tableBoard/TableBoard.vue";
export default {
  components: {
    TableBoardVue,
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
  methods: {
    btnPageToDetail() {
      this.$router.push("/leaderDetailBoard");
    },
  },
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
