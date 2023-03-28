<template lang="">
  <div class="container">
    <div class="text-center mt-10 mb-24 text-3xl font-bold title">
      Xin chào (tên tài khoản) - bạn đã báo cáo lao động cho ngày hôm nay, xin
      cảm ơn
    </div>

    <div class="max-w-2xl m-auto m-0">
      <div class="flex justify-center">
        <b-button variant="primary" class="text-blue-700"
          >xem lại lịch sử báo cáo</b-button
        >
      </div>
    </div>
  </div>
</template>
<script>
import Input from "@/components/input/Input.vue";
export default {
  middleware: "auth",
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
