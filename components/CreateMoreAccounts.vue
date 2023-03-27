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
          <b-form-checkbox-group v-model="selected" @input="selectOnlyOne">
            <b-form-checkbox value="edit">edit</b-form-checkbox>
            <b-form-checkbox value="view">view</b-form-checkbox>
            <b-form-checkbox value="report">report</b-form-checkbox>
            <b-form-checkbox value="admin">admin</b-form-checkbox>
          </b-form-checkbox-group>
          <!-- <b-form-checkbox v-model="form.edit"> edit </b-form-checkbox>
          <b-form-checkbox v-model="form.view"> view </b-form-checkbox>
          <b-form-checkbox v-model="form.report"> report </b-form-checkbox>
          <b-form-checkbox v-model="form.admin"> admin </b-form-checkbox> -->
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
          v-model="form.groupId"
          :options="parts2"
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
import { groupRoleRoot, groupRoleDetails } from "@/api/AuthenConnector.js";
import { message } from "ant-design-vue";

export default {
  data() {
    return {
      selected: "",
      form: {
        userLogin: "",
        password: "",
        parentId: "",
        groupId: "",
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
  watch: {
    "form.parentId": {
      handler: function (value) {
        this.groupRoleDetails(value);
      },
      deep: true,
    },
  },
  methods: {
    selectOnlyOne(selected) {
      switch (selected) {
        case "edit":
          this.form.edit = true;
          this.form.view = false;
          this.form.report = false;
          this.form.admin = false;
          break;
        case "view":
          this.form.view = true;
          this.form.edit = false;
          this.form.report = false;
          this.form.admin = false;
          break;
        case "report":
          this.form.report = true;
          this.form.view = false;
          this.form.edit = false;
          this.form.admin = false;
          break;
        case "admin":
          this.form.admin = true;
          this.form.view = false;
          this.form.report = false;
          this.form.edit = false;
          break;
        default:
        // code block
      }
      this.selected = selected;
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
          groupId: "",
          edit: false,
          view: false,
          report: false,
          admin: false,
        };
      }
    },
    async groupRoleRoot() {
      const res = await groupRoleRoot();
      this.parts = res.map((item) => ({
        text: item.groupName,
        value: item.id,
      }));
    },
    async groupRoleDetails(param) {
      const res = await groupRoleDetails(param);
      this.parts2 = res.map((item) => ({
        text: item.groupName,
        value: item.id,
      }));
    },
  },
};
</script>
<style>
.btnSuccess {
  color: #0069d9;
}
</style>
