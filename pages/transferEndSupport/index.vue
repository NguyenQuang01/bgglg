<template lang="">
  <div class="container">
    <div class="text-center mt-10 mb-16 text-3xl font-bold title">
      BÁO CÁO SỐ ĐIỀU CHUYỂN & HỖ TRỢ
    </div>

    <div class="max-w-2xl m-auto m-0">
      <b-button @click="$router.back()" class="text-blue-500 border-none p-0"
        ><b-icon icon="arrow-bar-left" aria-hidden="true"></b-icon>trở lại
        ></b-button
      >

      <b-form @submit="onSubmit">
        <b-form-group
          id="input-group-2"
          label="SỐ điều chuyển:"
          label-for="input-2"
        >
          <b-form-input
            v-model="form.transfer.number"
            placeholder="Nhập "
            required
            type="number"
          ></b-form-input>
          <b-form-group
            id="input-group-2"
            label="Chọn tổ điều chuyển đến:"
            label-for="input-2"
          >
            <b-form-input
              v-model="form.transfer.group"
              placeholder="Nhập "
              required
            ></b-form-input>
          </b-form-group>
        </b-form-group>
        <b-form-group
          id="input-group-2"
          label="SỐ đi hỗ trợ:"
          label-for="input-2"
        >
          <b-form-input
            v-model="form.support.number"
            placeholder="Nhập "
            required
            type="number"
          ></b-form-input>
        </b-form-group>
        <b-form-group
          id="input-group-2"
          label="Chọn tổ điều chuyển đến:"
          label-for="input-2"
        >
          <b-form-input
            v-model="form.support.group"
            placeholder="Nhập "
            required
          ></b-form-input>
        </b-form-group>
        <div class="flex">
          <b-button type="submit" variant="primary" class="text-blue-700 mb-24"
            >Xác nhận</b-button
          >
          <button-skip :skip="skip" />
          <b-button
            variant="primary"
            class="text-blue-700 mb-24 mx-2"
            @click="showModal"
            >Người chuyển đến</b-button
          >
        </div>
      </b-form>
    </div>
    <a-modal
      v-model:visible="visible"
      title="Thông báo"
      @ok="handleOk"
      cancelText="Hủy"
      okText="Xác nhận"
    >
      <table>
        <tr>
          <th>Bạn được hỗ trợ:</th>
          <th>Từ đơn vị:</th>
        </tr>
        <tr>
          <td>Peter</td>
          <td>Griffin</td>
        </tr>
        <tr>
          <td>Lois</td>
          <td>Griffin</td>
        </tr>
      </table>
    </a-modal>
  </div>
</template>
<script>
import { mapMutations } from "vuex";
import ButtonSkip from "@/components/buttonSkip";

export default {
  components: { ButtonSkip },
  data() {
    return {
      visible: false,
      skip: "/reportmeal",
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
    ...mapMutations({
      SET_STATE_TRANSFER: "SET_STATE_TRANSFER",
      SET_STATE_SUPPORT: "SET_STATE_SUPPORT",
    }),
    showModal() {
      this.visible = true;
    },
    handleOk() {
      this.visible = false;
    },
    onSubmit(event) {
      event.preventDefault();
      this.SET_STATE_TRANSFER(this.form.transfer.number);
      this.SET_STATE_SUPPORT(this.form.support.number);
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
