<template lang="">
  <div class="container">
    <div class="text-center mt-16 text-3xl font-bold title mb-16">
      Bảng báo cáo
    </div>
    <b-button @click="$router.back()" class="text-blue-500 border-none p-0"
      ><b-icon icon="arrow-bar-left" aria-hidden="true"></b-icon>trở
      lại</b-button
    >
    <div class="mb-2 flex">
      <a-button class="btnDay" @click="btnMinus">Ngày trước</a-button>
      <a-date-picker v-model="valueDay" class="mx-2" placeholder="Chọn ngày" />
      <a-button class="btnDay" @click="btnPlus">ngày sau</a-button>
    </div>
    <div class="m-auto m-0 overflow-auto">
      <TableBoardVue />
    </div>
    <div class="float-right mt-2 mb-10">
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
      day: new Date().getDate(),
      month: new Date().getMonth() + 1,
      year: new Date().getFullYear(),
      day30: [4, 6, 9, 11],
      day31: [1, 3, 5, 7, 8, 10, 12],
      day28: [2],
      valueDay: "",
    };
  },
  created() {
    this.valueDay = `${this.year}/${this.month}/${this.day}`;
  },
  methods: {
    btnPageToDetail() {
      this.$router.push("/leaderDetailBoard");
    },
    btnPlus() {
      if (this.day31.includes(this.month) && this.day < 31) {
        this.day = this.day + 1;
        this.valueDay = `${this.year}/${this.month}/${this.day}`;
        console.log(this.day);
      } else if (this.day30.includes(this.month) && this.day < 30) {
        this.day = this.day + 1;
        this.valueDay = `${this.year}/${this.month}/${this.day}`;
      } else if (this.day28.includes(this.month) && this.day < 28) {
        this.day = this.day + 1;
        this.valueDay = `${this.year}/${this.month}/${this.day}`;
      }
    },
    btnMinus() {
      if (this.day > 1) {
        this.day = this.day - 1;
        this.valueDay = `${this.year}/${this.month}/${this.day}`;
      }
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
