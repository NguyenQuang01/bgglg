<template>
  <table class="mb-10">
    <tr>
      <th>Tên</th>
      <th>SL</th>
      <th>Thông tin</th>
    </tr>
    <tr>
      <td class="bg-sky-400 text-slate-50">ĐỊNH BIÊN</td>
      <td>{{ dataTable.demarcation.quantity }}</td>
      <td>{{ dataTable.demarcation.information }}</td>
    </tr>
    <tr>
      <td class="bg-sky-400 text-slate-50">SỐ THỜI VỤ</td>
      <td>{{ dataTable.numberSeasonal.quantity }}</td>
      <td>{{ dataTable.numberSeasonal.information }}</td>
    </tr>
    <tr>
      <td class="bg-sky-400 text-slate-50">SỐ H.SINH</td>
      <td>{{ dataTable.numberStudent.quantity }}</td>
      <td>{{ dataTable.numberStudent.information }}</td>
    </tr>
    <tr>
      <td class="bg-sky-400 text-slate-50">ĐIỀU CHUYỂN</td>
      <td>{{ dataTable.numberTransfer.quantity }}</td>
      <td>{{ dataTable.numberTransfer.information }}</td>
    </tr>
    <tr>
      <td class="bg-sky-400 text-slate-50">HỖ TRỢ</td>
      <td>{{ dataTable.numberSupport.quantity }}</td>
      <td>{{ dataTable.numberSupport.information }}</td>
    </tr>
    <tr>
      <td class="bg-sky-400 text-slate-50">BÁO CƠM</td>
      <td>{{ dataTable.numberEatRice.quantity }}</td>
      <td>{{ dataTable.numberEatRice.information }}</td>
    </tr>

    <tr>
      <td class="bg-sky-400 text-slate-50">SỐ NGHỈ</td>
      <td>{{ dataTable.numberReasons.quantity }}</td>
      <td>
        <div
          v-for="(item, index) in dataTable.numberReasons.arrReasons"
          :key="index"
        >
          {{ item.name }}-{{ item.report }}
        </div>
      </td>
    </tr>
    <tr>
      <td class="bg-orange-400 text-slate-50">SỐ LĐ TÍNH NĂNG SUẤT</td>
      <td>{{ dataTable.numberProductivity.quantity }}</td>
      <td>{{ dataTable.numberProductivity.information }}</td>
    </tr>
  </table>
</template>
<script>
export default {
  setup() {
    return {
      dataTable: {
        numberReasons: {
          quantity: 3,
          arrReasons: [
            { name: "trungquang", report: "om" },
            { name: "trungquang", report: "om" },
            { name: "trungquang", report: "om" },
          ],
        },

        demarcation: { information: "abc", quantity: 100 },
        numberSeasonal: { information: "", quantity: 54 },
        numberStudent: { information: "", quantity: 3 },
        numberTransfer: { information: "", quantity: 3 },
        numberSupport: { information: "", quantity: 5 },
        numberEatRice: { information: "", quantity: 6 },
        numberProductivity: { information: "", quantity: 43 },
      },
    };
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
