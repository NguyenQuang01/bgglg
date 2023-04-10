<template lang="">
  <div class="container h-96">
    <Avatar />

    <div class="max-w-2xl m-auto m-0">
      <a-collapse v-model:activeKey="activeKey">
        <a-collapse-panel key="1" header="Menu" :disabled="false" class="">
          <a-button class="menuBtn" @click="pagetoBoad">{{ text1 }}</a-button
          ><br />

          <a-button class="my-3 menuBtn" @click="pageToReported">{{
            text3
          }}</a-button
          ><br />
          <a-button class="menuBtn" @click="pageDemarcation">{{
            text4
          }}</a-button>
        </a-collapse-panel>
      </a-collapse>
    </div>
  </div>
</template>
<script>
import { defineComponent, ref, watch } from "vue";
import Avatar from "@/components/Avatar";
export default {
  middleware: "auth",
  components: { Avatar },
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
      this.$router.push("/leaderDetailBoard");
    },
    pageDemarcation() {
      this.$router.push("/demarcation");
    },
    pageToDetail() {
      this.$router.push("/demarcation");
    },
    pageToReported() {
      alert("chức năng này chưa có");
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
.menuBtn {
  background-color: #045396;
  color: #ffff;
}
</style>
