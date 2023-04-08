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
export default {
  middleware: "auth",
  components: { Avatar },
  data() {
    return {
      text1: `Báo cáo`,
      text2: `Sửa báo cáo`,
      text3: `Xem lại báo cáo`,
      text4: `Quản lý`,
      text5: "Quản trị hệ thống",
      activeKey: 1,
    };
  },
  fetch() {
    this.test();
  },
  computed: {
    ...mapGetters({ getInfUsers: "getInfUsers" }),
  },
  methods: {
    ...mapMutations({
      SET_STATE_INFUSER: "SET_STATE_INFUSER",
    }),
    test() {
      console.log(typeof window);
      if (typeof window !== "undefined") {
        const inf = JSON.parse(localStorage.getItem("INFUSER"));
        this.SET_STATE_INFUSER(inf);
      }
    },
    report() {
      if (this.getInfUsers.checkReport) {
        this.$router.push("/reported");
      } else {
        this.$router.push("/laborreport");
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
<style>
.menuBtn {
  background-color: #045396;
  color: #ffff;
}
</style>
