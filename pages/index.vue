<template>
  <div>
    <img
      src="@/assets/imge/background.jpg"
      alt=""
      srcset=""
      class="w-full rounded-b-lg avatar"
    />
    <div class="container">
      <div
        class="text-center mt-5 text-3xl font-bold title flex justify-center"
      >
        <img src="@/assets/imge/bgglg.jpg" alt="" srcset="" class="w-32 mr-2" />
      </div>
      <div
        class="text-center mt-16 text-3xl font-bold title flex justify-center flex items-center"
      >
        Lạng Giang
      </div>
      <div class="text-center mt-2 font-semibold mb-10">
        HỆ THỐNG BÁO CÁO LAO ĐỘNG
      </div>
      <div class="text-center mt-16 font-semibold mb-10">
        <b-button
          variant="primary"
          class="text-blue-700 rounded-full btnLogin px-5"
          @click="page"
          >Bắt đầu</b-button
        >
      </div>

      <div class="max-w-2xl m-auto m-0"></div>
    </div>
  </div>
</template>

<script>
export default {
  layout: "empty",
  name: "Index",

  computed: {
    page() {
      this.$router.push("/login");
    },
  },
};
</script>
<style scoped>
.avatar {
  border-radius: 0 0 50px 50px;
}
.menuBtn {
  background-color: #045396;
}
</style>
