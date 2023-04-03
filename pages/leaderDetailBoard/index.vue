<template lang="">
  <div class="container">
    <div class="text-center mt-16 text-3xl font-bold title mb-16">
      Bảng báo cáo chi tiết
    </div>
    <BtnBack />
    <div class="mb-2 flex">
      <div class="mb-2 flex">
        <a-button class="btnDay" @click="btnMinus">Ngày trước</a-button>
        <a-date-picker
          v-model="valueDay"
          class="mx-2"
          placeholder="Chọn ngày"
        />
        <a-button class="btnDay" @click="btnPlus">ngày sau</a-button>
      </div>
      <!-- <a-date-picker v-model="valueDay" class="mx-2" placeholder="Chọn ngày" /> -->
      <!-- <a-button class="btnDay">Lọc</a-button>
      <a-button class="btnDay">Xuất excel</a-button> -->
    </div>
    <div class="m-auto m-0 overflow-auto">
      <TableDetail :valueDay="valueDay" />
    </div>
    <div class="float-right mt-2 mb-10">
      <div class="mb-16">text</div>
    </div>
  </div>
</template>
<script>
import TableDetail from "../../components/tableDetaileBoard/TableDetail.vue";
import BtnBack from "@/components/BtnBack.vue";

export default {
  middleware: "auth",
  components: {
    TableDetail,
    BtnBack,
  },
  // props: ["valueDay"],
  data() {
    return {
      valueDay: "",
      day: new Date().getDate(),
      month: new Date().getMonth() + 1,
      year: new Date().getFullYear(),
      day30: [4, 6, 9, 11],
      day31: [1, 3, 5, 7, 8, 10, 12],
      day28: [2],
    };
  },
  created() {
    this.valueDay = `${this.year}/${this.month}/${this.day}` || "";
  },
  methods: {
    btnPlus() {
      if (this.day31.includes(this.month) && this.day < 31) {
        this.day = this.day + 1;
        this.valueDay = `${this.year}/${this.month}/${this.day}`;
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
  //     handler: function (value) {
  //       this.getDataTable();
  //     },
  //     deep: true,
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
