<template lang="">
  <div class="container">
    <div class="text-center mt-10 mb-16 text-3xl font-bold title">BÁO CƠM</div>

    <div class="max-w-2xl m-auto m-0">
      <BtnBack />
      <b-form @submit="onSubmit">
        <b-form-group
          id="input-group-2"
          label="Nhập số lao động ăn cơm trưa :"
          label-for="input-2"
        >
          <b-form-input
            v-model="numberMeal.staff"
            placeholder="Nhập "
            type="number"
          ></b-form-input>
        </b-form-group>
        <b-form-group
          id="input-group-2"
          label="Nhập số khách ăn cơm trưa:"
          label-for="input-2"
        >
          <b-form-input
            v-model="numberMeal.guest"
            placeholder="Nhập "
            type="number"
          ></b-form-input>
        </b-form-group>
        <b-form-group
          id="input-group-2"
          label="Nhập số khách VIP ăn cơm trưa:"
          label-for="input-2"
        >
          <b-form-input
            v-model="numberMeal.guestVip"
            placeholder="Nhập "
            type="number"
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
import { mapMutations, mapGetters } from "vuex";
import ButtonSkip from "@/components/buttonSkip";
import BtnBack from "@/components/BtnBack.vue";
import { getDetail } from "@/api/AuthenConnector.js";
import { today } from "@/constants/getToday";
export default {
  components: { ButtonSkip, BtnBack },
  middleware: "auth",
  data() {
    return {
      skip: "/reportInformation",
      numberMeal: {
        staff: "",
        guest: "",
        guestVip: "",
      },
    };
  },
  computed: {
    ...mapGetters({
      getDataInformationReport: "getDataInformationReport",
    }),
  },
  fetch() {
    const isReport = localStorage.getItem("checkReport");
    if (isReport) {
      this.getValue();
    }
  },
  methods: {
    ...mapMutations({
      SET_STATE_MEAL: "SET_STATE_MEAL",
    }),
    onSubmit(event) {
      event.preventDefault();
      this.SET_STATE_MEAL(this.numberMeal);

      this.$router.push("/reportInformation");
    },
    async getValue() {
      const day = today();
      const groupId = localStorage.getItem("groupId");
      const res = await getDetail({ day, groupId });
      if (res) {
        this.numberMeal = {
          staff: res.rice.riceCus,
          guest: res.rice.riceEmp,
          guestVip: res.rice.riceVip,
        };
      }
    },
  },
};
</script>
<style scoped>
.title {
  color: #0daeff;
}
</style>
