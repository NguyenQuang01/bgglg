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
    <!-- <b-card class="mt-3" header="Form Data Result">
      <pre class="m-0">{{ form }}</pre>
    </b-card> -->
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
      show: true,
    };
  },
  // created: {
  //   ...mapGetters({

  //   })
  // },
  methods: {
    ...mapMutations({
      SET_STATE_ISUSER: "SET_STATE_ISUSER",
      SET_STATE_USERNAME: "SET_STATE_USERNAME",
    }),
    async onSubmit(event) {
      event.preventDefault();
      const res = await signInAPI(this.form);
      console.log(res);
      if (res && res.status === 200) {
        this.SET_STATE_ISUSER(true);
        this.SET_STATE_USERNAME(this.form.user);
        localStorage.setItem("isUser", true);
        localStorage.setItem("userLogin", this.form.user);

        localStorage.setItem("JWT", res.data.token);
        // localStorage.setItem("userLogin", res.data.userLogin);
        this.form.user === "admin"
          ? this.$router.push("/laborreport")
          : this.$router.push("/laborreport");
      } else {
        message.error("sai tài khoản, mật khẩu");
      }
      // this.SET_STATE_ISUSER(true);
      // this.SET_STATE_USERNAME(this.form.user);

      // this.show
      //   ? this.$router.push("/laborreport")
      //   : this.$router.push("/leaderMenu");

      // this.$router.push("/");
    },
    onReset(event) {
      event.preventDefault();
      // Reset our form values
      this.form.pass = "";
      this.form.user = "";
    },
  },
};
</script>
