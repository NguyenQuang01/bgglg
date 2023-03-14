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
        <button-skip />
      </div>
    </b-form>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
import ButtonSkip from "../buttonSkip";
export default {
  components: { ButtonSkip },
  data() {
    return {
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
        { value: null, text: "chọn lý do" },
        { value: "Thai sản", text: "Thai sản" },
        { value: "Không lương", text: "Không lương" },
        { value: "ốm", text: "ốm" },
        { value: "con ốm", text: "con ốm" },
        { value: "việc riêng", text: "việc riêng" },
        { value: "học", text: "học" },
        { value: "nghỉ phép", text: "nghỉ phép" },
        { value: "việc khác", text: "việc khác" },
        { value: "tự do", text: "tự do" },
        { value: "nghỉ t7+CN", text: "nghỉ t7+CN" },
        {
          value: "nghỉ chấm dứt hợp đồng lao động",
          text: "nghỉ chấm dứt hợp đồng lao động",
        },
      ],
      valueSubmit: {},
    };
  },
  fetch() {
    this.arrForms.push(this.form);
  },
  methods: {
    ...mapMutations({ SET_STATE_ARRLABOR: "SET_STATE_ARRLABOR" }),
    onSubmit(event) {
      event.preventDefault();
      console.log(this.arrForms);
      const arrLabor = this.arrForms.map(
        (item) => `${item.user}-${item.reason}`
      );
      this.SET_STATE_ARRLABOR(arrLabor);
      this.$router.push("/newPartTimeEndWorker");
      // this.$router.push("/");
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
