<template>
  <div>
    <b-form @submit="onSubmit">
      <div v-for="(item, index) in arrForms" :key="index">
        <div class="font-extrabold text-lg">
          người thứ : {{ index + 1 }}
          <b-button class="delete" @click="deletes(index, item)">x</b-button>
        </div>

        <b-form-group label="Nhập tên :" label-for="input-2">
          <b-form-input
            v-model="item.user"
            placeholder="họ và tên"
            required
          ></b-form-input>
        </b-form-group>
        <b-form-group label="Nhập mã số lao động :" label-for="input-2">
          <b-form-input
            v-model="item.id"
            placeholder="mã số lao động"
            required
          ></b-form-input>
        </b-form-group>
        <b-form-group label="Chọn ly do :" label-for="input-2">
          <b-form-select
            label="Nhập mã số ly do :"
            v-model="item.reason"
            :options="options"
            required
          ></b-form-select>
        </b-form-group>
      </div>
      <div class="flex mb-24">
        <b-button
          variant="primary"
          class="text-blue-700 mb-24"
          @click="addQuantity"
          >Thêm</b-button
        >
        <b-button
          type="submit"
          variant="primary"
          class="text-blue-700 mb-24 ml-2"
          >xác nhận</b-button
        >
        <button-skip :skip="skip" />
      </div>
    </b-form>
  </div>
</template>
<script>
import { mapMutations } from "vuex";
import ButtonSkip from "../buttonSkip";
import { reason } from "@/api/AuthenConnector.js";
import { getDetail } from "@/api/AuthenConnector.js";
import { today } from "@/constants/getToday";
export default {
  components: { ButtonSkip },
  data() {
    return {
      skip: "/newPartTimeEndWorker",
      amount: 1,
      form: {
        user: "",
        id: "",
        reason: "",
        restId: "",
      },
      arrForms: [],
      valueTextarea: "",
      selected: null,
      options: [],
      options2: [],
      valueSubmit: {},
    };
  },
  fetch() {
    const isReport = localStorage.getItem("checkReport");
    if (isReport === "true") {
      this.getValue();
    }
    this.arrForms.push(this.form);
    this.getReason();
  },
  methods: {
    ...mapMutations({ SET_STATE_ARRLABOR: "SET_STATE_ARRLABOR" }),
    onSubmit(event) {
      event.preventDefault();
      const arrLabor = this.arrForms.map((item) => ({
        restName: item.user,
        reasonId: item.reason,
        restId: item.restId,
        reasonName: item.reasonName,
      }));
      this.SET_STATE_ARRLABOR(arrLabor);
      this.$router.push("/newPartTimeEndWorker");
      // this.$router.push("/");
    },
    async getReason() {
      const res = await reason();
      if (res) {
        this.options = res.data.map((item) => ({
          value: item.id,
          text: item.name,
        }));
      }
    },
    deletes(id) {
      this.arrForms.splice(id, 1);
    },
    addQuantity() {
      this.amoun = this.amoun + 1;
      for (let i = 0; i < this.amount; i++) {
        this.arrForms.push({
          user: "",
          id: "",
          reason: "",
          reasonName: "",
        });
      }
    },
    async getValue() {
      const day = today();
      const groupId = localStorage.getItem("groupId");
      const res = await getDetail({ day, groupId });
      if (res) {
        this.arrForms = res.rests.map((item) => ({
          user: item.restName,
          id: item.restId,
          reason: item.reasonId,
          restId: item.restId,
          reasonName: item.reasonName,
        }));
      }
    },
  },
};
</script>
<style>
.delete {
  background-color: rgba(136, 136, 136, 0.8);
  padding: 2px 10px;
  border: none;
  border-radius: 50%;
}
</style>
