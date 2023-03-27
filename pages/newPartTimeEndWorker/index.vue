<template lang="">
  <div class="container">
    <div class="text-center mt-10 mb-16 text-3xl font-bold title">
      BÁO CÁO SỐ THỜI VỤ & CÔNG NHÂN MỚI
    </div>

    <div class="max-w-2xl m-auto m-0">
      <BtnBack />

      <b-form @submit="onSubmit" class="mb-10">
        <b-form-group
          id="input-group-2"
          label="SỐ THỜI VỤ:"
          label-for="input-2"
        >
          <b-form-input
            type="number"
            v-model="form.partTime"
            placeholder="Nhập "
            required
          ></b-form-input>
        </b-form-group>
        <b-form-group
          id="input-group-2"
          label="SỐ HỌC SINH:"
          label-for="input-2"
        >
          <b-form-input
            type="number"
            v-model="form.worker"
            placeholder="Nhập "
            required
          ></b-form-input>
        </b-form-group>
        <div class="flex">
          <b-button type="submit" variant="primary" class="text-blue-700"
            >Xác nhận</b-button
          >
          <button-skip :skip="skip" />
        </div>
      </b-form>
    </div>
  </div>
</template>
<script>
import { mapMutations } from "vuex";
import ButtonSkip from "@/components/buttonSkip";
import BtnBack from "@/components/BtnBack.vue";

export default {
  components: { ButtonSkip, BtnBack },
  data() {
    return {
      skip: "/transferEndSupport",
      form: {
        partTime: "",
        worker: "",
      },
    };
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
  },
};
</script>
<style scoped>
.title {
  color: #0daeff;
}
</style>
