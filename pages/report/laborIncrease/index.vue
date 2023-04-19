<template lang="">
  <div class="container">
    <div class="text-center mt-10 mb-16 text-3xl font-bold title">
      BÁO CÁO SỐ LAO ĐỘNG TĂNG
    </div>

    <div class="max-w-sm m-auto m-0">
      <b-form @submit="onSubmit" class="mb-10">
        <b-form-group
          id="input-group-2"
          label="Lao động biết nghề:"
          label-for="input-2"
        >
          <b-form-input
            type="number"
            v-model="form.professionLabor"
            placeholder="Nhập "
            required
            class="inputLogin"
          ></b-form-input>
        </b-form-group>
        <b-form-group
          id="input-group-2"
          label="Lao động chưa biết nghề:"
          label-for="input-2"
        >
          <b-form-input
            type="number"
            v-model="form.professionNotLabor"
            placeholder="Nhập "
            required
            class="inputLogin"
          ></b-form-input>
        </b-form-group>
        <div class="flex float-right">
          <BtnBack class="h-10" />
          <button-skip :skip="skip" />
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
  //   middleware: "auth",
  components: { ButtonSkip, BtnBack },
  data() {
    return {
      skip: "/report/decreaseInLabor",
      form: {
        professionLabor: "",
        professionNotLabor: "",
      },
    };
  },
  fetch() {
    const isReport = localStorage.getItem("checkReport");
    if (isReport === "true") {
      this.getValue();
    }
  },
  methods: {
    ...mapMutations({
      SET_STATE_PROFESSIONLABOR: "SET_STATE_PROFESSIONLABOR",
      SET_STATE_PROFESSIONOTLABOR: "SET_STATE_PROFESSIONOTLABOR",
    }),
    onSubmit(event) {
      event.preventDefault();
      this.SET_STATE_PROFESSIONLABOR(this.form.professionLabor);
      this.SET_STATE_PROFESSIONOTLABOR(this.form.professionNotLabor);
      this.$router.push("/report/decreaseInLabor");
    },
    async getValue() {
      const day = today();
      const groupId = localStorage.getItem("groupId");
      const res = await getDetail({ day, groupId });
      if (res) {
        this.form.professionLabor = Number(res.professionLabor);
        this.form.professionNotLabor = Number(res.professionNotLabor);
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
