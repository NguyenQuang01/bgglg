<template lang="">
  <div class="container">
    <div class="text-center mt-10 mb-5 text-3xl font-bold title">
      THÔNG TIN LỊCH SỬ BÁO CÁO
    </div>
    <b-button @click="$router.back()" class="text-blue-500 border-none"
      ><b-icon icon="arrow-bar-left" aria-hidden="true"></b-icon>trở
      lại</b-button
    >
    <div class="font-semibold mb-2 text-lg">
      <b-icon icon="house-fill"></b-icon> Nhà máy : Xưởng 1
    </div>
    <a-date-picker v-model="valueDay" class="my-2" placeholder="Chọn ngày" />
    <div class="flex justify-center">
      <div class="max-w-2xl m-auto m-0">
        <TableInformationSuss />
      </div>
    </div>
  </div>
</template>
<script>
import TableInformationSuss from "@/components/TableInformationSuss/TableInformationSuss.vue";

export default {
  components: {
    TableInformationSuss,
  },
  data() {
    return {
      valueDay: "",
      label: {
        name: "Nhập số lao động nghỉ :",
        placeholder: "số lao động nghỉ",
      },
    };
  },
};
</script>
<style scoped>
.title {
  color: #0daeff;
}
</style>
