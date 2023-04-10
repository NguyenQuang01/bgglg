<template lang="">
  <div class="container">
    <div class="text-center mt-16 text-3xl font-bold title flex justify-center">
      <img src="@/assets/imge/bgglg.jpg" alt="" srcset="" class="w-20 mr-2" />

      <div class="flex items-center">Lạng Giang</div>
    </div>
    <div class="text-center mt-8 font-semibold mb-32">
      HỆ THỐNG BÁO CÁO LAO ĐỘNG
    </div>
    <div class="max-w-sm m-auto m-0">
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
  layout: "empty",
  mounted() {
    if (localStorage.getItem("JWT")) {
      this.$router.push("/menuLogin");
    }
  },
};
</script>
<style scoped>
.title {
  color: rgb(255, 63, 63);
}
</style>
