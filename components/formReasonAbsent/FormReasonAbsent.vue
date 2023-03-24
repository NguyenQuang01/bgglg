<template>
  <div>
    <b-form @submit="onSubmit">
      <div v-for="(item, index) in arrForms" :key="index">
        <div class="font-extrabold text-lg">người thứ : {{ index + 1 }}</div>
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
      },
      arrForms: [],
      valueTextarea: "",
      selected: null,
      options: [
        // { value: null, text: "chọn lý do" },
        // { value: 1, text: "Thai sản" },
        // { value: 2, text: "Không lương" },
        // { value: 3, text: "ốm" },
        // { value: 4, text: "con ốm" },
        // { value: 5, text: "việc riêng" },
        // { value: 6, text: "học" },
        // { value: 7, text: "nghỉ phép" },
        // { value: 8, text: "việc khác" },
        // { value: 9, text: "tự do" },
        // { value: 10, text: "nghỉ t7+CN" },
        // {
        //   value: 11,
        //   text: "nghỉ chấm dứt hợp đồng lao động",
        // },
      ],
      options2: [],
      valueSubmit: {},
    };
  },
  fetch() {
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
      }));
      console.log(arrLabor);
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

    addQuantity() {
      this.amoun = this.amoun + 1;
      for (let i = 0; i < this.amount; i++) {
        this.arrForms.push({
          user: "",
          id: "",
          reason: "",
        });
      }
    },
  },
};
</script>
