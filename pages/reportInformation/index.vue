<template lang="">
  <div class="container">
    <div class="text-center mt-10 mb-5 text-3xl font-bold title">
      THÔNG TIN BÁO CÁO
    </div>

    <div class="font-semibold mb-2 text-lg title">
      <b-icon icon="house-fill"></b-icon> Nhà máy : BGG Lạng Giang
    </div>
    <div class="max-w-2xl m-auto m-0">
      <div class="flex justify-center">
        <TableInformation />
      </div>
    </div>
    <div class="footer"></div>
  </div>
</template>
<script>
import TableInformation from "@/components/tableInformation/TableInformation.vue";
import BtnBack from "@/components/BtnBack.vue";

export default {
  middleware: "auth",
  components: {
    TableInformation,
    BtnBack,
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
  color: #045396;
}
.footer {
  height: 1px;
  margin: 50px 0;
}
</style>
