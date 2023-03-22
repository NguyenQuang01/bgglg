<template lang="">
  <div class="container">
    <div class="text-center mt-10 mb-24 text-3xl font-bold title">
      Tạo Tài Khoản
    </div>

    <div class="max-w-2xl m-auto m-0">
      <b-button @click="$router.back()" class="text-blue-500 border-none p-0"
        ><b-icon icon="arrow-bar-left" aria-hidden="true"></b-icon>trở
        lại</b-button
      >
      <div>
        <b-form @submit="onSubmit" v-if="show">
          <b-form-group
            id="input-group-1"
            label="Nhập tên:"
            label-for="input-1"
          >
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
          <b-button type="submit" variant="primary">Submit</b-button>
        </b-form>
      </div>
    </div>
    <b-card class="mt-3" header="Form Data Result">
      <pre class="m-0">{{ form }}</pre>
    </b-card>
  </div>
</template>
<script>
export default {
  data() {
    return {
      form: {
        userLogin: "user2",
        password: "user2",
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
    onSubmit(event) {
      event.preventDefault();
      alert(JSON.stringify(this.form));
    },
  },
};
</script>
<style scoped>
.title {
  color: #0daeff;
}
</style>
