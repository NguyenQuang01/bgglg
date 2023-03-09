<template>
  <div>
    <b-form @submit="onSubmit" @reset="onReset">
      <div v-for="(item, index) in arrForms" :key="index">
        <div class="font-extrabold text-lg">người thứ : {{ index + 1 }}</div>
        <b-form-group label="Nhập tên :" label-for="input-2">
          <b-form-input
            id="input-2"
            v-model="item.user"
            placeholder="họ và tên"
            required
          ></b-form-input>
        </b-form-group>
        <b-form-group label="Nhập mã số lao động :" label-for="input-2">
          <b-form-input
            id="input-2"
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

      <b-button type="submit" variant="primary" class="text-blue-700"
        >xác nhận</b-button
      >
    </b-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
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
        { value: "b", text: "Thai sản" },
        { value: "b", text: "Không lương" },
        { value: "b", text: "ốm" },
        { value: "b", text: "con ốm" },
        { value: "b", text: "việc riêng" },
        { value: "b", text: "học" },
        { value: "b", text: "nghỉ phép" },
        { value: "b", text: "việc khác" },
        { value: "b", text: "tự do" },
        { value: "b", text: "nghỉ t7+CN" },
        { value: "b", text: "nghỉ chấm dứt hợp đồng lao động" },
      ],
      valueSubmit: {},
    };
  },
  fetch() {
    const amount = 5;
    for (let i = 0; i < amount; i++) {
      this.arrForms.push(this.form);
    }
  },
  methods: {
    onSubmit(event) {
      event.preventDefault();
      alert("first");
      //       this.$router.push("/laborreport");
      // this.$router.push("/");
    },
    onReset(event) {
      event.preventDefault();
      // Reset our form values
      this.form.pass = "";
      this.form.user = "";

      // Trick to reset/clear native browser form validation state
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
      });
    },
  },
};
</script>
