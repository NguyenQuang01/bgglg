<template lang="">
  <div class="container">
    <div class="text-center mt-16 text-3xl font-bold title">
      Xác nhận số người đến hỗ trợ!
    </div>

    <div class="text-center mt-2 font-semibold mb-10"></div>

    <div class="max-w-2xl m-auto m-0">
      <BtnBack />
      <MoveInPerson :transfer="transfer" />
      <div class="flex pt-2">
        <b-button
          @click="handleOk"
          variant="primary"
          class="text-blue-700 mb-24"
          >Xác nhận</b-button
        >
        <button-skip :skip="skip" />
        <!-- <b-button
            variant="primary"
            class="text-blue-700 mb-24 mx-2"
            @click="showModal"
            >Người chuyển đến</b-button
          > -->
      </div>
    </div>
  </div>
</template>
<script>
import MoveInPerson from "@/components/Move-inPerson.vue";
import { getTransfer, accuracy } from "@/api/AuthenConnector.js";
import BtnBack from "@/components/BtnBack.vue";

export default {
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
  color: #0daeff;
}
</style>
