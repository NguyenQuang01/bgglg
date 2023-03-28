<template lang="">
  <div class="container">
    <div class="text-center mt-16 text-3xl font-bold title mb-16">
      Welcome back!
    </div>

    <div class="max-w-2xl m-auto m-0">
      <a-collapse v-model:activeKey="activeKey">
        <a-collapse-panel key="1" header="Menu" :disabled="false" class="">
          <a-button type="primary" @click="pagetoBoad">{{ text1 }}</a-button
          ><br />
          <a-button type="primary" class="my-3">{{ text2 }}</a-button
          ><br />
          <a-button type="primary" class="mb-3">{{ text3 }}</a-button
          ><br />
          <a-button type="primary" @click="pageDemarcation">{{
            text4
          }}</a-button>
        </a-collapse-panel>
      </a-collapse>
    </div>
  </div>
</template>
<script>
import { defineComponent, ref, watch } from "vue";
export default {
  middleware: "auth",
  data() {
    return {
      text1: `Báo cáo tổng`,
      text2: `Báo cáo chi tiết`,
      text3: `Xem lại báo cáo`,
      text4: `Nhập định biên`,
      activeKey: 1,
    };
  },
  methods: {
    pagetoBoad() {
      this.$router.push("/leaderBoard");
    },
    pageDemarcation() {
      this.$router.push("/demarcation");
    },
  },
  // created() {
  //   setInterval(() => {
  //     this.currentTime = new Date().toLocaleString();
  //   }, 1000);
  // },
};
</script>
<style scoped>
.title {
  color: #0daeff;
}
</style>
