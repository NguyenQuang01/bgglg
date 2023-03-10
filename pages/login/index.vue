<template lang="">
  <div class="container">
    <div class="text-center mt-20 text-3xl font-bold title">Welcome back!</div>
    <div class="text-center mt-2 font-semibold mb-10">
      Xin hãy đăng nhập vào tài khoản của bạn
    </div>
    <div class="max-w-2xl m-auto m-0">
      <formlogin />
    </div>
  </div>
</template>
<script>
import formlogin from "@/components/formlogin/formlogin.vue";
export default {
  layout: "Home",
  components: {
    formlogin,
  },
};
</script>
<style scoped>
.title {
  color: #0daeff;
}
</style>
