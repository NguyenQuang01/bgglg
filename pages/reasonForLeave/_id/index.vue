<template lang="">
  <div class="container">
    <div class="text-center mt-16 text-3xl font-bold title">Welcome back!</div>
    <div class="text-center mt-2 font-semibold mb-10">sửa Lý do nghỉ</div>
    <div class="max-w-2xl m-auto m-0">
      <div>
        <b-form @submit="onSubmit">
          <b-form-group
            id="input-group-1"
            label="sửa Lý do nghỉ:"
            label-for="input-1"
          >
            <b-form-input
              id="input-1"
              v-model="form.name"
              type="text"
              placeholder="lý do"
              required
            ></b-form-input>
          </b-form-group>

          <div class="mb-2 flex">
            <b-button type="submit" variant="primary text-black ">sửa</b-button>
          </div>
        </b-form>
      </div>
    </div>
  </div>
</template>
<script>
import { editLeave, getleaveId } from "@/api/AuthenConnector.js";
import { message } from "ant-design-vue";
export default {
  data() {
    return {
      form: {
        name: "",
      },
      paramId: this.$route.params,
    };
  },

  fetch() {
    this.getValueEdit();
  },
  methods: {
    async onSubmit(event) {
      event.preventDefault();
      const res = await editLeave(this.form.name, this.paramId.id);
    },
    async getValueEdit() {
      const res = await getleaveId(this.paramId.id);
      if (res) {
        this.form.name = res.data[0].name;

        if (res && res.code === 200) {
          message.success("sửa thành công");
          setTimeout(() => {
            window.location.href = `/reasonForLeave`;
          }, "1000");
        }
      }
    },
  },
};
</script>
<style scoped>
.title {
  color: #0daeff;
}
</style>
