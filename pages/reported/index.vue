<template lang="">
  <div class="container">
    <div class="text-center mt-16 text-3xl font-bold Text mb-16">Báo cáo</div>

    <div class="max-w-2xl m-auto m-0">
      <!-- <b-button @click="$router.back()" class="text-blue-500 border-none"
        ><b-icon icon="arrow-bar-left" aria-hidden="true"></b-icon>trở lại
        ></b-button
      > -->
      <a-result
        status="success"
        sub-title="bạn đã báo cáo lao động cho ngày hôm nay, xin cảm ơn."
      >
        <template #title>
          <h1 class="Text">Xin chào: {{ user }} !</h1>
          <span class="text-lg">Tổ: {{ groupName }}</span>
        </template>
        <template #extra>
          <a-button
            key="console"
            type="primary"
            class="history"
            @click="gotoPage"
            >Xem lại lịch sử báo cáo</a-button
          >
        </template>
      </a-result>
    </div>
  </div>
</template>
<script>
import TitleScreen from "@/components/titleScreen/TitleScreen.vue";

export default {
  middleware: "auth",
  components: {
    TitleScreen,
  },
  data() {
    return {
      groupName: localStorage.getItem("groupName") || "",
      user: localStorage.getItem("userLogin") || "",
      label: {
        name: "Nhập số lao động nghỉ :",
        placeholder: "số lao động nghỉ",
      },
    };
  },
  methods: {
    gotoPage(event) {
      event.preventDefault();
      this.$router.push("/sussInformation");
    },
  },
};
</script>
<style scoped>
.Text {
  color: #045396;
}
.history {
  background-color: #045396;
  color: #ffff;
}
</style>
