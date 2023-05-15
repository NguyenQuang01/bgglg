<template>
  <div>
    <b-form @submit="onSubmit">
      <div v-for="(item, index) in arrForms" :key="index">
        <div class="font-extrabold text-lg">
          người thứ : {{ index + 1 }}
          <b-button class="delete" @click="deletes(index, item)">x</b-button>
        </div>

        <b-form-group label="Nhập tên :" label-for="input-2">
          <a-select
            show-search
            placeholder="Inserted are removed"
            style="width: 100%; border-radius: 50px"
            v-model="item.user"
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

        <b-form-group label="Chọn thời gian nghỉ :" label-for="input-2">
          <b-form-select
            label="Nhập mã số ly do :"
            v-model="item.session"
            :options="options2"
            required
            class="inputLogin"
          ></b-form-select>
        </b-form-group>

        <b-form-group label="Chọn lý do :" label-for="input-2">
          <b-form-select
            label="Nhập mã số ly do :"
            v-model="item.reason"
            :options="options"
            required
            class="inputLogin"
          ></b-form-select>
        </b-form-group>
      </div>
      <div class="flex mb-24 float-right">
        <BtnBack class="h-10" />
        <b-button variant="primary" class="mb-24 textBack" @click="addQuantity"
          >Thêm</b-button
        >
        <button-skip :skip="skip" />
        <b-button type="submit" variant="primary" class="btnLogin h-10 mb-24"
          >xác nhận</b-button
        >
      </div>
    </b-form>
  </div>
</template>
<script>
import { mapMutations, mapGetters } from "vuex";
import ButtonSkip from "../buttonSkip";
import {
  reason,
  deleteLisRes,
  getAllEmployee,
  refreshToken,
} from "@/api/AuthenConnector.js";
import { getDetail } from "@/api/AuthenConnector.js";
import { today } from "@/constants/getToday";
import { message } from "ant-design-vue";
export default {
  components: { ButtonSkip },
  data() {
    return {
      OPTIONS: [],
      selectedItems: "",
      skip: "/report/laborIncrease",
      amount: 1,
      form: {
        user: "",
        id: "",
        reason: "",
        restId: 0,
        session: "",
        workTime: 0,
      },
      token: "",
      arrForms: [],
      valueTextarea: "",
      selected: null,
      options: [],
      options2: ["Sáng", "Chiều", "Một ngày"],
      valueSubmit: {},
      id: "",
      optionsName: [],
      page: {
        current: 1,
        pageSize: 500,
      },
      check: true,
    };
  },
  fetch() {
    this.token = localStorage.getItem("JWT");
    this.test(this.token);

    // if (res && res.status === 200) {
    //   if (res.data.checkReport === true) {
    //     localStorage.setItem("JWT", true);
    //     this.check = false;
    //     this.getValue();
    //   }
    // }
    this.arrForms.push(this.form);
    this.getReason();
    this.getvalueName();
  },
  mounted() {
    const autofill = JSON.parse(localStorage.getItem("report"));
    const checkReport = localStorage.getItem("checkReport");
    if (autofill && checkReport === "false") {
      this.arrForms = autofill.rests.map((item) => ({
        user: item.restName,
        // id: item.restId,
        reason: item.reasonId,
        // restId: item.restId,
        reasonName: item.reasonName,
        session: item.session,
      }));
    }
  },
  computed: {
    ...mapGetters({ getDataInformationReport: "getDataInformationReport" }),
    filteredOptions() {
      return this.OPTIONS.filter((o) => !this.selectedItems.includes(o));
    },
  },
  methods: {
    ...mapMutations({
      SET_STATE_ARRLABOR: "SET_STATE_ARRLABOR",
      SET_STATE_LABOR: "SET_STATE_LABOR",
    }),

    async test(token) {
      const res = await refreshToken(token);
      if (res && res.status === 200) {
        if (res.data.checkReport === true) {
          localStorage.setItem("checkReport", true);
          this.check = false;
          this.getValue();
        }
      }
    },
    hasDuplicates(arr) {
      const seen = new Set();

      for (let i = 0; i < arr.length; i++) {
        const element = arr[i];
        if (seen.has(element)) {
          return true;
        }
        seen.add(element);
      }

      return false;
    },
    handleChange(selectedItems) {
      this.selectedItems = selectedItems;
    },
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

    filter(inputValue, path) {
      return path.some(
        (option) =>
          option.label.toLowerCase().indexOf(inputValue.toLowerCase()) > -1
      );
    },
    onSubmit(event) {
      event.preventDefault();
      const arrLabor = this.arrForms.map((item) => ({
        restNameAndLabor: item.user,
        reasonId: item.reason,
        restId: item.restId,
        reasonName: item.reasonName,
        session: item.session,
        workTime: item.session === "Sáng" || item.session === "Chiều" ? 0.5 : 1,
      }));
      const totalLabor = arrLabor
        .map((item) => item.workTime)
        .reduce((accumulator, currentValue) => accumulator + currentValue, 0);
      this.SET_STATE_ARRLABOR(arrLabor);
      this.SET_STATE_LABOR(totalLabor);
      const isPage = this.arrForms.map((item) => item.user);
      const isArrName = this.arrForms.map((item) =>
        item.user.replace(/\s/g, "")
      );
      const isBelowThreshold = (currentValue) => currentValue !== "";

      const isNameAlike = this.hasDuplicates(isArrName);
      if (isPage.every(isBelowThreshold)) {
        isNameAlike
          ? message.warning("Người nghỉ trùng nhau")
          : this.$router.push("/report/laborIncrease");
      } else {
        message.warning("Chưa điền tên nguời nghỉ");
      }

      // this.$router.push("/");
    },
    async getReason() {
      const res = await reason();
      if (res) {
        this.options = res.data.map((item) => ({
          value: item.id,
          text: item.name,
        }));
      }
    },
    async deletes(id, item) {
      const numberRest = this.getDataInformationReport;
      // if ((numberRest.restNum = this.arrForms.length)) {
      const payload = {
        reportId: this.id,
        restIds: [item.restId],
      };
      const res = await deleteLisRes(payload);
      this.arrForms.splice(id, 1);
      // } else {
      //   alert("danh sách nhỏ hơn số nhập");
      // }
    },
    addQuantity() {
      this.amoun = this.amoun + 1;
      for (let i = 0; i < this.amount; i++) {
        this.arrForms.push({
          user: "",
          id: "",
          reason: "",
          restId: 0,
          session: "",
          workTime: 0,
        });
      }
    },
    async getValue() {
      const day = today();
      const groupId = localStorage.getItem("groupId");
      const res = await getDetail({ day, groupId });
      if (res) {
        if (res.rests.length > 0) {
          this.arrForms = res.rests.map((item) => ({
            user: item.restName,
            id: item.restId,
            reason: item.reasonId,
            restId: item.restId,
            reasonName: item.reasonName,
            session: item.session,
          }));
          this.id = res.id;
        }
      }
    },
  },
};
</script>
<style scoped>
.delete {
  background-color: rgba(136, 136, 136, 0.8);
  padding: 2px 10px;
  border: none;
  border-radius: 50%;
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

.textBack {
  color: #045396;
  border-color: #045396;
  border-radius: 50px;
}
.btn:hover {
  color: #ffff;
}
</style>
<style>
.ant-select-selection--single {
  border-radius: 50px;
  height: 38px;
}
</style>
