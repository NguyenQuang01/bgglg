<template>
  <div class="">
    <b-form @submit="onSubmit" @reset="onReset">
      <b-form-group id="input-group-2" label="Tài khoản:" label-for="input-2">
        <b-form-input
          id="input-2"
          v-model="form.user"
          placeholder="Nhập tài khoản"
          required
        ></b-form-input>
      </b-form-group>
      <b-form-group id="input-group-1" label="Mật khẩu:" label-for="input-1">
        <b-form-input
          id="input-1"
          v-model="form.pass"
          type="password"
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

      <b-button type="submit" variant="primary" class="text-blue-700"
        >Đăng nhập</b-button
      >
      <b-button type="reset" variant="danger" class="text-rose-700"
        >Reset</b-button
      >
    </b-form>
  </div>
</template>

<script>
import { mapMutations, mapGetters } from "vuex";
import { signInAPI } from "@/api/AuthenConnector.js";
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
    }),
    async onSubmit(event) {
      event.preventDefault();
      const res = await signInAPI(this.form);
      // if (res && res.status === 502) {
      //   message.error("sai tài khoản, mật khẩu");
      // }

      if (res && res.status === 200) {
        this.SET_STATE_ISUSER(true);
        this.SET_STATE_USERNAME(this.form.user);
        localStorage.setItem("isUser", true);
        localStorage.setItem("userLogin", this.form.user);
        localStorage.setItem("groupId", res.data.groupId);
        localStorage.setItem("JWT", res.data.token);
        switch (true) {
          case res.data.isEdit:
            this.$router.push("/sussInformation");
            break;
          case res.data.isReport:
            this.$router.push("/laborreport");
            break;
          case res.data.isAdmin:
            this.$router.push("/createMoreAccounts");

            break;
          case res.data.isView:
            this.$router.push("/leaderMenu");
            break;
          default:
        }

        //   res.data.isEdit === true ? : "";
        //   res.data.isAdmin === true
        //     ?
        //     : "";
        //   res.data.isReport === true ?  : "";
        //   res.data.isView === true ? : "";
        // } else {
        //   message.error("sai tài khoản, mật khẩu");
        // }
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
