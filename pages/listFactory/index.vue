<template lang="">
  <div class="container">
    <div class="text-center mt-16 text-3xl font-bold title">
      Danh sách các nhà xưởng
    </div>

    <div class="max-w-2xl m-auto m-0">
      <formlogin />
    </div>
  </div>
</template>
<script>
import formlogin from "@/components/formlogin/formlogin.vue";
export default {
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
