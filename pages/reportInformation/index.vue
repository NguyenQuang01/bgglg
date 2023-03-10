<template lang="">
  <div class="container">
    <div class="text-center mt-10 mb-5 text-3xl font-bold title">
      THÔNG TIN BÁO CÁO
    </div>
    <div class="font-semibold mb-2 text-lg">
      <b-icon icon="house-fill"></b-icon> Nhà máy : Xưởng 1
    </div>
    <div class="max-w-2xl m-auto m-0">
      <div class="flex justify-center">
        <TableInformation />
      </div>
    </div>
  </div>
</template>
<script>
import TableInformation from "@/components/tableInformation/TableInformation.vue";

export default {
  components: {
    TableInformation,
  },
  data() {
    return {
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
