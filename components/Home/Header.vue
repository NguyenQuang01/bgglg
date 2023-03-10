<template lang="">
  <b-navbar toggleable="lg" type="dark" class="header">
    <div class="container">
      <b-navbar-brand href="#">HỆ THỐNG BÁO CÁO LAO ĐỘNG</b-navbar-brand>

      <div class="textName text-base flex" v-if="this.getIsUser">
        Tài khoản : <span class="ml-1">{{ getUserName }} </span>
        <div
          class="bg-neutral-200 rounded-lg px-1 ml-2 text-slate-700 text-xs flex items-center cursor-pointer"
          @click="logout"
        >
          Đăng xuất
        </div>
      </div>
    </div>
  </b-navbar>
</template>
<script>
import { mapGetters, mapMutations } from "vuex";
export default {
  data() {
    return {};
  },
  // created() {
  //   this.isUsers = this.getIsUser;
  //   console.log(this.getIsUser, 5454545);
  // },
  computed: {
    ...mapGetters({ getIsUser: "getIsUser", getUserName: "getUserName" }),
  },
  methods: {
    ...mapMutations({
      SET_STATE_ISUSER: "SET_STATE_ISUSER",
    }),

    logout() {
      this.SET_STATE_ISUSER(false);
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
