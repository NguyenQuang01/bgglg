<template lang="">
  <div class="container">
    <div class="text-center mt-16 text-3xl font-bold title mb-16">
      Welcome back!
    </div>

    <div class="max-w-2xl m-auto m-0">
      <a-collapse v-model:activeKey="activeKey">
        <a-collapse-panel key="1" header="Menu" :disabled="false" class="">
          <a-button type="primary" @click="pagetoAcc">{{ text1 }}</a-button
          ><br />
          <a-button type="primary" class="my-3" @click="pagetoBoadLeave">{{
            text2
          }}</a-button
          ><br />
          <!-- <a-button type="primary">{{ text3 }}</a-button> -->
        </a-collapse-panel>
      </a-collapse>
    </div>
  </div>
</template>
<script>
import { defineComponent, ref, watch } from "vue";
export default {
  data() {
    return {
      text1: `Tạo tài khoản`,
      text2: `Danh sach lý do nghỉ`,
      activeKey: 1,
    };
  },
  methods: {
    pagetoAcc() {
      this.$router.push("/createMoreAccounts");
    },
    pagetoBoadLeave() {
      this.$router.push("/reasonForLeave");
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
