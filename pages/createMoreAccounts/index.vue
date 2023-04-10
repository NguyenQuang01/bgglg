<template lang="">
  <div class="container">
    <div
      class="text-center my-16 text-3xl font-bold title flex justify-center title"
    >
      Tạo tài khoản
    </div>

    <div class="max-w-sm m-auto m-0">
      <CreateMoreAccounts />
    </div>
    <div class="footer"></div>
  </div>
</template>
<script>
import CreateMoreAccounts from "@/components/CreateMoreAccounts.vue";
import BtnBack from "@/components/BtnBack.vue";

export default {
  middleware: "auth",
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
  color: #045396;
}
.footer {
  height: 1px;
  margin: 50px 0;
}
</style>
