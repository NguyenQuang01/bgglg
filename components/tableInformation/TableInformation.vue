<template>
  <table class="mb-10">
    <tr>
      <th>Tên</th>
      <th>SL</th>
      <th>Thông tin</th>
    </tr>
    <tr>
      <td class="bg-sky-400 text-slate-50">ĐỊNH BIÊN</td>
      <td>2</td>
      <td>10 Downing Street</td>
    </tr>
    <tr>
      <td class="bg-sky-400 text-slate-50">SỐ THỜI VỤ</td>
      <td>2</td>
      <td>Austria</td>
    </tr>
    <tr>
      <td class="bg-sky-400 text-slate-50">SỐ H.SINH</td>
      <td>2</td>
      <td>UK</td>
    </tr>
    <tr>
      <td class="bg-sky-400 text-slate-50">ĐIỀU CHUYỂN</td>
      <td>2</td>
      <td>Canada</td>
    </tr>
    <tr>
      <td class="bg-sky-400 text-slate-50">HỖ TRỢ</td>
      <td>2</td>
      <td>Italy</td>
    </tr>
    <tr>
      <td class="bg-sky-400 text-slate-50">BÁO CƠM</td>
      <td>2</td>
      <td>Italy</td>
    </tr>

    <tr>
      <td class="bg-sky-400 text-slate-50">SỐ NGHỈ</td>
      <td>3</td>
      <td>
        <div v-for="(item, index) in arrReasons" :key="index">
          {{ item.name }}-{{ item.report }}
        </div>
      </td>
    </tr>
    <tr>
      <td class="bg-orange-400 text-slate-50">SỐ LĐ TÍNH NĂNG SUẤT</td>
      <td>2</td>
      <td>Italy</td>
    </tr>
  </table>
</template>
<script>
export default {
  setup() {
    return {
      arrReasons: [
        { name: "trungquang", report: "om" },
        { name: "trungquang", report: "om" },
        { name: "trungquang", report: "om" },
      ],
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
