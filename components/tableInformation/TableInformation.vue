<template>
  <div>
    <table class="mb-2">
      <tr class="thText">
        <th>Tên</th>
        <th>SL</th>
        <th>Thông tin</th>
      </tr>
      <tr>
        <td class="tdText text-slate-50">ĐỊNH BIÊN BAN ĐẦU</td>
        <td>{{ demarcationOld.quantity }}</td>
        <td>{{ demarcationOld.information }}</td>
      </tr>
      <tr>
        <td class="tdText text-slate-50">ĐỊNH BIÊN MỚI</td>
        <td>{{ demarcation.quantity }}</td>
        <td>{{ demarcation.information }}</td>
      </tr>
      <tr>
        <td class="tdText text-slate-50">SỐ THỜI VỤ</td>
        <td>{{ numberSeasonal.quantity }}</td>
        <td>{{ numberSeasonal.information }}</td>
      </tr>
      <tr>
        <td class="tdText text-slate-50">SỐ LAO ĐỘNG KHÔNG TÍNH NĂNG SUẤT</td>
        <td>{{ numberStudent.quantity }}</td>
        <td>{{ numberStudent.information }}</td>
      </tr>
      <tr>
        <td class="tdText text-slate-50">LAO ĐỘNG BIẾT NGHỀ</td>
        <td>{{ professionLabor.quantity }}</td>
        <td>{{ professionLabor.information }}</td>
      </tr>
      <tr>
        <td class="tdText text-slate-50">LAO ĐỘNG CHƯA BIẾT NGHỀ</td>
        <td>{{ professionNotLabor.quantity }}</td>
        <td>{{ professionNotLabor.information }}</td>
      </tr>

      <tr>
        <td class="tdText text-slate-50">ĐIỀU CHUYỂN ĐI</td>
        <td>{{ numberTransfer.quantity }}</td>
        <td>
          <div v-for="(item, index) in numberTransfer.information" :key="index">
            {{ item }}
          </div>
        </td>
        <!-- <td v-if="numberTransfer.information" class="text-lime-800">
          xác nhận
        </td>
        <td v-else class="text-rose-800">chưa xác nhận</td> -->
      </tr>

      <tr>
        <td class="tdText text-slate-50">ĐIỀU CHUYỂN ĐẾN</td>
        <td>{{ numberSupport.quantity }}</td>
        <!-- <td v-if="numberTransfer.information" class="text-lime-800">
          xác nhận
        </td>
        <td v-else class="text-rose-800">chưa xác nhận</td> -->
        <td></td>
      </tr>
      <!-- <tr>
        <td class="tdText text-slate-50">ĐI HỖ TRỢ</td>
        <td>{{ numberSupport.quantity }}</td>
        <td v-if="numberSupport.information" class="text-lime-800">xác nhận</td>
        <td v-else class="text-rose-800">chưa xác nhận</td>
        <td></td>
      </tr>
      <tr>
        <td class="tdText text-slate-50">ĐẾN HỖ TRỢ</td>
        <td>{{ numberSupport.quantity }}</td>
        <td v-if="numberSupport.information" class="text-lime-800">xác nhận</td>
        <td v-else class="text-rose-800">chưa xác nhận</td>
        <td></td>
      </tr> -->
      <tr>
        <td class="tdText text-slate-50">Thôi việc</td>
        <td>{{ Quit.quantity }}</td>
        <!-- <td v-if="numberTransfer.information" class="text-lime-800">
          xác nhận
        </td>
        <td v-else class="text-rose-800">chưa xác nhận</td> -->
        <td></td>
      </tr>
      <tr>
        <td class="tdText text-slate-50">BÁO CƠM</td>
        <td>
          {{
            Number(numberEatRice.staffQuantity) +
            Number(numberEatRice.guestQuantity) +
            Number(numberEatRice.guestVipQuantity)
          }}
        </td>
        <td>
          <div class="whitespace-nowrap">
            Nhân viên: {{ numberEatRice.staffQuantity }}
          </div>

          <div class="whitespace-nowrap">
            Khách: {{ numberEatRice.guestQuantity }}
          </div>

          <div class="whitespace-nowrap">
            Khách Vip: {{ numberEatRice.guestVipQuantity }}
          </div>
        </td>
      </tr>

      <tr>
        <td class="tdText text-slate-50">NGHỈ HÀNG NGÀY</td>
        <td>{{ numberReasons.quantity }}</td>
        <td>
          <div
            v-for="(item, index) in numberReasons.arrReasons"
            :key="index"
            class=""
          >
            {{ item.restNameAndLabor }}- {{ nameReason(item.reasonId) }}
          </div>
        </td>
      </tr>
      <tr>
        <td class="bg-orange-400 text-slate-50">SỐ LĐ TÍNH NĂNG SUẤT</td>
        <td>{{ numberProductivity.quantity }}</td>
        <td>{{ numberProductivity.information }}</td>
      </tr>
    </table>
    <div class="float-right flex items-center mt-2">
      <BtnBack class="h-10" />
      <b-button variant="primary" class="btnLogin" @click="submit">{{
        btn
      }}</b-button>
    </div>

    <a-modal v-model="visible" title="thông báo" @ok="handleOk">
      <p>
        Xin chào <span class="font-extrabold">{{ user }}</span> - bạn đã báo cáo
        lao động cho ngày hôm nay, xin cảm ơn
      </p>
    </a-modal>
  </div>
