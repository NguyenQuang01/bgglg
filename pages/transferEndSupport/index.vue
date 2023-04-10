<template lang="">
  <div class="container">
    <div class="text-center mt-10 mb-16 text-3xl font-bold title">
      BÁO CÁO SỐ ĐIỀU CHUYỂN & HỖ TRỢ
    </div>

    <div class="max-w-2xl m-auto m-0">
      <b-form @submit="onSubmit">
        <div class="flex justify-between items-center">
          <b-form-group
            id="input-group-2"
            label="SỐ điều chuyển:"
            label-for="input-2"
            class="mr-2"
          >
            <b-form-input
              v-model="form.transfer.number"
              placeholder="Nhập "
              required
              type="number"
              class="h-8 inputLogin"
            ></b-form-input>
          </b-form-group>
          <b-icon icon="arrow-right" aria-hidden="true" class="mr-2"></b-icon>
          <b-form-group
            id="input-group-3"
            label="Chọn bộ phận:"
            label-for="input-3"
            class="width48"
          >
            <a-cascader
              :options="parts"
              expand-trigger="hover"
              placeholder="chọn"
              required
              @change="onChange"
            />
          </b-form-group>
        </div>
        <div class="seperate"></div>
        <div class="flex justify-between items-center">
          <b-form-group
            id="input-group-2"
            label="SỐ đi hỗ trợ:"
            label-for="input-2"
            class="mr-2"
          >
            <b-form-input
              v-model="form.support.number"
              placeholder="Nhập "
              required
              type="number"
              class="h-8 inputLogin"
            ></b-form-input>
          </b-form-group>
          <b-icon icon="arrow-right" aria-hidden="true" class="mr-2"></b-icon>
          <b-form-group
            id="input-group-3"
            label="Chọn bộ phận:"
            label-for="input-3"
            class="width48"
          >
            <a-cascader
              :options="parts"
              expand-trigger="hover"
              placeholder="chọn"
              required
              @change="onChange2"
            />
          </b-form-group>
        </div>

        <div class="flex float-right">
          <BtnBack class="h-10" />
          <button-skip :skip="skip" />
          <b-button type="submit" variant="primary" class="btnLogin mb-24"
            >Xác nhận</b-button
          >
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
        transfer: { number: "", group: "", transferId: "", groupParent: "" },
        support: { number: "", group: "", transferId: "", groupParent: "" },
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
    onChange(value) {
      const lastElement = value[value.length - 1];
      const lastElement2 = value[value.length - 2];
      this.form.transfer.group = lastElement;
      this.form.transfer.groupParent = lastElement2;
    },
    onChange2(value) {
      const lastElement = value[value.length - 1];
      const lastElement2 = value[value.length - 2];
      this.form.support.group = lastElement;
      this.form.support.groupParent = lastElement2;
    },
    async groupRoleRoot() {
      const res = await groupRoleRoot();
      if (res && res.code === 201) {
        this.parts = res.data;
      }
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
        groupName: this.form.transfer.group,
        transferId: this.form.transfer.transferId,
        groupParent: this.form.transfer.groupParent,
      });
      this.SET_STATE_SUPPORT({
        transferNum: Number(this.form.support.number),
        groupName: this.form.support.group,
        transferId: this.form.support.transferId,
        groupParent: this.form.support.groupParent,
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
        this.form.transfer.group = res.transfers[0].groupName;
        this.form.transfer.transferId = res.transfers[0].transferId;
        this.form.support.number = res.transfers[1].transferNum;
        this.form.support.group = res.transfers[1].groupName;
        this.form.support.transferId = res.transfers[1].transferId;
      }
    },
  },
};
</script>
<style scoped>
.title {
  color: #045396;
}
.width48 {
  width: 48%;
}
.btnLogin {
  background-color: #045396;
  color: #ffff;
  margin-bottom: 20px;
  border-radius: 50px !important;
}
.inputLogin {
  border-radius: 50px;
}
.seperate {
  border: #e9e9e9 solid 1px;
  height: 1px;
  margin: 40px 0;
}
</style>
