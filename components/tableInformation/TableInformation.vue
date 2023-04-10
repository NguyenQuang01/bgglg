<template>
  <div>
    <table class="mb-2">
      <tr class="thText">
        <th>Tên</th>
        <th>SL</th>
        <th>Thông tin</th>
      </tr>
      <tr>
        <td class="tdText text-slate-50">ĐỊNH BIÊN</td>
        <td>{{ demarcation.quantity }}</td>
        <td>{{ demarcation.information }}</td>
      </tr>
      <tr>
        <td class="tdText text-slate-50">SỐ THỜI VỤ</td>
        <td>{{ numberSeasonal.quantity }}</td>
        <td>{{ numberSeasonal.information }}</td>
      </tr>
      <tr>
        <td class="tdText text-slate-50">SỐ H.SINH</td>
        <td>{{ numberStudent.quantity }}</td>
        <td>{{ numberStudent.information }}</td>
      </tr>
      <tr>
        <td class="tdText text-slate-50">ĐIỀU CHUYỂN</td>
        <td>{{ numberTransfer.quantity }}</td>
        <!-- <td v-if="numberTransfer.information" class="text-lime-800">
          xác nhận
        </td>
        <td v-else class="text-rose-800">chưa xác nhận</td> -->
        <td></td>
      </tr>
      <tr>
        <td class="tdText text-slate-50">HỖ TRỢ</td>
        <td>{{ numberSupport.quantity }}</td>
        <!-- <td v-if="numberSupport.information" class="text-lime-800">xác nhận</td>
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
        <td class="tdText text-slate-50">SỐ NGHỈ</td>
        <td>{{ numberReasons.quantity }}</td>
        <td>
          <div
            v-for="(item, index) in numberReasons.arrReasons"
            :key="index"
            class=""
          >
            {{ item.restName }}- {{ nameReason(item.reasonId) }}
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
    };
  },
  fetch() {
    this.getValue();
    this.getReason();
  },
  computed: {
    ...mapGetters({
      getDataInformationReport: "getDataInformationReport",
    }),
    numberReasons() {
      return {
        quantity: this.getDataInformationReport?.restNum,
        arrReasons: this.getDataInformationReport?.restRequests,
      };
    },
    demarcation() {
      return {
        information: " ",
        quantity: this.getDataInformationReport?.demarcation,
      };
    },
    numberSeasonal() {
      return {
        information: "",
        quantity: this.getDataInformationReport?.partTimeNum,
      };
    },
    numberStudent() {
      return {
        information: "",
        quantity: this.getDataInformationReport?.studentNum,
      };
    },
    numberTransfer() {
      return {
        information: true,
        quantity:
          this.getDataInformationReport?.transferRequests[0].transferNum,
      };
    },
    numberSupport() {
      return {
        information: false,
        quantity:
          this.getDataInformationReport?.transferRequests[1].transferNum,
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
        quantity: this.getDataInformationReport?.laborProductivity,
      };
    },
  },
  created() {
    this.getDemarcation();
    // setTimeout(() => this.getProductivity(), 0);
  },
  methods: {
    ...mapMutations({
      SET_STATE_DEMARCATION: "SET_STATE_DEMARCATION",
      SET_STATE_PRODUCTIVITY: "SET_STATE_PRODUCTIVITY",
    }),

    async getDemarcation() {
      let numberDemarcation = 0;
      const groupId = localStorage.getItem("groupId");
      const res = await getDemarcationDb(groupId);
      if (res && res.status === 200) {
        numberDemarcation = res.data.demarcationAvailable;
        const demarcation =
          numberDemarcation +
          Number(this.getDataInformationReport.studentNum) +
          Number(this.getDataInformationReport.partTimeNum);
        this.SET_STATE_DEMARCATION(demarcation);
        const productivity =
          Number(this.getDataInformationReport.demarcation) -
          Number(this.getDataInformationReport.restNum) -
          Number(this.getDataInformationReport.studentNum) -
          Number(
            this.getDataInformationReport.transferRequests[0].transferNum
          ) -
          Number(this.getDataInformationReport.transferRequests[1].transferNum);
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
    // getProductivity() {
    //   console.log(Number(this.getDataInformationReport.demarcation));
    // },
    getValue() {
      this.user = localStorage.getItem("userLogin");
    },
    showModal() {
      this.visible = true;
    },
    handleOk() {
      this.visible = false;
    },
    async submit(event) {
      event.preventDefault();
      this.btn = "quay lai";
      const checkReport = localStorage.getItem("checkReport");
      if (checkReport === "false") {
        if (this.hours < 18) {
          const res = await saveDetail(this.getDataInformationReport);
          if (res) {
            message.success("thành công");
            localStorage.setItem("checkReport", true);
            setTimeout(() => {
              this.$router.push("/sussInformation");
            }, "1000");
          }
          if (res && res.status === 400) {
            message.warning("lỗi điều chuyển vào tổ của mình");
          }
        } else {
          alert("đã qua 18 giờ");
        }
      }
      if (checkReport === "true") {
        const day = today();
        const groupId = localStorage.getItem("groupId");
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
        console.log(res, 34334);
        if (res) {
          message.success("sửa thành công");
          setTimeout(() => this.$router.push("/sussInformation"), 1000);
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
  },
};
</script>
<style>
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
