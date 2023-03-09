<template>
  <div class="">
    <b-form @submit="onSubmit" @reset="onReset">
      <b-form-group label="Nhập tên :" label-for="input-2">
        <b-form-input
          id="input-2"
          v-model="form.user"
          placeholder="họ và tên"
          required
        ></b-form-input>
      </b-form-group>
      <b-form-group label="Nhập mã số lao động :" label-for="input-2">
        <b-form-input
          id="input-2"
          v-model="form.id"
          placeholder="mã số lao động"
          required
        ></b-form-input>
      </b-form-group>
      <b-form-group label="Chọn ly do :" label-for="input-2">
        <b-form-select
          label="Nhập mã số ly do :"
          v-model="selected"
          :options="options"
          required
        ></b-form-select>
      </b-form-group>
      <b-form-group label="Thêm ly do :" label-for="input-2">
        <b-form-textarea
          id="textarea"
          v-model="text"
          placeholder="ly do"
          rows="3"
          max-rows="6"
        ></b-form-textarea>
      </b-form-group>

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
      },

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
