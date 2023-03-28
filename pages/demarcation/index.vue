<template lang="">
  <div class="container">
    <div class="text-center mt-16 text-3xl font-bold title">Đinh Biên</div>
    <div class="text-center mt-2 font-semibold mb-10"></div>
    <div class="max-w-2xl m-auto m-0">
      <b-form @submit="onSubmit">
        <b-form-group
          id="input-group-2"
          label="SỐ định biên theo tổ:"
          label-for="input-2"
        >
          <b-form-input
            v-model="form.transfer.number"
            placeholder="Nhập "
            required
            type="number"
          ></b-form-input>
          <div class="flex justify-between">
            <b-form-group
              id="input-group-3"
              label="Chọn bộ phận:"
              label-for="input-3"
              class="width48"
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
              label="Chọn tổ:"
              label-for="input-3"
              class="width48"
            >
              <b-form-select
                id="input-3"
                v-model="form.transfer.group"
                :options="parts2"
                placeholder="nhập "
                required
              ></b-form-select>
            </b-form-group>
          </div>
          <!-- <b-form-group
            id="input-group-2"
            label="Chọn tổ điều chuyển đến:"
            label-for="input-2"
          >
            <b-form-input
              v-model="form.transfer.group"
              placeholder="Nhập "
              required
            ></b-form-input>
          </b-form-group> -->
        </b-form-group>

        <div class="flex">
          <b-button type="submit" variant="primary" class="text-blue-700 mb-24"
            >Xác nhận</b-button
          >
        </div>
      </b-form>
    </div>
  </div>
</template>
<script>
import { groupRoleRoot, groupRoleDetails } from "@/api/AuthenConnector.js";
export default {
  middleware: "auth",
  data() {
    return {
      parts: [],
      parts2: [],
      form: {
        parentId: "",
        transfer: { number: "", group: "" },
      },
    };
  },
  watch: {
    "form.parentId": {
      handler: function (value) {
        this.groupRoleDetails(value);
      },
      deep: true,
    },
  },
  fetch() {
    this.groupRoleRoot();
  },
  methods: {
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
    onSubmit(event) {
      event.preventDefault();
      this.form.transfer;
    },
  },
};
</script>
<style>
.title {
  color: #0daeff;
}
.width48 {
  width: 48%;
}
</style>
