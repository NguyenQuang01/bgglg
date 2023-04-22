<template lang="">
  <div class="container">
    <div class="text-center mt-10 mb-16 text-3xl font-bold title">
      BÁO CÁO SỐ LAO ĐỘNG GIẢM
    </div>

    <div class="max-w-sm m-auto m-0">
      <b-form @submit="onSubmit" class="mb-10">
        <b-form-group label="Nhập tên :" label-for="input-2">
          <a-select
            show-search
            required
            placeholder="Inserted are removed"
            style="width: 100%; border-radius: 50px"
            v-model="deleteLabor"
            class="inputLogin"
          >
            <a-select-option
              v-for="item in filteredOptions"
              :key="item"
              :value="item"
            >
              {{ item }}
            </a-select-option>
          </a-select>
        </b-form-group>
        <div class="flex float-right">
          <BtnBack class="h-10" />
          <button-skip :skip="skip" />
          <b-button type="submit" variant="primary" class="btnLogin h-10"
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
import { getDetail, getAllEmployee } from "@/api/AuthenConnector.js";
import { today } from "@/constants/getToday";
import { message } from "ant-design-vue";
export default {
  middleware: "auth",
  components: { ButtonSkip, BtnBack },
  data() {
    return {
      skip: "/newPartTimeEndWorker",
      deleteLabor: "",
      OPTIONS: [],
      selectedItems: "",
      page: {
        current: 1,
        pageSize: 500,
      },
    };
  },
  fetch() {
    const isReport = localStorage.getItem("checkReport");
    this.getvalueName();
    if (isReport === "true") {
      this.getValue();
    }
  },
  computed: {
    filteredOptions() {
      return this.OPTIONS.filter((o) => !this.selectedItems.includes(o));
    },
  },
  methods: {
    ...mapMutations({
      SET_STATE_NumberDeleteLabor: "SET_STATE_NumberDeleteLabor",
      SET_STATE_codeDeleteLabor: "SET_STATE_codeDeleteLabor",
    }),
    async getvalueName() {
      const payload = { groupId: localStorage.getItem("groupId") };
      const res = await getAllEmployee(
        this.page.current,
        this.page.pageSize,
        payload
      );
      if (res && res.code === 201) {
        this.OPTIONS = res.data.content.map(
          (item) => ` ${item.employeeName} - ${item.laborCode}`
          // value: item.employeeName,
        );
      }
    },
    onSubmit(event) {
      event.preventDefault();

      if (this.deleteLabor) {
        this.SET_STATE_NumberDeleteLabor(1);
        this.SET_STATE_codeDeleteLabor(this.deleteLabor.split("-")[1]);
        this.$router.push("/newPartTimeEndWorker");
      } else {
        message.warning("vui lòng chọn tên người nghỉ");
      }
    },
    async getValue() {
      const day = today();
      const groupId = localStorage.getItem("groupId");
      const res = await getDetail({ day, groupId });
      if (res) {
        this.form.partTime = Number(res.partTimeNum);
        this.form.worker = Number(res.studentNum);
      }
    },
  },
};
</script>
<style scoped>
.title {
  color: #045396;
}
.btnLogin {
  background-color: #045396;
  color: #ffff;
  margin-bottom: 20px;
  border-radius: 50px;
}
.inputLogin {
  border-radius: 50px;
}
</style>
