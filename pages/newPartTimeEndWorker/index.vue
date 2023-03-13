<template lang="">
  <div class="container">
    <div class="text-center mt-10 mb-20 text-3xl font-bold title">
      BÁO CÁO SỐ THỜI VỤ & CÔNG NHÂN MỚI
    </div>

    <div class="max-w-2xl m-auto m-0">
      <div class="mb-2 p-2" @click="$router.back()">
        <a href="#"
          ><b-icon icon="arrow-bar-left" aria-hidden="true"></b-icon>trở lại</a
        >
      </div>
      <b-form @submit="onSubmit" class="mb-10">
        <b-form-group
          id="input-group-2"
          label="SỐ THỜI VỤ:"
          label-for="input-2"
        >
          <b-form-input
            v-model="form.partTime"
            placeholder="Nhập "
          ></b-form-input>
        </b-form-group>
        <b-form-group
          id="input-group-2"
          label="SỐ HỌC SINH:"
          label-for="input-2"
        >
          <b-form-input
            v-model="form.worker"
            placeholder="Nhập "
          ></b-form-input>
        </b-form-group>

        <b-button type="submit" variant="primary" class="text-blue-700"
          >Xác nhận</b-button
        >
      </b-form>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      form: {
        partTime: "",
        worker: "",
      },
    };
  },
  methods: {
    onSubmit(event) {
      event.preventDefault();
      this.$router.push("/transferEndSupport");
    },
  },
};
</script>
<style scoped>
.title {
  color: #0daeff;
}
</style>
