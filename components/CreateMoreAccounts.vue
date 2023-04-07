<template lang="">
  <div>
    <b-form @submit="onSubmit" v-if="show">
      <b-form-group id="input-group-1" label="Nhập tên:" label-for="input-1">
        <b-form-input
          id="input-1"
          v-model="form.userLogin"
          type="text"
          placeholder="Nhập"
          class="inputLogin"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group
        id="input-group-2"
        label="Nhập mật khẩu:"
        label-for="input-2"
      >
        <b-form-input
          id="input-2"
          v-model="form.password"
          placeholder="Nhập "
          type="password"
          class="inputLogin"
          required
        ></b-form-input>
      </b-form-group>
      <b-form-group id="input-group-3" label="Tổ đơn vị" label-for="input-3">
        <a-cascader
          :options="options"
          :display-render="displayRender"
          expand-trigger="hover"
          placeholder="chọn"
          @change="onChange"
          class="inputLogin"
        />
      </b-form-group>
      <b-form-group
        id="input-group-3"
        label="Chọn quyền tài khoản:"
        label-for="input-3"
      >
        <div class="flex justify-between">
          <b-form-checkbox v-model="form.edit"> Edit </b-form-checkbox>
          <b-form-checkbox v-model="form.view"> View </b-form-checkbox>
          <b-form-checkbox v-model="form.report"> Report </b-form-checkbox>
          <b-form-checkbox v-model="form.admin"> Admin </b-form-checkbox>
        </div>
      </b-form-group>
      <div class="flex float-right mt-5">
        <BtnBack class="mr-2" />
        <b-button type="submit" variant="primary" class="btnSuccess"
          >Tạo tài khoản</b-button
        >
      </div>
    </b-form>
    <div class="py-10"></div>
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
.ant-cascader-input {
  border-radius: 50px;
}
.btnSuccess {
  color: #ffff;
  background-color: #045396;
  border-radius: 50px;
}
.inputLogin {
  border-radius: 50px;
}
</style>
