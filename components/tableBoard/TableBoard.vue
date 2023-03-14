<template lang="">
  <div>
    <table>
      <tr>
        <th>Bộ phận</th>
        <th>Tổng số lao động</th>
        <th>Lao động báo năng suất</th>
        <th>Lao động báo năng suất</th>
        <th>Lao động báo năng suất</th>
        <th>Tỉ lệ %</th>
        <th>Tổng lao động báo năng suất</th>
      </tr>
      <tr>
        <td class="font-bold backgroundBlue">văn phòng</td>
        <td>191 <span class="text-emerald-700"></span></td>
        <td></td>
        <td>191<span class="text-emerald-700"></span></td>
        <td>191<span class="text-emerald-700"></span></td>
        <td>11.39 <span class="text-rose-700"></span></td>
        <td rowspan="3" class="font-bold">
          1682.0<span class="text-emerald-700"></span>
        </td>
      </tr>
      <tr>
        <td class="font-bold backgroundBlue">Tổ may + thời vụ</td>
        <td></td>
        <td>1197.5 <span class="text-emerald-700"></span></td>
        <td>191<span class="text-emerald-700"></span></td>
        <td>1197.5<span class="text-emerald-700"></span></td>
        <td>71.10<span class="text-emerald-700"></span></td>
      </tr>
      <tr>
        <td class="font-bold backgroundBlue">Đơn vị lẻ</td>
        <td></td>
        <td>293.5<span class="text-emerald-700"></span></td>
        <td>191<span class="text-emerald-700"></span></td>
        <td>293.5 <span class="text-emerald-700"></span></td>
        <td><span class="text-emerald-700">17.51</span></td>
      </tr>

      <tr>
        <td class="font-bold backgroundBlue">Tổng thực tế làm việc</td>
        <td class="font-bold">191<span class="text-rose-700"></span></td>
        <td class="font-bold">191 <span class="text-rose-700"></span></td>
        <td colspan="2" class="font-bold">1501.0</td>
        <td class="font-bold">100</td>
        <td></td>
      </tr>
    </table>
  </div>
</template>
<script></script>
<style scoped>
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
th {
  background-color: #0daeff;
  color: #ffffff;
}
.backgroundBlue {
  background-color: #0daeff;
  color: #ffffff;
}
.btnDay {
  background-color: #0daeff;
  color: #ffffff;
}
@media only screen and (max-width: 600px) {
  table {
    width: 200% !important;
  }
  th {
    background-color: #0daeff;
    color: #ffffff;
  }
}
</style>
