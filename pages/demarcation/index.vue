<template lang="">
  <div class="container">
    <div class="text-center mt-16 text-3xl font-bold title2">Định Biên</div>
    <div class="text-center mt-2 font-semibold mb-10"></div>
    <div class="max-w-sm m-auto m-0">
      <b-form @submit="onSubmit">
        <b-form-group
          id="input-group-2"
          label="SỐ định biên theo tổ:"
          label-for="input-2"
        >
          <b-form-input
            v-model="form.demarcation"
            placeholder="Nhập "
            required
            class="inputLogin"
            type="number"
          ></b-form-input>
          <b-form-group id="input-group-3" label="Chọn tổ:" label-for="input-3">
            <a-cascader
              :options="parts"
              expand-trigger="hover"
              placeholder="chọn"
              @change="onChange"
            />
          </b-form-group>
        </b-form-group>

        <div class="flex float-right">
          <BtnBack class="h-10" />
          <b-button type="submit" variant="primary" class="btnLogin mb-24"
            >Xác nhận</b-button
          >
        </div>
      </b-form>
    </div>
  </div>
</template>
<script>
import {
  groupRoleRoot,
  groupRoleDetails,
  updateDemarcation,
  getDemarcation,
} from "@/api/AuthenConnector.js";
import { message } from "ant-design-vue";
import BtnBack from "@/components/BtnBack.vue";

export default {
  components: ["BtnBack"],
  middleware: "auth",
  data() {
    return {
      parts: [],
      parts2: [],
      form: {
        // parentId: "",
        demarcation: "",
        id: "",
      },
    };
  },

  fetch() {
    this.groupRoleRoot();
  },
  methods: {
    onChange(value) {
      const lastElement = value[value.length - 1];

      this.form.id = lastElement;
    },
    async groupRoleRoot() {
      const res = await groupRoleRoot();
      this.parts = res.data;
    },
    async groupRoleDetails(param) {
      const res = await groupRoleDetails(param);
      this.parts2 = res.map((item) => ({
        text: item.id,
        value: item.id,
      }));
    },
    async onSubmit(event) {
      event.preventDefault();

      const res = await updateDemarcation(this.form.demarcation, this.form.id);
      if (res && res.status === 200) {
        message.success("cập nhật thành công");
      }
    },
  },
};
</script>
<style scoped>
.title2 {
  color: #045396;
}
.width48 {
  width: 48%;
}
.inputLogin {
  border-radius: 50px;
}
.btnLogin {
  background-color: #045396;
  color: #ffff;
  margin-bottom: 20px;
}
</style>
