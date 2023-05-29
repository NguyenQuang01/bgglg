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
        <td>
          <input
            type="text"
            v-model="demarcationAvailable"
            class="w-20"
            v-if="isEdit"
          />
          <div v-else>{{ demarcationAvailable }}</div>
        </td>
        <td></td>
      </tr>
      <!-- <tr>
        <td class="tdText text-slate-50">ĐỊNH BIÊN MỚI</td>
        <td>
          <input type="text" v-model="demarcation" class="w-20" v-if="isEdit" />
          <div v-else>{{ demarcation }}</div>
        </td>
        <td></td>
      </tr> -->
      <tr>
        <td class="tdText text-slate-50">SỐ THỜI VỤ</td>
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
        <td class="tdText text-slate-50">SỐ LAO ĐỘNG KHÔNG TÍNH NĂNG SUẤT</td>

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
        <td class="tdText text-slate-50">LAO ĐỘNG BIẾT NGHỀ</td>
        <td>
          <input
            type="text"
            v-model="professionLabor"
            class="w-20"
            v-if="isEdit"
          />
          <div v-else>{{ professionLabor }}</div>
        </td>

        <td></td>
      </tr>
      <tr>
        <td class="tdText text-slate-50">LAO ĐỘNG KHÔNG BIẾT NGHỀ</td>
        <td>
          <input
            type="text"
            v-model="professionNotLabor"
            class="w-20"
            v-if="isEdit"
          />
          <div v-else>{{ professionNotLabor }}</div>
        </td>

        <td></td>
      </tr>
      <tr>
        <td class="tdText text-slate-50">ĐIỀU CHUYỂN ĐI</td>

        <td>
          <div>{{ numberTransfer.length }}</div>
        </td>

        <td>
          <div v-for="(item, index) in numberTransfer" :key="index">
            {{ item }}
          </div>
        </td>
      </tr>
      <tr>
        <td class="tdText text-slate-50">ĐIỀU CHUYỂN ĐẾN</td>

        <td>
          <div>{{ numberSupport.length }}</div>
        </td>
        <td>
          <div v-for="(item, index) in numberSupport" :key="index">
            {{ item }}
          </div>
        </td>
      </tr>
      <tr>
        <td class="tdText text-slate-50">THÔI VIỆC</td>

        <td>
          <div>{{ employeeStop.length }}</div>
        </td>
        <td>
          <div v-for="(item, index) in employeeStop" :key="index">
            {{ item }}
          </div>
        </td>
      </tr>
      <tr>
        <td class="tdText text-slate-50">BÁO CƠM</td>
        <td>
          <!-- <input type="text" v-model="totalRice" class="w-20" v-if="isEdit" /> -->
          <div>{{ totalRice }}</div>
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
        <td class="tdText text-slate-50">NGHỈ HÀNG NGÀY</td>

        <td>
          <div>{{ totalReasons }}</div>
        </td>
        <td>
          <div v-for="(item, index) in arrReasons" :key="index">
            <div>
              <span class="font-semibold">{{ item.restName }}</span> -{{
                item.reasonName
              }}
            </div>
          </div>
        </td>
      </tr>
      <tr>
        <td class="bg-orange-400 text-slate-50">SỐ LĐ TÍNH NĂNG SUẤT</td>

        <td>
          <div>{{ numberProductivity }}</div>
        </td>
        <td></td>
      </tr>
    </table>
    <div class="float-right flex items-center mt-2">
      <BtnBack class="h-10" />
      <b-button variant="primary" class="btnLogin" @click="edit">sửa</b-button>
    </div>
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
      hours: new Date().getHours(),
      isAcctoved: false,
      isEdit: false,
      numberStudent: 0,
      numberReasons: 0,
      demarcation: 0,
      demarcationAvailable: 0,
      numberSeasonal: 0,
      professionLabor: 0,
      professionNotLabor: 0,
      numberTransfer: 0,
      numberSupport: 0,
      employeeStop: 0,
      totalRice: 0,
      numberEatRice: 0,
      arrReasons: [],
      restRequests: [],
      riceId: 0,
      id: 0,
      transferIdTran: 0,
      transferIdSupport: 0,
      groupIdTran: 0,
      totalReasons: 0,
      groupIdSp: 0,
      numberProductivity: 0,
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
        this.getDetails();
      },
      deep: true,
    },
  },
  methods: {
    edit() {
      // if (this.hours >= 18) {
      // message.warning("đã qua 18giờ không được sửa");
      //   return;
      // }
      // this.isEdit = !this.isEdit;
      this.$router.push("/reasonAbsent");
    },
    submit() {},
    async getDetails() {
      const day = dayjs(this.valueDay).format("YYYY/MM/DD");
      const groupId = localStorage.getItem("groupId");
      const res = await getDetail({ day, groupId });
      if (res === undefined) {
        message.warning("ngày không có dữ liệu");
        this.numberStudent = "";
        this.numberReasons = "";
        this.demarcation = "";
        this.demarcationAvailable = "";
        this.numberSeasonal = "";
        this.professionLabor = "";
        this.professionNotLabor = "";
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
        this.employeeStop = "";
      }
      if (res) {
        this.numberStudent = res.studentNum;
        this.numberReasons = res.restNum;
        this.demarcation = res.demarcation;
        this.demarcationAvailable = res.demarcationAvailable;
        this.numberSeasonal = res.partTimeNum;
        this.professionLabor = res.professionLabor;
        this.professionNotLabor = res.professionNotLabor;
        this.numberTransfer = res.employeeTransferTo;
        this.numberSupport = res.employeeReceive;
        this.employeeStop = res.employeeStop;
        this.numberProductivity = res.laborProductivity;
        this.numberEatRice = res.riceResponses;
        this.totalRice = res.totalRice;
        this.totalReasons = res.restNum;
        this.arrReasons = res.rests;
        this.riceId = res.riceResponses.riceId;
        this.transferIdTran = res.transfers[0]?.transferId;
        this.groupIdTran = res.transfers[0]?.groupId;
        this.transferIdSupport = res.transfers[1]?.transferId;
        this.groupIdSp = res.transfers[1]?.groupId;
        this.id = res.id;
        this.isAcctoved = res.transfers[0].access;
        // this.demarcation -
        // Number(this.arrReasons.length) -
        // this.numberStudent -
        // this.numberTransfer -
        // this.numberSupport;
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
.btnLogin {
  background-color: #045396;
  color: #ffff;
  border-radius: 50px;
  margin-left: 5px;
}
</style>
