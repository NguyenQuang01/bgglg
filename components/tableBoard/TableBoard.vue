<template lang="">
  <div>
    <table>
      <tr>
        <th>Bộ phận</th>
        <th>Văn phòng</th>
        <th>XÍ nghiệp</th>
        <th>Lao động báo năng suất</th>
        <th>Số lao động nghỉ</th>
        <th>Tỉ lệ %</th>
        <th>Tổng lao động báo năng suất</th>
        <th>Báo cơm</th>
      </tr>
      <tr>
        <td class="font-bold backgroundBlue">văn phòng</td>
        <td>191</td>
        <td></td>
        <td>191</td>
        <td>3</td>
        <td>11.39</td>
        <td rowspan="3" class="font-bold">1682.0</td>
        <td>190 2 khách 2 khách VIP</td>
      </tr>
      <tr>
        <td class="font-bold backgroundBlue">Đơn vị lẻ</td>
        <td></td>
        <td>293.5</td>
        <td>293.5</td>
        <td></td>
        <td>17.51</td>
        <td></td>
      </tr>
      <tr>
        <td class="font-bold backgroundBlue">Tổ may</td>
        <td></td>
        <td>1197.5</td>
        <td>1197.5</td>
        <td>71.10</td>
        <td>71.10</td>
        <td></td>
      </tr>
      <tr>
        <td class="font-bold backgroundBlue">Học sinh chưa báo năng suất</td>
        <td></td>
        <td>1197.5</td>
        <td>1197.5</td>
        <td>71.10</td>
        <td>71.10</td>
        <td></td>
      </tr>
      <tr>
        <td class="font-bold backgroundBlue">Tổng thực tế làm việc</td>
        <td class="font-bold">191</td>
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
