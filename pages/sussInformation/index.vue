<template lang="">
  <div class="container">
    <div class="text-center mt-10 mb-5 text-3xl font-bold title">
      THÔNG TIN LỊCH SỬ BÁO CÁO
    </div>
    <BtnBack />
    <div></div>
    <div class="font-semibold mb-2 text-lg">
      <b-icon icon="house-fill"></b-icon> Nhà máy : Xưởng 1
    </div>
    <div class="flex justify-center">
      <div class="max-w-2xl m-auto m-0">
        <a-date-picker
          v-model="valueDay"
          class="my-2"
          :format="dateFormat"
          placeholder="Chọn ngày"
        />
        <TableInformationSuss :valueDay="valueDay" />
      </div>
    </div>
  </div>
</template>
<script>
import TableInformationSuss from "@/components/TableInformationSuss/TableInformationSuss.vue";
import BtnBack from "@/components/BtnBack.vue";
export default {
  middleware: "auth",
  components: {
    TableInformationSuss,
    BtnBack,
  },
  data() {
    return {
      dateFormat: "YYYY/MM/DD",
      day: new Date().getDate(),
      month: new Date().getMonth() + 1,
      year: new Date().getFullYear(),
      valueDay: "",
      label: {
        name: "Nhập số lao động nghỉ :",
        placeholder: "số lao động nghỉ",
      },
    };
  },
  fetch() {
    this.valueDay = `${this.year}-${this.month}-${this.day}`;
  },
  watch: {
    valueDay: {
      handler: function (value) {
        console.log("something changed", value);
      },
      deep: true,
    },
  },
};
</script>
<style scoped>
.title {
  color: #045396;
}
</style>
