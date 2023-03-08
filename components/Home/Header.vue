<template lang="">
  <b-navbar toggleable="lg" type="dark" class="header">
    <div class="container">
      <b-navbar-brand href="#">HỆ THỐNG BÁO CÁO LAO ĐỘNG</b-navbar-brand>

      <div class="textName text-base flex">
        user : <span class="ml-1"> TrungQuang</span>
        <div
          class="bg-neutral-200 rounded-lg px-1 ml-2 text-slate-700 text-xs flex items-center cursor-pointer"
          @click="logout"
        >
          logout
        </div>
      </div>
    </div>
  </b-navbar>
</template>
<script>
export default {
  data() {
    return {};
  },
  methods: {
    logout() {
      this.$router.push("/");
    },
  },
};
</script>
<style scoped>
.header {
  background-color: #0daeff;
}
.logout {
  padding: 2px 5px;
  background: whitesmoke;
  /* display: none; */
}
.textName {
  color: #ffff;
}
</style>
