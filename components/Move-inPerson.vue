<template lang="">
  <div>
    <table>
      <tr class="textTableTh">
        <th>BẠN ĐƯỢC HỖ TRỢ:</th>
        <th>TỪ ĐƠN VỊ :</th>
      </tr>
      <tr v-for="item in transfer">
        <td>{{ item.transferNum }}</td>
        <td>{{ item.groupId }}</td>
      </tr>
    </table>
  </div>
</template>
<script>
export default {
  props: ["transfer"],
};
</script>
<style>
.textTableTh {
  color: #045396;
  margin-bottom: 20px;
  border-radius: 50px;
}
</style>
