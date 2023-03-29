<template lang="">
  <div class="container">
    <div class="text-center mt-10 mb-16 text-3xl font-bold title">
      BÁO CÁO SỐ ĐIỀU CHUYỂN & HỖ TRỢ
    </div>

    <div class="max-w-2xl m-auto m-0">
      <BtnBack />

      <b-form @submit="onSubmit">
        <b-form-group
          id="input-group-2"
          label="SỐ điều chuyển:"
          label-for="input-2"
        >
          <b-form-input
            v-model="form.transfer.number"
            placeholder="Nhập "
            required
            type="number"
          ></b-form-input>
          <div class="flex justify-between">
            <b-form-group
              id="input-group-3"
              label="Chọn bộ phận:"
              label-for="input-3"
              class="width48"
            >
              <b-form-select
                id="input-3"
                v-model="form.parentId"
                :options="parts"
                placeholder="nhập "
                required
              ></b-form-select>
            </b-form-group>
            <b-form-group
              id="input-group-3"
              label="Chọn tổ:"
              label-for="input-3"
              class="width48"
            >
              <b-form-select
                id="input-3"
                v-model="form.transfer.group"
                :options="parts2"
                placeholder="nhập "
                required
              ></b-form-select>
            </b-form-group>
          </div>
        </b-form-group>
        <b-form-group
          id="input-group-2"
          label="SỐ đi hỗ trợ:"
          label-for="input-2"
        >
          <b-form-input
            v-model="form.support.number"
            placeholder="Nhập "
            required
            type="number"
          ></b-form-input>
        </b-form-group>
        <div class="flex justify-between">
          <b-form-group
            id="input-group-3"
            label="Chọn bộ phận:"
            label-for="input-3"
            class="width48"
          >
            <b-form-select
              id="input-3"
              v-model="form.parentIdSupport"
              :options="parts"
              placeholder="nhập "
              required
            ></b-form-select>
          </b-form-group>
          <b-form-group
            id="input-group-3"
            label="Chọn tổ:"
            label-for="input-3"
            class="width48"
          >
            <b-form-select
              id="input-3"
              v-model="form.support.group"
              :options="parts3"
              placeholder="nhập "
              required
            ></b-form-select>
          </b-form-group>
        </div>

        <div class="flex">
          <b-button type="submit" variant="primary" class="text-blue-700 mb-24"
            >Xác nhận</b-button
          >
          <button-skip :skip="skip" />
        </div>
      </b-form>
    </div>
  </div>
</template>
<script>
import { mapMutations } from "vuex";
import ButtonSkip from "@/components/buttonSkip";
import BtnBack from "@/components/BtnBack.vue";
import { getDetail } from "@/api/AuthenConnector.js";
import { today } from "@/constants/getToday";
import { groupRoleRoot, groupRoleDetails } from "@/api/AuthenConnector.js";
export default {
  middleware: "auth",
  components: { ButtonSkip, BtnBack },
  data() {
    return {
      parts: [],
      parts2: [],
      parts3: [],
      visible: false,
      skip: "/move-inPerson",
      form: {
        parentId: "",
        parentIdSupport: "",
        transfer: { number: "", group: "", transferId: "" },
        support: { number: "", group: "", transferId: "" },
      },
    };
  },
  fetch() {
    const isReport = localStorage.getItem("checkReport");
    if (isReport === "true") {
      this.getValue();
    }
    this.groupRoleRoot();
  },
  watch: {
    "form.parentId": {
      handler: function (value) {
        this.groupRoleDetails(value);
      },
      deep: true,
    },
    "form.parentIdSupport": {
      handler: function (value) {
        this.groupRoleDetails2(value);
      },
      deep: true,
    },
  },
  methods: {
    ...mapMutations({
      SET_STATE_TRANSFER: "SET_STATE_TRANSFER",
      SET_STATE_SUPPORT: "SET_STATE_SUPPORT",
    }),
    async groupRoleRoot() {
      const res = await groupRoleRoot();
      this.parts = res.map((item) => ({
        text: item.groupName,
        value: item.id,
      }));
    },
    async groupRoleDetails(param) {
      const res = await groupRoleDetails(param);
      this.parts2 = res.map((item) => ({
        text: item.groupName,
        value: item.id,
      }));
    },
    async groupRoleDetails2(param) {
      const res = await groupRoleDetails(param);
      this.parts3 = res.map((item) => ({
        text: item.groupName,
        value: item.id,
      }));
    },

    onSubmit(event) {
      event.preventDefault();
      this.SET_STATE_TRANSFER({
        transferNum: Number(this.form.transfer.number),
        groupId: Number(this.form.transfer.group),
        transferId: Number(this.form.transfer.transferId),
      });
      this.SET_STATE_SUPPORT({
        transferNum: Number(this.form.support.number),
        groupId: Number(this.form.support.group),
        transferId: Number(this.form.support.transferId),
      });
      this.$router.push("/move-inPerson");
    },
    async getValue() {
      const day = today();
      const groupId = localStorage.getItem("groupId");
      const res = await getDetail({ day, groupId });
      if (res) {
        this.form.parentId = res.transfers[0].parentId;
        this.form.parentIdSupport = res.transfers[1].parentId;
        this.form.transfer.number = res.transfers[0].transferNum;
        this.form.transfer.group = res.transfers[0].groupId;
        this.form.transfer.transferId = res.transfers[0].transferId;
        this.form.support.number = res.transfers[1].transferNum;
        this.form.support.group = res.transfers[1].groupId;
        this.form.support.transferId = res.transfers[1].transferId;
      }
    },
  },
};
</script>
<style scoped>
.title {
  color: #0daeff;
}
.width48 {
  width: 48%;
}
</style>
