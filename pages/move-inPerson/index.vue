<template lang="">
  <div class="container">
    <div class="text-center mt-16 text-3xl font-bold title">
      XÁC NHẬN NGƯỜI ĐIỀU CHUYỂN ĐẾN
    </div>

    <div class="text-center mt-2 font-semibold mb-10"></div>

    <div class="max-w-sm m-auto m-0">
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
  middleware: "auth",
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
      const day = new Date().getDate();
      const month = new Date().getMonth() + 1;
      const year = new Date().getFullYear();
      const today = `${year}/${month}/${day}`;
      const res = await getTransfer(today);
      if (res) {
        this.transfer = res;
        const totalTransfer = res
          .map((item) => item.transferNum)
          .reduce(
            (accumulator, currentValue) =>
              Number(accumulator) + Number(currentValue),
            0
          );
        const arrTransfer = res.map((item) => item.groupName);
        localStorage.setItem("totalTransfer", totalTransfer);
        localStorage.setItem("arrTransfer", arrTransfer);
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
