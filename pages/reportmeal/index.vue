<template lang="">
  <div class="container">
    <div class="text-center mt-10 mb-16 text-3xl font-bold title">BÁO CƠM</div>

    <div class="max-w-2xl m-auto m-0">
      <b-button   @click="$router.back()"  class="text-blue-500 border-none p-0"
          ><b-icon icon="arrow-bar-left" aria-hidden="true"></b-icon>trở lại</a
        ></b-button>
      <b-form @submit="onSubmit">
        <b-form-group
          id="input-group-2"
          label="SỐ THỜI VỤ:"
          label-for="input-2"
        >
          <b-form-input
            v-model="numberMeal"
            placeholder="Nhập số lao động ăn cơm trưa "
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
      numberMeal: "",
    };
  },
  methods: {
    onSubmit(event) {
      event.preventDefault();
      console.log(this.numberMeal);
      this.$router.push("/reportInformation");
    },
  },
};
</script>
<style scoped>
.title {
  color: #0daeff;
}
</style>
