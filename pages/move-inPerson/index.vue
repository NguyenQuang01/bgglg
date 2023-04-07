<template lang="">
  <div class="container">
    <div class="text-center mt-16 text-3xl font-bold title">
      Xác nhận số người đến hỗ trợ!
    </div>

    <div class="text-center mt-2 font-semibold mb-10"></div>

    <div class="max-w-2xl m-auto m-0">
      <MoveInPerson :transfer="transfer" />
      <div class="flex pt-2 float-right">
        <BtnBack class="h-10" />

        <button-skip :skip="skip" />
        <b-button @click="handleOk" variant="primary" class="btnLogin mb-24"
          >Xác nhận</b-button
        >
      </div>
    </div>
  </div>
</template>
<script>
import MoveInPerson from "@/components/Move-inPerson.vue";
import { getTransfer, accuracy } from "@/api/AuthenConnector.js";
import BtnBack from "@/components/BtnBack.vue";

export default {
  // middleware: "auth",
  components: {
    MoveInPerson,
    BtnBack,
  },
  data() {
    return { skip: "/reportmeal", transfer: [] };
  },
  fetch() {
    this.getTransferState();
  },
  methods: {
    async getTransferState() {
      const res = await getTransfer();
      if (res) {
        this.transfer = res;
      }
      //        const res = await accuracy();
    },
    async handleOk() {
      const res = await accuracy();
      this.$router.push("/reportmeal");
    },
  },
};
</script>
<style scoped>
.title {
  color: #045396;
}
.btnLogin {
  background-color: #045396;
  color: #ffff;
  margin-bottom: 20px;
  border-radius: 50px;
}
</style>
