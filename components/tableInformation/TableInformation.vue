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
        <td>{{ numberEatRice.information }}</td>
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
            {{ item }}
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
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import { saveDetail } from "@/api/AuthenConnector.js";

export default {
  data() {
    return {
      btn: "xác nhận",
    };
  },
  computed: {
    ...mapGetters({
      getDataInformationReport: "getDataInformationReport",
    }),
    numberReasons() {
      return {
        quantity: this.getDataInformationReport?.labor,
        arrReasons: this.getDataInformationReport?.arrLabor,
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
        quantity: this.getDataInformationReport?.seasonal,
      };
    },
    numberStudent() {
      return {
        information: "",
        quantity: this.getDataInformationReport?.student,
      };
    },
    numberTransfer() {
      return {
        information: true,
        quantity: this.getDataInformationReport?.transfer,
      };
    },
    numberSupport() {
      return {
        information: false,
        quantity: this.getDataInformationReport?.support,
      };
    },
    numberEatRice() {
      return {
        information: "",
        staffQuantity: this.getDataInformationReport?.meal.staff,
        guestQuantity: this.getDataInformationReport?.meal.guest,
        guestVipQuantity: this.getDataInformationReport?.meal.guestVip,
      };
    },
    numberProductivity() {
      return {
        information: "",
        quantity: this.getDataInformationReport?.productivity,
      };
    },
  },
  methods: {
    async submit(event) {
      event.preventDefault();
      this.btn = "quay lại";
      alert("xác nhận thành công");
      // console.log(this.getDataInformationReport);
      // const test = {
      //   userGroupId: "1",
      //   totalProductivity: "56",
      //   demarcation: "50",
      //   createBy: "ssdf",
      //   orderDate: "2023-03-14",
      //   reportDtlRequest: {
      //     reportId: "3",
      //     empNum: "4",
      //     riceNumber: "5",
      //     numEmp: "2",
      //     groupId: "3",
      //     partTimeNum: "4",
      //     restNumber: "2",
      //     studentNum: "3",
      //   },
      //   restRequests: [
      //     {
      //       name: "ducanh",
      //       reasonId: "1",
      //     },
      //     {
      //       name: "dai oc cho",
      //       reasonId: "1",
      //     },
      //   ],
      //   transferRequests: [
      //     {
      //       transferNum: "6",
      //       userGroupId: "1",
      //       transferType: "1",
      //     },
      //     {
      //       transferNum: "8",
      //       userGroupId: "1",
      //       transferType: "0",
      //     },
      //   ],
      // };
      //   totalProductivity: this.getDataInformationReport.numberProductivity,
      //   demarcation: this.getDataInformationReport.numberProductivity,
      //   createBy: "ssdf",
      //   totalProductivity: this.getDataInformationReport.numberProductivity,
      //   totalProductivity: this.getDataInformationReport.numberProductivity,
      //   totalProductivity: this.getDataInformationReport.numberProductivity,
      // };
      // const res = await saveDetail(test);

      // console.log(res);
      this.$router.push("/sussInformation");
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
