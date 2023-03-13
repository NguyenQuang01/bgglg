<template lang="">
  <div class="container">
    <div class="text-center mt-10 mb-16 text-3xl font-bold title">BÁO CƠM</div>

    <div class="max-w-2xl m-auto m-0">
      <b-button @click="$router.back()" class="text-blue-500 border-none p-0"
        ><b-icon icon="arrow-bar-left" aria-hidden="true"></b-icon>trở
        lại</b-button
      >
      <b-form @submit="onSubmit">
        <b-form-group
          id="input-group-2"
          label="Nhập số lao động ăn cơm trưa:"
          label-for="input-2"
        >
          <b-form-input v-model="numberMeal" placeholder="Nhập "></b-form-input>
        </b-form-group>

        <b-button type="submit" variant="primary" class="text-blue-700"
          >Xác nhận</b-button
        >
      </b-form>
    </div>
  </div>
</template>
<script>
import { mapMutations, mapGetters } from "vuex";
export default {
  data() {
    return {
      numberMeal: "",
    };
  },
  computed: {
    ...mapGetters({
      getDataInformationReport: "getDataInformationReport",
    }),
  },
  methods: {
    ...mapMutations({
      SET_STATE_MEAL: "SET_STATE_MEAL",
      SET_STATE_DEMARCATION: "SET_STATE_DEMARCATION",
      SET_STATE_PRODUCTIVITY: "SET_STATE_PRODUCTIVITY",
    }),
    onSubmit(event) {
      event.preventDefault();
      this.SET_STATE_MEAL(this.numberMeal);
      this.getDemarcation();
      this.getProductivity();
      this.$router.push("/reportInformation");
    },
    getDemarcation() {
      const demarcation =
        5 +
        Number(this.getDataInformationReport.student) +
        Number(this.getDataInformationReport.seasonal);
      this.SET_STATE_DEMARCATION(demarcation);
    },
    getProductivity() {
      const productivity =
        Number(this.getDataInformationReport.demarcation) -
        Number(this.getDataInformationReport.labor) -
        Number(this.getDataInformationReport.student) -
        Number(this.getDataInformationReport.transfer) -
        Number(this.getDataInformationReport.support);
      this.SET_STATE_PRODUCTIVITY(productivity);
    },
  },
};
</script>
<style scoped>
.title {
  color: #0daeff;
}
</style>
