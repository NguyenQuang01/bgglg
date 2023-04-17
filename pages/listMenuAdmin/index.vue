<template lang="">
  <div class="container">
    <Avatar />

    <div class="max-w-2xl m-auto m-0">
      <a-collapse v-model:activeKey="activeKey">
        <a-collapse-panel key="1" header="Menu" :disabled="false" class="">
          <a-button type="primary" class="menuBtn" @click="pagetoAcc">{{
            text1
          }}</a-button
          ><br />
          <a-button
            type="primary"
            class="my-3 menuBtn"
            @click="pagetoBoadLeave"
            >{{ text2 }}</a-button
          ><br /><a-button
            type="primary"
            class="menuBtn mb-3"
            @click="pagetoGroup"
            >{{ text3 }}</a-button
          ><br /><a-button
            type="primary"
            class="menuBtn mb-3"
            @click="pagetoEmployee"
            >{{ text4 }}</a-button
          ><br /><a-button
            type="primary"
            class="menuBtn mb-3"
            @click="pageToDemarcation"
            >{{ text5 }}</a-button
          >
          <br /><a-button type="primary" class="menuBtn" @click="pageToAcc">{{
            text6
          }}</a-button>
          <!-- <a-button type="primary">{{ text3 }}</a-button> -->
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
      text1: `Tạo tài khoản`,
      text2: `Danh sách lý do nghỉ`,
      text3: `Danh sách các tổ`,
      text4: `Danh sách nhân viên`,
      text5: `Danh sách định biên các tổ`,
      text6: `Danh sách tài khoản`,

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
    pagetoGroup() {
      this.$router.push("/group");
    },
    pagetoEmployee() {
      this.$router.push("/employee");
    },
    pageToDemarcation() {
      this.$router.push("/listDemarcation");
    },
    pageToAcc() {
      this.$router.push("/listAcc");
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
  color: #045396;
}
.menuBtn {
  background-color: #045396;
  color: #ffff;
}
</style>
