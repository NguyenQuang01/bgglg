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
          <b-form-checkbox v-model="form.view"> view </b-form-checkbox>
          <b-form-checkbox v-model="form.report"> report </b-form-checkbox>
          <b-form-checkbox v-model="form.admin"> admin </b-form-checkbox>
        </div>
      </b-form-group>

      <b-form-group id="input-group-3" label="Chọn tổ:" label-for="input-3">
        <a-cascader
          :options="options"
          :display-render="displayRender"
          expand-trigger="hover"
          placeholder="chọn"
          @change="onChange"
        />
      </b-form-group>
      <b-button type="submit" variant="primary" class="btnSuccess"
        >Submit</b-button
      >
    </b-form>
  </div>
</template>
<script>
import { addAccount } from "@/api/AuthenConnector.js";
import { groupRoleRoot } from "@/api/AuthenConnector.js";
import { message } from "ant-design-vue";

export default {
  data() {
    return {
      options: [],
      selected: "",
      form: {
        userLogin: "",
        password: "",
        parentId: "",
        groupName: "",
        edit: false,
        view: false,
        report: false,
        admin: false,
      },
      list: [],
      part: "",
      parts: [],
      parts2: [],
      show: true,
    };
  },
  fetch() {
    this.groupRoleRoot();
  },
  methods: {
    onChange(value) {
      const lastElement = value[value.length - 1];
      this.form.groupName = lastElement;
    },
    displayRender({ labels }) {
      return labels[labels.length - 1];
    },

    async onSubmit(event) {
      event.preventDefault();
      const res = await addAccount(this.form);
      if (!res) {
        message.success("đã có tài khoản");
      }
      if (res && res.status === 201) {
        message.success("đăng kí thành công");
        this.form = {
          userLogin: "",
          password: "",
          parentId: "",
          groupName: "",
          edit: false,
          view: false,
          report: false,
          admin: false,
        };
      }
    },
    async groupRoleRoot() {
      const res = await groupRoleRoot();
      if (res) {
        this.options = res.data;
      }
    },
  },
};
</script>
<style>
.btnSuccess {
  color: #0069d9;
}
</style>
