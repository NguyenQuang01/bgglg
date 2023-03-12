<template lang="">
  <div class="container">
    <div class="text-center mt-10 mb-24 text-3xl font-bold title">
      BÁO CÁO SỐ LAO ĐỘNG NGHỈ
    </div>

    <div class="max-w-2xl m-auto m-0">
      <div class="mb-2 p-2" @click="$router.back()">
        <a href="#"
          ><b-icon icon="arrow-bar-left" aria-hidden="true"></b-icon>trở lại</a
        >
      </div>
      <Input :label="label" />
    </div>
  </div>
</template>
<script>
import Input from "@/components/input/Input.vue";
export default {
  components: {
    Input,
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
