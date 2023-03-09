<template lang="">
  <div class="container">
    <div class="text-center mt-10 text-3xl font-bold title">Welcome back!</div>
    <div class="text-center mt-2 font-semibold mb-16">
      Please log in to your account
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
