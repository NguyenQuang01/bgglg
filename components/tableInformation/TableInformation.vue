<template>
  <div>
    <table class="mb-2">
      <tr>
        <th>Tên</th>
        <th>SL</th>
        <th>Thông tin</th>
      </tr>
      <tr>
        <td class="bg-sky-400 text-slate-50">ĐỊNH BIÊN</td>
        <td>{{ demarcation.quantity }}</td>
        <td>{{ demarcation.information }}</td>
      </tr>
      <tr>
        <td class="bg-sky-400 text-slate-50">SỐ THỜI VỤ</td>
        <td>{{ numberSeasonal.quantity }}</td>
        <td>{{ numberSeasonal.information }}</td>
      </tr>
      <tr>
        <td class="bg-sky-400 text-slate-50">SỐ H.SINH</td>
        <td>{{ numberStudent.quantity }}</td>
        <td>{{ numberStudent.information }}</td>
      </tr>
      <tr>
        <td class="bg-sky-400 text-slate-50">ĐIỀU CHUYỂN</td>
        <td>{{ numberTransfer.quantity }}</td>
        <td v-if="numberTransfer.information" class="text-lime-800">
          xác nhận
        </td>
        <td v-else class="text-rose-800">chưa xác nhận</td>
      </tr>
      <tr>
        <td class="bg-sky-400 text-slate-50">HỖ TRỢ</td>
        <td>{{ numberSupport.quantity }}</td>
        <td v-if="numberSupport.information" class="text-lime-800">xác nhận</td>
        <td v-else class="text-rose-800">chưa xác nhận</td>
      </tr>
      <tr>
        <td class="bg-sky-400 text-slate-50">BÁO CƠM</td>
        <td>
          {{
            Number(numberEatRice.staffQuantity) +
            Number(numberEatRice.staffQuantity) +
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
        <td class="bg-sky-400 text-slate-50">SỐ NGHỈ</td>
        <td>{{ numberReasons.quantity }}</td>
        <td>
          <div
            v-for="(item, index) in numberReasons.arrReasons"
            :key="index"
            class=""
          >
            {{ item.restName }}- {{ item.reasonId }}
          </div>
        </td>
      </tr>
      <tr>
        <td class="bg-orange-400 text-slate-50">SỐ LĐ TÍNH NĂNG SUẤT</td>
        <td>{{ numberProductivity.quantity }}</td>
        <td>{{ numberProductivity.information }}</td>
      </tr>
    </table>
    <b-button
      variant="primary"
      class="text-blue-700 float-right mb-10"
      @click="submit"
      >{{ btn }}</b-button
    >
    <a-modal v-model="visible" title="thông báo" @ok="handleOk">
      <p>
        Xin chào <span class="font-extrabold">{{ user }}</span> - bạn đã báo cáo
        lao động cho ngày hôm nay, xin cảm ơn
      </p>
    </a-modal>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import { saveDetail } from "@/api/AuthenConnector.js";

export default {
  data() {
    return {
      btn: "xác nhận",
      visible: false,
      user: "",
      hours: new Date().getHours(),
    };
  },
  fetch() {
    this.getValue();
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
        information: "abc",
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
  methods: {
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
      this.btn = "quay lại";
      if (this.hours < 18) {
        const res = await saveDetail(this.getDataInformationReport);
        if (res) {
          this.$router.push("/sussInformation");
        }
      } else {
        alert("đã qua 18 giờ");
      }
    },
  },
};
</script>
<style>
table {
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 100%;
}

td,
th {
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
}

/* tr:nth-child(even) {
  background-color: #dddddd;
} */
</style>
