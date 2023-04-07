<template lang="">
  <div class="container">
    <div class="text-center mt-10 mb-16 text-3xl font-bold title">BÁO CƠM</div>

    <div class="max-w-sm m-auto m-0">
      <b-form @submit="onSubmit">
        <b-form-group
          id="input-group-2"
          label="Nhập số lao động ăn cơm trưa :"
          label-for="input-2"
        >
          <b-form-input
            v-model="numberMeal.staff"
            placeholder="Nhập "
            class="inputLogin"
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
            class="inputLogin"
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
import { mapMutations, mapGetters } from "vuex";
import ButtonSkip from "@/components/buttonSkip";
import BtnBack from "@/components/BtnBack.vue";
import { getDetail } from "@/api/AuthenConnector.js";
import { today } from "@/constants/getToday";
export default {
  components: { ButtonSkip, BtnBack },
  // middleware: "auth",
  data() {
    return {
      skip: "/reportInformation",
      numberMeal: {
        staff: "",
        guest: "",
        guestVip: "",
        riceId: "",
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
    if (isReport === "true") {
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
          staff: Number(res.rice.riceCus),
          guest: Number(res.rice.riceEmp),
          guestVip: Number(res.rice.riceVip),
          riceId: Number(res.rice.riceId),
        };
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
