<template lang="">
  <div class="container h-96">
    <Avatar />
    <div class="max-w-2xl m-auto m-0">
      <a-collapse v-model:activeKey="activeKey">
        <a-collapse-panel key="1" header="Menu" :disabled="false" class="">
          <a-button
            v-if="getInfUsers.isReport"
            @click="report"
            class="menuBtn"
            >{{ text1 }}</a-button
          ><br v-if="getInfUsers.isReport" />
          <a-button
            v-if="getInfUsers.isEdit"
            @click="editReport"
            class="my-3 menuBtn"
            >{{ text2 }}</a-button
          ><br v-if="getInfUsers.isEdit" />
          <a-button
            v-if="getInfUsers.isView"
            @click="viewReport"
            class="mb-3 menuBtn"
            >{{ text3 }}</a-button
          ><br v-if="getInfUsers.isView" />
          <a-button
            v-if="getInfUsers.isView"
            @click="manage"
            class="mb-3 menuBtn"
            >{{ text4 }}</a-button
          ><br v-if="getInfUsers.isView" />
          <a-button
            v-if="getInfUsers.isAdmin"
            type="primary"
            class="menuBtn"
            @click="admin"
            >{{ text5 }}</a-button
          >
        </a-collapse-panel>
      </a-collapse>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapMutations } from "vuex";
import Avatar from "@/components/Avatar";
import { refreshToken } from "@/api/AuthenConnector.js";

export default {
  // middleware: "auth",
  components: { Avatar },
  data() {
    return {
      text1: `Báo cáo`,
      text2: `Sửa báo cáo`,
      text3: `Xem lại báo cáo`,
      text4: `Quản lý`,
      text5: "Quản trị hệ thống",
      activeKey: 1,
      token: "",
    };
  },
  mounted() {
    if (!localStorage.getItem("isUser")) {
      return this.$router.push("/login");
    }
    this.token = localStorage.getItem("JWT");
    setTimeout(() => this.test(), 100);
  },
  // fetch() {
  //   this.token = localStorage.getItem("JWT");
  // },
  computed: {
    ...mapGetters({ getInfUsers: "getInfUsers" }),
  },
  methods: {
    ...mapMutations({
      SET_STATE_INFUSER: "SET_STATE_INFUSER",
      SET_STATE_ISAUTHEN: "SET_STATE_ISAUTHEN",
    }),
    async test() {
      const res = await refreshToken(this.token);
      if (res && res.status === 200) {
        this.SET_STATE_INFUSER(res.data);
        this.SET_STATE_ISAUTHEN(true);
        localStorage.setItem("checkReport", res.data.checkReport);
      }
    },
    report() {
      if (this.getInfUsers.checkReport) {
        this.$router.push("/reported");
      } else {
        this.$router.push("/reasonAbsent");
      }
    },
    editReport() {
      this.$router.push("/sussInformation");
    },
    viewReport() {
      this.$router.push("/sussInformation");
    },
    manage() {
      this.$router.push("/leaderMenu");
    },
    admin() {
      this.$router.push("/listMenuAdmin");
    },
  },
  // created() {
  //   setInterval(() => {
  //     this.currentTime = new Date().toLocaleString();
  //   }, 1000);
  // },
};
</script>
<style scoped>
.menuBtn {
  background-color: #045396;
  color: #ffff;
}
</style>