</template>
<script>
import { mapGetters, mapMutations } from "vuex";
import {
  saveDetail,
  getDemarcationDb,
  updateDetail,
  reason,
  refreshToken,
  deleteEm,
  updateDemarcation,
  getIdsTomay,
} from "@/api/AuthenConnector.js";
import { message } from "ant-design-vue";
import { getDetail } from "@/api/AuthenConnector.js";
import { today } from "@/constants/getToday";
export default {
  data() {
    return {
      btn: "xác nhận",
      visible: false,
      user: "",
      hours: new Date().getHours(),
      options: [],
      token: "",
      numberSeasonal1: [],
      groupId: 0,
    };
  },
  fetch() {
    this.getValue();
    this.getReason();
    this.getNumberSeasonal();
  },
  computed: {
    ...mapGetters({
      getDataInformationReport: "getDataInformationReport",
      getNumberDeleteLabor: "getNumberDeleteLabor",
      getCodeDeleteLabor: "getCodeDeleteLabor",
    }),
    numberReasons() {
      return {
        quantity: this.getDataInformationReport?.restNum,
        arrReasons: this.getDataInformationReport?.restRequests,
      };
    },
    demarcation() {
      const total = this.getDataInformationReport.transferRequests
        .map((item) => item.transferNum)
        .reduce((accumulator, currentValue) => accumulator + currentValue, 0);
      return {
        information: " ",
        quantity:
          Number(this.getDataInformationReport?.demarcation) -
          Number(this.getNumberDeleteLabor) -
          Number(total),
      };
    },
    demarcationOld() {
      return {
        information: " ",
        quantity: this.getDataInformationReport?.demarcationAvailable,
      };
    },
    professionNotLabor() {
      return {
        information: " ",
        quantity: this.getDataInformationReport?.professionNotLabor,
      };
    },
    professionLabor() {
      return {
        information: " ",
        quantity: this.getDataInformationReport?.professionLabor,
      };
    },
    numberSeasonal() {
      // const isBelowThreshold = (currentValue) =>
      //   currentValue === localStorage.getItem("groupId");
      const total = this.numberSeasonal1.includes(Number(this.groupId));
      return {
        information: "",
        quantity: total
          ? Number(this.getDataInformationReport?.partTimeNum) / 2
          : this.getDataInformationReport?.partTimeNum,
      };
    },
    numberStudent() {
      return {
        information: "",
        quantity: this.getDataInformationReport?.studentNum,
      };
    },
    numberTransfer() {
      let obj = this.getDataInformationReport.transferRequests.map(
        (item) => item.employees
      );
      let mergedArray = [];

      for (let key in obj) {
        if (Array.isArray(obj[key])) {
          mergedArray = mergedArray.concat(obj[key]);
        }
      }
      return {
        information: mergedArray,
        quantity: this.getDataInformationReport.transferRequests
          .map((item) => item.transferNum)
          .reduce((accumulator, currentValue) => accumulator + currentValue, 0),
      };
    },
    numberSupport() {
      return {
        information: false,
        quantity: localStorage.getItem("totalTransfer"),
      };
    },
    Quit() {
      return {
        information: this.getCodeDeleteLabor,
        quantity: this.getNumberDeleteLabor,
      };
    },
    numberEatRice() {
      return {
        information: "",
        staffQuantity: this.getDataInformationReport?.riceRequests.riceEmp,
        guestQuantity: this.getDataInformationReport?.riceRequests.riceCus,
        guestVipQuantity: this.getDataInformationReport?.riceRequests.riceVip,
      };
    },
    numberProductivity() {
      return {
        information: "",
        quantity: Number(this.getDataInformationReport?.laborProductivity),
      };
    },
  },
  created() {
    this.getDemarcation();

    // setTimeout(() => this.getProductivity(), 0);
  },
  mounted() {
    this.token = localStorage.getItem("JWT");
    this.groupId = localStorage.getItem("groupId");
  },
  methods: {
    ...mapMutations({
      SET_STATE_DEMARCATION: "SET_STATE_DEMARCATION",
      SET_STATE_PRODUCTIVITY: "SET_STATE_PRODUCTIVITY",
      SET_STATE_DEMARCATIONOLD: "SET_STATE_DEMARCATIONOLD",
    }),

    async getDemarcation() {
      let numberDemarcation = 0;
      const groupId = localStorage.getItem("groupId");
      const res = await getDemarcationDb(groupId);
      if (res && res.status === 200) {
        const totalTransfer = localStorage.getItem("totalTransfer");
        numberDemarcation = res.data.demarcationAvailable;
        const demarcation = numberDemarcation;
        this.SET_STATE_DEMARCATIONOLD(demarcation);
        this.SET_STATE_DEMARCATION(
          Number(demarcation) - Number(this.getNumberDeleteLabor)
        );
        const total = this.numberSeasonal1.includes(Number(groupId));
        const productivity =
          Number(this.getDataInformationReport.demarcation) -
          Number(this.getDataInformationReport.restNum) -
          Number(this.getDataInformationReport.studentNum) +
          (total
            ? Number(this.getDataInformationReport?.partTimeNum) / 2
            : Number(this.getDataInformationReport?.partTimeNum));
        // Number(
        //   this.getDataInformationReport.transferRequests
        //     .map((item) => item.transferNum)
        //     .reduce(
        //       (accumulator, currentValue) => accumulator + currentValue,
        //       0
        //     )
        // ) +
        // Number(totalTransfer) +
        // this.partTimeNum();
        this.SET_STATE_PRODUCTIVITY(productivity);
      }
    },
    nameReason(item) {
      const array1 = this.options;

      if (array1.length > 0) {
        const found = array1.find((element) => element.value === item);
        return found.text;
      }
    },

    getValue() {
      this.user = localStorage.getItem("userLogin");
    },
    // partTimeNum() {
    //   const cat = "cắt";
    //   const kcs = "kcs";
    //   const ht = "hoàn thiện";
    //   const groupName = localStorage.getItem("groupName").toLowerCase();
    //   const isCat = groupName.includes(cat);
    //   const isKcs = groupName.includes(kcs);
    //   const isHt = groupName.includes(ht);
    //   const isZero = isCat || isKcs || isHt ? true : false;
    //   return isZero ? 0 : Number(this.getDataInformationReport.partTimeNum) / 2;
    // },
    showModal() {
      this.visible = true;
    },
    handleOk() {
      this.visible = false;
    },
    async submit(event) {
      event.preventDefault();
      this.btn = "quay lai";
      const res = await refreshToken(this.token);
      if (res && res.status === 200) {
        if (res.data.checkReport === false) {
          const payload = {
            groupId: localStorage.getItem("groupId"),
            laborEmp: this.getCodeDeleteLabor,
          };
          const totalLaborendNotLabor =
            localStorage.getItem("totalLaborendNotLabor") ||
            Number(localStorage.getItem("demarcation"));
          const groupName = localStorage.getItem("groupName");
          const groupId = localStorage.getItem("groupId");
          const respon = await updateDemarcation(
            totalLaborendNotLabor,
            groupId,
            groupName
          );
          const ress = await deleteEm(payload);
          // if (this.hours > 18+7) {
          const res = await saveDetail(this.getDataInformationReport);
          if (res) {
            localStorage.setItem(
              "report",
              JSON.stringify(this.getDataInformationReport)
            );
            message.success("thành công");
            localStorage.setItem("checkReport", true);
            setTimeout(() => {
              this.$router.push("/sussInformation");
            }, "1000");
          }
          if (res && res.status === 400) {
            message.warning("lỗi điều chuyển vào tổ của mình");
          }
          // } else {
          //   alert("đã qua 18 giờ");
          // }
          return;
        }
        if (res.data.checkReport === true) {
          const payloads = {
            groupId: localStorage.getItem("groupId"),
            laborEmp: this.getCodeDeleteLabor,
          };
          const totalLaborendNotLabor = localStorage.getItem(
            "totalLaborendNotLabor"
          );
          const groupId = localStorage.getItem("groupId");
          const groupName = localStorage.getItem("groupName");

          const respon = await updateDemarcation(
            totalLaborendNotLabor,
            groupId,
            groupName
          );
          const ress = await deleteEm(payloads);
          const day = today();
          const response = await getDetail({ day, groupId });
          let id = 0;
          if (response) {
            id = response.id;
          }
          const payload = {
            ...this.getDataInformationReport,
            id: id,
          };
          const res = updateDetail(payload);
          if (res) {
            localStorage.setItem("report", JSON.stringify(payload));
            message.success("sửa thành công");
            setTimeout(() => this.$router.push("/sussInformation"), 1000);
          }
          return;
        }
      }
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
    async getNumberSeasonal() {
      const res = await getIdsTomay();
      if (res) {
        console.log(res);
        this.numberSeasonal1 = res;
      }
    },
  },
};
</script>
<style scoped>
.tdText {
  color: #045396;
}
.thText {
  /* background-color: #045396; */
  background-color: #045396;
  color: #ffff;
}
.table {
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 100%;
}

td,
th {
  border: 1px solid #929292;
  text-align: left;
  padding: 8px;
}
/* 
tr:nth-child(even) {
  background-color: #dddddd;
} */
.btnLogin {
  background-color: #045396;
  color: #ffff;
  border-radius: 50px;
  margin-left: 5px;
}
</style>
