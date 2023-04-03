<template lang="">
  <b-navbar toggleable="lg" type="dark" class="header">
    <div class="container">
      <b-navbar-brand href="#" class="whitespace-normal"
        >Hệ thống thống báo cáo lao động BGG Lạng Giang</b-navbar-brand
      >

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

  computed: {
    ...mapGetters({ getIsUser: "getIsUser", getUserName: "getUserName" }),
  },
  mounted() {
    this.SET_STATE_ISUSER(localStorage.getItem("isUser"));
    this.SET_STATE_USERNAME(localStorage.getItem("userLogin"));
  },
  methods: {
    ...mapMutations({
      SET_STATE_ISUSER: "SET_STATE_ISUSER",
      SET_STATE_USERNAME: "SET_STATE_USERNAME",
    }),

    logout() {
      this.SET_STATE_ISUSER(false);
      localStorage.removeItem("JWT");
      localStorage.removeItem("userLogin");
      localStorage.removeItem("isUser");
      this.$router.push("/");
      window.location.reload();
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
