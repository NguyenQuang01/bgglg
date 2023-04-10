<template lang="">
  <div>
    <b-form @submit="onSubmit" v-if="show">
      <b-form-group id="input-group-1" label="Nhập tên:" label-for="input-1">
        <b-form-input
          id="input-1"
          v-model="form.groupName"
          type="text"
          placeholder="Nhập"
          class="inputLogin"
          required
        ></b-form-input>
      </b-form-group>
      <b-form-group
        id="input-group-1"
        label="Nhập định biên:"
        label-for="input-1"
      >
        <b-form-input
          id="input-1"
          v-model="form.demarcation"
          type="text"
          placeholder="Nhập"
          class="inputLogin"
          required
        ></b-form-input>
      </b-form-group>
      <b-form-group id="input-group-3" label="Tổ đơn vị" label-for="input-3">
        <a-cascader
          :options="options"
          placeholder="chọn"
          @change="onChange"
          class="inputLogin"
          change-on-select
        />
      </b-form-group>

      <div class="flex float-right mt-5">
        <BtnBack class="mr-2" />
        <b-button type="submit" variant="primary" class="btnSuccess"
          >Thêm</b-button
        >
      </div>
    </b-form>
    <div class="py-10"></div>
  </div>
</template>
<script>
import { addGroupRole } from "@/api/AuthenConnector.js";
import { groupRoleRoot } from "@/api/AuthenConnector.js";
import { message } from "ant-design-vue";

export default {
  data() {
    return {
      options: [],
      selected: "",
      form: {
        groupName: "",
        demarcation: "",
        groupNameRoot: "",
        groupParent: "",
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
      const lastElement2 = value[value.length - 2];
      this.form.groupName = lastElement;
      this.form.groupParent = lastElement2;
    },

    async onSubmit(event) {
      event.preventDefault();
      const res = await addGroupRole(this.form);
      if (!res) {
        message.warning("Tên đã có ");
      }
      if (res && res.status === 201) {
        message.success("đăng kí thành công");
        this.form = {
          userLogin: "",
          password: "",
          groupNameRoot: "",
          groupName: "",
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
