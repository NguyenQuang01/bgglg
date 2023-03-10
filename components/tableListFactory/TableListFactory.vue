<template>
  <table class="mb-10">
    <tr>
      <th>Tên nhà máy</th>
      <th class="w-32">Xem thông tin</th>
    </tr>
    <tr>
      <td>xưởng 1</td>
      <td style="text-align: center">
        <a-button @click="handlerBtn" type="primary" size="small"
          >chi tiết</a-button
        >
      </td>
    </tr>
    <tr>
      <td>xưởng 1</td>
      <td style="text-align: center">
        <a-button type="primary" @click="handlerBtn" size="small"
          >chi tiết</a-button
        >
      </td>
    </tr>
    <tr>
      <td>xưởng 1</td>
      <td style="text-align: center">
        <a-button type="primary" @click="handlerBtn" size="small"
          >chi tiết</a-button
        >
      </td>
    </tr>
    <tr>
      <td>xưởng 1</td>
      <td style="text-align: center">
        <a-button type="primary" @click="handlerBtn" size="small"
          >chi tiết</a-button
        >
      </td>
    </tr>
    <tr>
      <td>xưởng 1</td>
      <td style="text-align: center">
        <a-button type="primary" @click="handlerBtn" size="small"
          >chi tiết</a-button
        >
      </td>
    </tr>
    <tr>
      <td>xưởng 1</td>
      <td style="text-align: center">
        <a-button type="primary" @click="handlerBtn" size="small"
          >chi tiết</a-button
        >
      </td>
    </tr>
  </table>
</template>
<script>
export default {
  data() {
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
  methods: {
    handlerBtn() {
      this.$router.push("/reportInformation");
    },
  },
};
</script>
<style scoped>
table {
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 100%;
}

td,
th {
  border: 1px solid #b6b6b6;
  text-align: left;
  padding: 8px;
}

tr:nth-child(even) {
  background-color: #dddddd;
}
</style>
