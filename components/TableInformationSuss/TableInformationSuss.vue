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
        <td>{{ demarcation }}</td>
        <td></td>
      </tr>
      <tr>
        <td class="bg-sky-400 text-slate-50">SỐ THỜI VỤ</td>
        <td>{{ numberSeasonal }}</td>
        <td></td>
      </tr>
      <tr>
        <td class="bg-sky-400 text-slate-50">SỐ H.SINH</td>
        <td>{{ numberStudent }}</td>
        <td></td>
      </tr>
      <tr>
        <td class="bg-sky-400 text-slate-50">ĐIỀU CHUYỂN</td>
        <td>{{ numberTransfer }}</td>
        <td></td>
      </tr>
      <tr>
        <td class="bg-sky-400 text-slate-50">HỖ TRỢ</td>
        <td>{{ numberSupport }}</td>
        <td></td>
      </tr>
      <tr>
        <td class="bg-sky-400 text-slate-50">BÁO CƠM</td>
        <td>{{ numberEatRice }}</td>
        <td></td>
      </tr>

      <tr>
        <td class="bg-sky-400 text-slate-50">SỐ NGHỈ</td>
        <td>{{ numberReasons }}</td>
        <td>
          <div v-for="(item, index) in arrReasons" :key="index">
            {{ item.ten }}-{{ item.lydo }}
          </div>
        </td>
      </tr>
      <tr>
        <td class="bg-orange-400 text-slate-50">SỐ LĐ TÍNH NĂNG SUẤT</td>
        <td>{{ numberProductivity }}</td>
        <td></td>
      </tr>
    </table>
    <b-button
      variant="primary"
      class="text-blue-700 float-right mb-10"
      @click="submit"
      >quay lại</b-button
    >
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import { getDetail } from "@/api/AuthenConnector.js";
export default {
  data() {
    return {
      numberStudent: 0,
      numberReasons: 0,
      demarcation: 0,
      numberSeasonal: 0,
      numberTransfer: 0,
      numberSupport: 0,
      numberEatRice: 0,
      numberProductivity: 0,
      arrReasons: [],
    };
  },

  fetch() {
    this.getDetails();
  },

  methods: {
    submit() {
      alert("thanh cong tuyet voi");
    },
    async getDetails() {
      const res = await getDetail();
      console.log(res);
      if (res) {
        this.numberStudent = res.hocSinh;
        this.numberReasons = res.restList.length;
        this.demarcation = res.dinhBien;
        this.numberSeasonal = res.thoiVu;
        this.numberTransfer = res.transferList[0].numTranfer;
        this.numberSupport = res.transferList[1].numTranfer;
        this.numberEatRice = res.soCom;
        this.numberProductivity = res.laoDongNangSuat;
        this.arrReasons = res.restList;
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
