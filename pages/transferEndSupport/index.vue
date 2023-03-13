<template lang="">
  <div class="container">
    <div class="text-center mt-10 mb-20 text-3xl font-bold title">
      BÁO CÁO SỐ ĐIỀU CHUYỂN & HỖ TRỢ
    </div>

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
            v-model="form.transfer.number"
            placeholder="Nhập "
          ></b-form-input>
          <b-form-group
            label="SỐ ĐIỀU CHUYỂN:"
            label-for="input-2"
            class="mt-1"
          >
            <b-form-select
              label="Nhập"
              v-model="form.transfer.group"
              :options="options"
            ></b-form-select>
          </b-form-group>
        </b-form-group>
        <b-form-group
          id="input-group-2"
          label="SỐ HỌC SINH:"
          label-for="input-2"
        >
          <b-form-input
            v-model="form.support.number"
            placeholder="Nhập "
          ></b-form-input>
        </b-form-group>
        <b-form-group label="SỐ ĐI HỖ TRỢ :" label-for="input-2" class="mt-1">
          <b-form-select
            label="Nhập:"
            v-model="form.support.group"
            :options="options"
          ></b-form-select>
        </b-form-group>
        <b-button type="submit" variant="primary" class="text-blue-700 mb-24"
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
                transfer: { number: "", group: "" },
                support: { number: "", group: "" },
            },
            options: [
                { value: null, text: "chọn lý do" },
                { value: "b", text: "Thai sản" },
                { value: "b", text: "Không lương" },
                { value: "b", text: "ốm" },
                { value: "b", text: "con ốm" },
                { value: "b", text: "việc riêng" },
                { value: "b", text: "học" },
                { value: "b", text: "nghỉ phép" },
                { value: "b", text: "việc khác" },
                { value: "b", text: "tự do" },
                { value: "b", text: "nghỉ t7+CN" },
                { value: "b", text: "nghỉ chấm dứt hợp đồng lao động" },
            ],
        };
    },
    methods: {
        onSubmit(event) {
            event.preventDefault();
            console.log(this.form);
            this.$router.push("/reportmeal");
        },
    },
};
</script>
<style scoped>
.title {
    color: #0daeff;
}
</style>
