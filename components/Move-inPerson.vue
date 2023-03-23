<template lang="">
  <div>
    <table>
      <tr>
        <th>Bạn được hỗ trợ:</th>
        <th>Từ đơn vị:</th>
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
<style lang=""></style>
