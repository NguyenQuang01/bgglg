<template lang="">
  <div class="container">
    <div class="text-center mt-10 mb-16 text-3xl font-bold title">
      BÁO CÁO SỐ ĐIỀU CHUYỂN
    </div>

    <div class="max-w-2xl m-auto m-0">
      <b-form @submit="onSubmit">
        <div v-for="(item, index) in arrForms" :key="index">
          <div class="flex justify-between items-center">
            <b-form-group
              id="input-group-2"
              label="Chọn người điều chuyển:"
              label-for="input-2"
              class="mr-2 w-4/12"
            >
              <a-select
                mode="tags"
                style="width: 100%"
                :token-separators="[',']"
                v-model="item.employees"
              >
                <a-select-option v-for="i in filteredOptions" :key="i">
                  {{ i }}
                </a-select-option>
              </a-select>
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
                v-model="item.groupId"
                class="inputLogin"
              />
            </b-form-group>
          </div>
        </div>

        <div class="flex float-right">
          <BtnBack class="h-10" />
          <b-button
            variant="primary"
            class="mb-24 textBack h-10"
            @click="addQuantity"
            >Thêm</b-button
          >
          <button-skip :skip="skip" v-if="check" class="h-10" />
          <b-button type="submit" variant="primary" class="btnLogin mb-24 h-10"
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
import {
  groupRoleRoot,
  groupRoleDetails,
  getAllEmployee,
} from "@/api/AuthenConnector.js";
import { message } from "ant-design-vue";
export default {
  middleware: "auth",
  components: { ButtonSkip, BtnBack },
  data() {
    return {
      amount: 1,
      selectedItems: "",
      OPTIONS: [],
      arrForms: [],
      parts: [],
      parts2: [],
      parts3: [],
      visible: false,
      skip: "/move-inPerson",
      form: {
        employees: [],
        groupId: null,
        transferId: 0,
        transferNum: null,
      },

      check: true,
      page: {
        current: 1,
        pageSize: 500,
      },
    };
  },
  fetch() {
    this.arrForms.push(this.form);
    const isReport = localStorage.getItem("checkReport");
    // if (isReport === "true") {
    //   this.check = true;
    //   this.getValue();
    // }
    this.groupRoleRoot();
    this.getvalueName();
  },
  // watch: {
  //   "form.parentIdSupport": {
  //     handler: function (value) {
  //       this.groupRoleDetails2(value);
  //     },
  //     deep: true,
  //   },
  // },
  mounted() {
    const autofill = JSON.parse(localStorage.getItem("report"));
    const checkReport = localStorage.getItem("checkReport");
    if (autofill && checkReport === "false") {
      // this.arrForms = autofill.rests.map((item) => ({
      //   user: item.restName,
      //   reason: item.reasonId,
      //   reasonName: item.reasonName,
      //   session: item.session,
      // }));
    }
  },
  computed: {
    filteredOptions() {
      return this.OPTIONS.filter((o) => !this.selectedItems.includes(o));
    },
  },
  methods: {
    ...mapMutations({
      SET_STATE_TRANSFER: "SET_STATE_TRANSFER",
    }),
    handleChange(selectedItems) {
      this.selectedItems = selectedItems;
    },
    onChange(value) {
      console.log(value);
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
    addQuantity() {
      this.amoun = this.amoun + 1;
      for (let i = 0; i < this.amount; i++) {
        this.arrForms.push({
          employees: [],
          groupId: null,
          transferId: 0,
          transferNum: null,
        });
      }
    },
    onSubmit(event) {
      event.preventDefault();
      if (this.form.groupId) {
        let targetField = "groupId";
        let transferNum = "transferNum";
        for (let i = 0; i < this.arrForms.length; i++) {
          if (this.arrForms[i].hasOwnProperty(targetField)) {
            this.arrForms[i][targetField] =
              this.arrForms[i][targetField][
                this.arrForms[i][targetField].length - 1
              ];
          }
          if (this.arrForms[i].hasOwnProperty(transferNum)) {
            this.arrForms[i][transferNum] =
              this.arrForms[i].employees.length || 0;
          }
        }
        this.SET_STATE_TRANSFER(this.arrForms);

        this.$router.push("/move-inPerson");
      } else {
        message.warning("Chọn tổ đơn vị");
      }
    },
    // async getValue() {
    //   const day = today();
    //   const groupId = localStorage.getItem("groupId");
    //   const res = await getDetail({ day, groupId });
    //   if (res) {
    //     this.form.parentId = res.transfers[0].parentId;
    //     this.form.parentIdSupport = res.transfers[1].parentId;
    //     this.form.number = res.transfers[0].transferNum;
    //     this.form.group = res.transfers[0].groupId;
    //     this.form.transferId = res.transfers[0].transferId;
    //     this.form.support.number = res.transfers[1].transferNum;
    //     this.form.support.group = res.transfers[1].groupId;
    //     this.form.support.transferId = res.transfers[1].transferId;
    //   }
    // },
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
.textBack {
  color: #045396;
  border-color: #045396;
  border-radius: 50px;
}
</style>
<style>
.ant-select-selection--multiple {
  border-radius: 50px;
}
.ant-select-selection__choice {
  border-radius: 50px !important;
}
.ant-cascader-input {
  border-radius: 50px !important;
}
</style>
