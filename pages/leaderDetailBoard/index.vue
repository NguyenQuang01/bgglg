<template lang="">
  <div class="container">
    <div class="text-center mt-16 text-3xl font-bold title mb-16">
      Bảng báo cáo chi tiết
    </div>

    <div class="mb-2 flex flex-wrap">
      <div class="mb-2 flex">
        <a-button class="btnDay" @click="decrementDate">Ngày trước</a-button>
        <a-date-picker
          v-model="valueDay"
          class="mx-2"
          placeholder="Chọn ngày"
        />
        <a-button class="btnDay mr-2" @click="incrementDate">ngày sau</a-button>
      </div>
      <!-- <a-date-picker v-model="valueDay" class="mx-2" placeholder="Chọn ngày" /> -->
      <!-- <a-button class="btnDay">Lọc</a-button>
        <a-button class="btnDay">Xuất excel</a-button> -->
      <a-button class="btnDay mr-2" @click="pageMobile"
        >Giao diện điện thoại</a-button
      >
      <a-button class="btnExcel" @click="getExcel"
        ><img
          src="@/assets/imge/excel.png"
          alt=""
          srcset=""
          class="w-full h-full"
      /></a-button>
    </div>
    <div class="m-auto m-0 overflow-auto">
      <TableDetail
        :valueDay="valueDay"
        ref="TableDetail"
        :valueDayEd="valueDayEd"
      />
    </div>
    <div class="float-right mt-2 mb-10">
      <div class="mb-16"><BtnBack class="h-10" /></div>
    </div>
  </div>
</template>
<script>
import TableDetail from "../../components/tableDetaileBoard/TableDetail.vue";
import BtnBack from "@/components/BtnBack.vue";
import { viewExcel } from "@/api/AuthenConnector.js";
import { downloadFileExcel } from "@/utils/utils";
import { message } from "ant-design-vue";
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
      valueDayEd: "",

      day: new Date().getDate(),
      month: new Date().getMonth() + 1,
      year: new Date().getFullYear(),
      day30: [4, 6, 9, 11],
      day31: [1, 3, 5, 7, 8, 10, 12],
      day28: [2],
    };
  },
  created() {
    this.valueDay = new Date().toISOString().substr(0, 10) || "";
    const newDate = new Date(this.valueDay);
    newDate.setDate(newDate.getDate() - 1);
    this.valueDayEd = newDate.toISOString().substr(0, 10);
  },
  methods: {
    btnPlus() {
      if (this.day31.includes(this.month) && this.day < 31) {
        this.day = this.day + 1;
        this.valueDay = `${this.year}/${this.month}/${this.day}`;
        this.valueDayEd = `${this.year}/${this.month}/${this.day - 1}`;
      } else if (this.day30.includes(this.month) && this.day < 30) {
        this.day = this.day + 1;
        this.valueDay = `${this.year}/${this.month}/${this.day}`;
        this.valueDayEd = `${this.year}/${this.month}/${this.day - 1}`;
      } else if (this.day28.includes(this.month) && this.day < 28) {
        this.day = this.day + 1;
        this.valueDay = `${this.year}/${this.month}/${this.day}`;
        this.valueDayEd = `${this.year}/${this.month}/${this.day}`;
      }
    },
    btnMinus() {
      if (this.day > 1) {
        this.day = this.day - 1;
        this.valueDay = `${this.year}/${this.month}/${this.day}`;
        this.valueDayEd = `${this.year}/${this.month}/${this.day - 1}`;
      }
    },
    incrementDate() {
      const newDate = new Date(this.valueDay);
      newDate.setDate(newDate.getDate() + 1);
      this.valueDay = newDate.toISOString().substr(0, 10);
      const newDate2 = new Date(this.valueDayEd);
      newDate2.setDate(newDate2.getDate() + 1);
      this.valueDayEd = newDate2.toISOString().substr(0, 10);
    },
    decrementDate() {
      const newDate = new Date(this.valueDay);
      newDate.setDate(newDate.getDate() - 1);
      this.valueDay = newDate.toISOString().substr(0, 10);
      const newDate2 = new Date(this.valueDayEd);
      newDate2.setDate(newDate2.getDate() - 1);
      this.valueDayEd = newDate2.toISOString().substr(0, 10);
    },
    pageMobile() {
      this.$router.push("/boss/viewSimple");
    },
    async getExcel() {
      const res = await viewExcel(this.valueDay);
      if (res && res.status === 200) {
        downloadFileExcel(res.data, "Báo cáo chi tiết");
        message.success("xuất file thành công");
      }
      if (res && res.status === 500) {
        message.error("ngày nay không có dữ liệu");
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
  color: #045396;
}
.btnDay {
  background-color: #045396;
  color: #ffffff;
}
.btnExcel {
  font-size: 1.25em;
  color: white;
  border: green 1px solid;
  display: inline-block;
  cursor: pointer;
  height: 32px;
  width: 70px;
  padding: 2px 10px;
}
</style>
