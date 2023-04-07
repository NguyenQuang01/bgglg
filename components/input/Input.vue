<template>
  <div class="">
    <b-form @submit="onSubmit">
      <b-form-group id="input-group-2" :label="label.name" label-for="input-2">
        <b-form-input
          required
          type="number"
          v-model="quantityPeople"
          :placeholder="label.placeholder"
          class="inputLogin"
        ></b-form-input>
      </b-form-group>
      <div class="flex float-right">
        <BtnBack class="h-10" />
        <BtnSkip :skip="skip" />
        <b-button type="submit" variant="primary" class="btnLogin h-10"
          >xác nhận
        </b-button>
      </div>
    </b-form>
    <!-- <b-card class="mt-3" header="Form Data Result">
      <pre class="m-0">{{ quantityPeople }}</pre>
    </b-card> -->
  </div>
</template>
<script>
import { mapMutations } from "vuex";
import BtnSkip from "@/components/buttonSkip";
import { getDetail } from "@/api/AuthenConnector.js";
import { today } from "@/constants/getToday";
export default {
  components: {
    BtnSkip,
  },
  props: {
    label: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      quantityPeople: "",
      skip: "/reasonAbsent",
      day: new Date().getDate(),
      month: new Date().getMonth() + 1,
      year: new Date().getFullYear(),
      infDay: "",
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
      SET_STATE_LABOR: "SET_STATE_LABOR",
    }),
    onSubmit(event) {
      event.preventDefault();
      this.SET_STATE_LABOR(this.quantityPeople);
      this.$router.push("/reasonAbsent");
    },
    async getValue() {
      const day = today();
      const groupId = localStorage.getItem("groupId");
      const res = await getDetail({ day, groupId });
      if (res) {
        this.quantityPeople = Number(res.restNum);
      }
    },
  },
};
</script>
<style scoped>
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
