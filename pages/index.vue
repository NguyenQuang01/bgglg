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
        class="text-center mt-16 text-3xl font-bold title flex justify-center flex items-center textOff"
      >
        Lạng Giang
      </div>
      <div class="text-center mt-2 font-semibold mb-10">
        HỆ THỐNG BÁO CÁO LAO ĐỘNG
      </div>
      <div class="text-center mt-16 font-semibold mb-10 my-10 h-32">
        <b-button
          variant="primary"
          class="menuBtn rounded-full btnLogin px-5"
          @click="page"
          >Bắt đầu</b-button
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: "empty",
  name: "Index",
  methods: {
    page() {
      this.$router.push("/login");
    },
  },
};
</script>
<style scoped>
.title {
  color: #045396;
}
.avatar {
  border-radius: 0 0 50px 50px;
}
.menuBtn {
  background-color: #045396;
}
@media only screen and (min-width: 600px) {
  .container {
    position: absolute;
    top: 41%;

    margin-left: auto;
    margin-right: auto;
    right: 0;
    left: 0;
    text-align: center;
  }
  .textOff {
    color: #045396;
  }
  .avatar {
    position: fixed;
    visibility: hidden;
  }
}
</style>
