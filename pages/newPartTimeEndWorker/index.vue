<template lang="">
  <div class="container">
    <div class="text-center mt-10 mb-16 text-3xl font-bold title">
      BÁO CÁO SỐ THỜI VỤ VÀ LAO ĐỘNG KHÔNG TÍNH NĂNG SUẤT
    </div>

    <div class="max-w-sm m-auto m-0">
      <b-form @submit="onSubmit" class="mb-10">
        <b-form-group
          id="input-group-2"
          label="Số thời vụ:"
          label-for="input-2"
        >
          <b-form-input
            type="number"
            v-model="form.partTime"
            placeholder="Nhập "
            required
            class="inputLogin"
          ></b-form-input>
        </b-form-group>
        <b-form-group
          id="input-group-2"
          label="Số lao động không tính năng suất:"
          label-for="input-2"
        >
          <b-form-input
            type="number"
            v-model="form.worker"
            placeholder="Nhập "
            required
            class="inputLogin"
          ></b-form-input>
        </b-form-group>
        <div class="flex float-right">
          <BtnBack class="h-10" />
          <button-skip :skip="skip" v-if="check" />
          <b-button type="submit" variant="primary" class="btnLogin h-10"
            >Xác nhận</b-button
          >
        </div>
      </b-form>
    </div>
  </div>
</template>
<script>
import { mapMutations } from "vuex";
import ButtonSkip from "@/components/buttonSkip";
import BtnBack from "@/components/BtnBack.vue";
import { getDetail } from "@/api/AuthenConnector.js";
import { today } from "@/constants/getToday";
export default {
  middleware: "auth",
  components: { ButtonSkip, BtnBack },
  data() {
    return {
      skip: "/transferEndSupport",
      form: {
        partTime: "",
        worker: "",
      },
      check: true,
    };
  },
  fetch() {
    const isReport = localStorage.getItem("checkReport");
    if (isReport === "true") {
      this.check = false;
      this.getValue();
    }
  },
  methods: {
    ...mapMutations({
      SET_STATE_SEASONAL: "SET_STATE_SEASONAL",
      SET_STATE_STUDENT: "SET_STATE_STUDENT",
    }),
    onSubmit(event) {
      event.preventDefault();
      this.SET_STATE_SEASONAL(this.form.partTime);
      this.SET_STATE_STUDENT(this.form.worker);
      this.$router.push("/transferEndSupport");
    },
    async getValue() {
      const day = today();
      const groupId = localStorage.getItem("groupId");
      const res = await getDetail({ day, groupId });
      if (res) {
        this.form.partTime = Number(res.partTimeNum);
        this.form.worker = Number(res.studentNum);
      }
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
.inputLogin {
  border-radius: 50px;
}
</style>
