<template lang="">
  <div class="container">
    <div class="text-center mt-10 mb-24 text-3xl font-bold title">
      BÁO CÁO SỐ LAO ĐỘNG NGHỈ
    </div>

    <div class="max-w-sm m-auto m-0">
      <Input :label="label" />
    </div>
  </div>
</template>
<script>
import Input from "@/components/input/Input.vue";
import BtnBack from "@/components/BtnBack.vue";

export default {
  components: {
    Input,
    BtnBack,
  },
  middleware: "auth",
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
</style>
