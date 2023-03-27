<template lang="">
  <div class="container">
    <div class="text-center mt-10 mb-24 text-3xl font-bold title">
      Tạo Tài Khoản
    </div>

    <div class="max-w-2xl m-auto m-0">
      <BtnBack />
      <div>
        <CreateMoreAccounts />
      </div>
    </div>
  </div>
</template>
<script>
import CreateMoreAccounts from "@/components/CreateMoreAccounts.vue";
import BtnBack from "@/components/BtnBack.vue";

export default {
  components: { CreateMoreAccounts, BtnBack },
  data() {
    return {
      form: {
        userLogin: "",
        password: "",
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
    // async onSubmit(event) {
    //   event.preventDefault();
    //   const res = await addAccount(this.form);
    // },
  },
};
</script>
<style scoped>
.title {
  color: #0daeff;
}
</style>
