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
        <td>
          <input type="text" v-model="demarcation" class="w-20" v-if="isEdit" />
          <div v-else>{{ demarcation }}</div>
        </td>
        <td></td>
      </tr>
      <tr>
        <td class="bg-sky-400 text-slate-50">SỐ THỜI VỤ</td>
        <td>
          <input
            type="text"
            v-model="numberSeasonal"
            class="w-20"
            v-if="isEdit"
          />
          <div v-else>{{ numberSeasonal }}</div>
        </td>

        <td></td>
      </tr>
      <tr>
        <td class="bg-sky-400 text-slate-50">SỐ H.SINH</td>

        <td>
          <input
            type="text"
            v-model="numberStudent"
            class="w-20"
            v-if="isEdit"
          />
          <div v-else>{{ numberStudent }}</div>
        </td>
        <td></td>
      </tr>
      <tr>
        <td class="bg-sky-400 text-slate-50">ĐIỀU CHUYỂN</td>

        <td>
          <input
            type="text"
            v-model="numberTransfer"
            class="w-20"
            v-if="isEdit"
          />
          <div v-else>{{ numberTransfer }}</div>
        </td>
        <td v-if="isAcctoved" class="text-lime-800">xác nhận</td>
        <td v-else class="text-rose-800">chưa xác nhận</td>
      </tr>
      <tr>
        <td class="bg-sky-400 text-slate-50">HỖ TRỢ</td>

        <td>
          <input
            type="text"
            v-model="numberSupport"
            class="w-20"
            v-if="isEdit"
          />
          <div v-else>{{ numberSupport }}</div>
        </td>
        <td></td>
      </tr>
      <tr>
        <td class="bg-sky-400 text-slate-50">BÁO CƠM</td>
        <td>
          <input type="text" v-model="totalRice" class="w-20" v-if="isEdit" />
          <div v-else>{{ totalRice }}</div>
        </td>

        <td>
          <div class="whitespace-nowrap">
            Nhân viên:
            <input
              type="text"
              v-model="numberEatRice.riceEmp"
              class="w-20"
              v-if="isEdit"
            />
            <div v-else>{{ numberEatRice.riceEmp }}</div>
          </div>

          <div class="whitespace-nowrap">
            Khách:
            <input
              type="text"
              v-model="numberEatRice.riceCus"
              class="w-20"
              v-if="isEdit"
            />
            <div v-else>{{ numberEatRice.riceCus }}</div>
          </div>

          <div class="whitespace-nowrap">
            Khách Vip:
            <input
              type="text"
              v-model="numberEatRice.riceVip"
              class="w-20"
              v-if="isEdit"
            />
            <div v-else>{{ numberEatRice.riceVip }}</div>
          </div>
        </td>
      </tr>

      <tr>
        <td class="bg-sky-400 text-slate-50">SỐ NGHỈ</td>

        <td>
          <input
            type="text"
            v-model="arrReasons.length"
            class="w-20"
            v-if="isEdit"
          />
          <div v-else>{{ arrReasons.length }}</div>
        </td>
        <td>
          <div v-for="(item, index) in arrReasons" :key="index">
            <div v-if="isEdit">
              <input type="text" v-model="item.restName" class="w-10" />-
              <input type="text" v-model="item.reasonName" class="w-10" />
            </div>

            <div v-else>{{ item.restName }}-{{ item.reasonName }}</div>
          </div>
        </td>
      </tr>
      <tr>
        <td class="bg-orange-400 text-slate-50">SỐ LĐ TÍNH NĂNG SUẤT</td>

        <td>
          <input
            type="text"
            v-model="numberProductivity"
            class="w-20"
            v-if="isEdit"
          />
          <div v-else>{{ numberProductivity }}</div>
        </td>
        <td></td>
      </tr>
    </table>
    <b-button
      variant="primary"
      class="text-blue-700 float-right mb-10"
      @click="submit"
    >
      gửi</b-button
    >
    <b-button
      variant="primary"
      class="text-blue-700 float-right mx-2 mb-10"
      @click="edit"
      >sửa</b-button
    >
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import { getDetail, updateDetail } from "@/api/AuthenConnector.js";
import dayjs from "dayjs";
import { message } from "ant-design-vue";

