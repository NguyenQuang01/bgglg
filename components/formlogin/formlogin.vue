<template>
  <div class="">
    <b-form @submit="onSubmit" @reset="onReset">
      <b-form-group id="input-group-2" label="Tài khoản:" label-for="input-2">
        <b-form-input
          id="input-2"
          v-model="form.user"
          placeholder="Nhập tài khoản"
          class="inputLogin max-w-sm"
          required
        ></b-form-input>
      </b-form-group>
      <b-form-group id="input-group-1" label="Mật khẩu:" label-for="input-1">
        <b-form-input
          id="input-1"
          v-model="form.pass"
          type="password"
          class="inputLogin max-w-sm"
          placeholder="Nhập mật khẩu"
          required
        ></b-form-input>
      </b-form-group>
      <b-form-group id="input-group-4" v-slot="{ ariaDescribedby }">
        <b-form-checkbox-group
          v-model="form.checked"
          id="checkboxes-4"
          :aria-describedby="ariaDescribedby"
        >
          <b-form-checkbox value="me">Nhớ mật khẩu</b-form-checkbox>
        </b-form-checkbox-group>
      </b-form-group>

      <b-button type="submit" variant="primary" class="rounded-full btnLogin"
        >Đăng nhập</b-button
      >
      <div class="py-10"></div>
    </b-form>
  </div>
</template>

<script>
import { mapMutations, mapGetters } from "vuex";
import { signInAPI, getReportByYesterday } from "@/api/AuthenConnector.js";
import { message } from "ant-design-vue";
import { HOST } from "@/constants/host/host.js";
export default {
  data() {
    return {
      form: {
        user: "",
        pass: "",
      },
      show: false,
    };
  },

  methods: {
    ...mapMutations({
      SET_STATE_ISUSER: "SET_STATE_ISUSER",
      SET_STATE_USERNAME: "SET_STATE_USERNAME",
      SET_STATE_ISAUTHEN: "SET_STATE_ISAUTHEN",
      SET_STATE_INFUSER: "SET_STATE_INFUSER",
    }),
    async onSubmit(event) {
      event.preventDefault();
      const res = await signInAPI(this.form);
      if (res.status === 500) {
        this.form.pass = "";
        this.form.user = "";
        message.error("sai tài khoản hoặc mật khẩu");
      }
      if (res && res.status === 200) {
        this.SET_STATE_INFUSER(res.data);
        this.SET_STATE_ISUSER(true);
        this.SET_STATE_USERNAME(this.form.user);
        localStorage.setItem("isUser", true);
        localStorage.setItem("userLogin", this.form.user);
        localStorage.setItem("groupId", res.data.groupId);
        localStorage.setItem("JWT", res.data.token);
        localStorage.setItem("checkReport", res.data.checkReport);
        localStorage.setItem("groupName", res.data.groupName);
        // localStorage.setItem("formName", this.form.user);
        // localStorage.setItem("formPass", this.form.pass);
        localStorage.setItem("INFUSER", JSON.stringify(res.data));
        this.SET_STATE_ISAUTHEN(true);
        const response = await getReportByYesterday(res.data.groupId);
        if (response) {
          localStorage.setItem("report", JSON.stringify(response));
        }
        this.$router.push("/menuLogin");
      }
    },
    onReset(event) {
      event.preventDefault();
      this.form.pass = "";
      this.form.user = "";
    },
  },
};
</script>
<style scoped>
.inputLogin {
  border-radius: 50px;
}
.btnLogin {
  background-color: #045396;
  color: #ffff;
  margin-bottom: 20px;
}
@media only screen and (max-width: 640px) {
  .btnLogin {
    width: 100%;
  }
}
</style>
