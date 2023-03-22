<template lang="">
  <div>
    <b-form @submit="onSubmit" v-if="show">
      <b-form-group id="input-group-1" label="Nhập tên:" label-for="input-1">
        <b-form-input
          id="input-1"
          v-model="form.userLogin"
          type="text"
          placeholder="Nhập"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group
        id="input-group-2"
        label="nhập mật khẩu:"
        label-for="input-2"
      >
        <b-form-input
          id="input-2"
          v-model="form.password"
          placeholder="nhập "
          type="password"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group
        id="input-group-3"
        label="Chọn quyền tài khoản:"
        label-for="input-3"
      >
        <div>
          <b-form-checkbox v-model="form.edit"> edit </b-form-checkbox>
          <b-form-checkbox v-model="form.eiew"> view </b-form-checkbox>
          <b-form-checkbox v-model="form.report"> report </b-form-checkbox>
          <b-form-checkbox v-model="form.admin"> admin </b-form-checkbox>
        </div>
      </b-form-group>
      <b-form-group
        id="input-group-3"
        label="Chọn bộ phận:"
        label-for="input-3"
      >
        <b-form-select
          id="input-3"
          v-model="form.parentId"
          :options="parts"
          placeholder="nhập "
          required
        ></b-form-select>
      </b-form-group>
      <b-form-group
        id="input-group-3"
        label="Chọn phân loại:"
        label-for="input-3"
      >
        <b-form-select
          id="input-3"
          v-model="form.groupName"
          :options="parts"
          placeholder="nhập "
          required
        ></b-form-select>
      </b-form-group>
      <b-button type="submit" variant="primary" class="btnSuccess"
        >Submit</b-button
      >
    </b-form>
  </div>
</template>
<script>
import { addAccount } from "@/api/AuthenConnector.js";

export default {
  data() {
    return {
      form: {
        userLogin: "",
        password: "",
        parentId: "",
        groupName: "",
        edit: false,
        eiew: false,
        report: false,
        admin: false,
      },
      list: [],
      part: "",
      parts: [
        { text: "", value: null },
        { text: "Văn Phòng", value: 1 },
        { text: "Đơn vị lẻ", value: 2 },
        { text: "Tổ may", value: 3 },
      ],
      show: true,
    };
  },
  methods: {
    async onSubmit(event) {
      event.preventDefault();
      const res = await addAccount(this.form);
      console.log(res);
    },
  },
};
</script>
<style>
.btnSuccess {
  color: #0069d9;
}
</style>