export default {
  props: ["valueDay"],
  data() {
    return {
      isAcctoved: false,
      isEdit: false,
      numberStudent: 0,
      numberReasons: 0,
      demarcation: 0,
      numberSeasonal: 0,
      numberTransfer: 0,
      numberSupport: 0,
      totalRice: 0,
      numberEatRice: 0,
      numberProductivity: 0,
      arrReasons: [],
      restRequests: [],
      riceId: 0,
      id: 0,
      transferIdTran: 0,
      transferIdSupport: 0,
      groupIdTran: 0,
      groupIdSp: 0,
      day: new Date().getDate(),
      month: new Date().getMonth() + 1,
      year: new Date().getFullYear(),
    };
  },

  fetch() {
    this.getDetails();
  },
  watch: {
    valueDay: {
      handler: function (value) {
        console.log(value, 888);
        this.getDetails();
      },
      deep: true,
    },
  },
  methods: {
    edit() {
      this.isEdit = !this.isEdit;
    },
    submit() {
      const payload = {
        id: this.id,
        demarcation: Number(this.demarcation),
        laborProductivity: Number(this.numberProductivity),
        restNum: Number(this.numberReasons),
        partTimeNum: Number(this.numberSeasonal),
        studentNum: Number(this.numberStudent),
        riceRequests: {
          riceId: Number(this.riceId),
          riceEmp: Number(this.numberEatRice.riceEmp),
          riceCus: Number(this.numberEatRice.riceCus),
          riceVip: Number(this.numberEatRice.riceVip),
        },
        restRequests: this.arrReasons,
        transferRequests: [
          {
            transferId: Number(this.transferIdTran),
            transferNum: Number(this.numberTransfer),
            groupId: Number(this.groupIdTran),
            type: 1,
          },
          {
            transferId: Number(this.transferIdSupport),
            transferNum: Number(this.numberSupport),
            groupId: Number(this.groupIdSp),
            type: 2,
          },
        ],
      };
      const res = updateDetail(payload);
    },
    async getDetails() {
      const day = dayjs(this.valueDay).format("YYYY/MM/DD");
      const groupId = localStorage.getItem("groupId");
      const res = await getDetail({ day, groupId });
      console.log(res, 4444);
      if (res === undefined) {
        message.warning("ngày không có dữ liệu");
        this.numberStudent = "";
        this.numberReasons = "";
        this.demarcation = "";
        this.numberSeasonal = "";
        this.numberTransfer = "";
        this.numberSupport = "";
        this.numberEatRice = "";
        this.totalRice = "";
        this.numberProductivity = "";
        this.arrReasons = "";
        this.riceId = "";
        this.transferIdTran = "";
        this.groupIdTran = "";
        this.transferIdSupport = "";
        this.groupIdSp = "";
        this.id = "";
        this.isAcctoved = "";
      }
      if (res) {
        this.numberStudent = res.studentNum;
        this.numberReasons = res.restNum;
        this.demarcation = res.demarcation;
        this.numberSeasonal = res.partTimeNum;
        this.numberTransfer = res.transferNum;
        this.numberSupport = res.supportNum;
        this.numberEatRice = res.rice;
        this.totalRice = res.totalRice;
        this.numberProductivity = res.laborProductivity;
        this.arrReasons = res.rests;
        this.riceId = res.rice.riceId;
        this.transferIdTran = res.transfers[0].transferId;
        this.groupIdTran = res.transfers[0].groupId;
        this.transferIdSupport = res.transfers[1].transferId;
        this.groupIdSp = res.transfers[1].groupId;
        this.id = res.id;
        this.isAcctoved = res.transfers[0].access;
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
