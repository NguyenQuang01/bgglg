<template>
  <div>
    <b-form @submit="onSubmit">
      <div v-for="(item, index) in arrForms" :key="index">
        <div class="font-extrabold text-lg">
          người thứ : {{ index + 1 }}
          <b-button class="delete" @click="deletes(index, item)">x</b-button>
        </div>

        <b-form-group label="Nhập tên :" label-for="input-2">
          <a-cascader
            :options="optionsName"
            :show-search="{ filter }"
            placeholder="Nhập tên"
            class="inputLogin"
            @change="onChange"
          />
        </b-form-group>
        <!-- <b-form-group label="Nhập mã số lao động :" label-for="input-2">
          <b-form-input
            v-model="item.id"
            placeholder="mã số lao động"
            required
            class="inputLogin"
          ></b-form-input>
        </b-form-group> -->
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
        <b-button
          variant="primary"
          class="mb-24 ml-2 textBack"
          @click="addQuantity"
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
import { reason, deleteLisRes, getAllEmployee } from "@/api/AuthenConnector.js";
import { getDetail } from "@/api/AuthenConnector.js";
import { today } from "@/constants/getToday";
import { message } from "ant-design-vue";

export default {
  components: { ButtonSkip },
  data() {
    return {
      skip: "/newPartTimeEndWorker",
      amount: 1,
      form: {
        user: "",
        id: "",
        reason: "",
        restId: "",
      },
      arrForms: [],
      valueTextarea: "",
      selected: null,
      options: [],
      options2: [],
      valueSubmit: {},
      id: "",
      optionsName: [],
      page: {
        current: 1,
        pageSize: 500,
      },
    };
  },
  fetch() {
    const isReport = localStorage.getItem("checkReport");
    if (isReport === "true") {
      this.getValue();
    }
    this.arrForms.push(this.form);
    this.getReason();
    this.getvalueName();
  },
  computed: {
    ...mapGetters({ getDataInformationReport: "getDataInformationReport" }),
  },
  methods: {
    ...mapMutations({ SET_STATE_ARRLABOR: "SET_STATE_ARRLABOR" }),
    async getvalueName() {
      const payload = { groupId: 125 };
      const res = await getAllEmployee(
        this.page.current,
        this.page.pageSize,
        payload
      );
      console.log(res, 999);
      if (res && res.code === 201) {
        this.optionsName = res.data.content.map((item) => ({
          label: ` ${item.employeeName} - ${item.laborCode}`,
          value: item.employeeName,
        }));
        console.log(this.optionsName, 6666);
        //   data.value = res.data.map((item, index) => ({
        //     SL: index + 1,
        //     name: item.employeeName,
        //     laborCode: item.laborCode,
        //     id: item.employeeId,
        //   }));
      }
    },
    onChange(value) {
      console.log(value, this.arrForms, 777777777777);
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
        restName: item.user,
        reasonId: item.reason,
        restId: item.restId,
        reasonName: item.reasonName,
      }));

      this.SET_STATE_ARRLABOR(arrLabor);
      this.$router.push("/newPartTimeEndWorker");

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
          reasonName: "",
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
