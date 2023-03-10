<template lang="">
  <div class="container">
    <div class="text-center mt-16 text-3xl font-bold title mb-16">
      Danh sách các nhà xưởng
    </div>

    <div class="max-w-2xl m-auto m-0">
      <TableListFactory />
    </div>
  </div>
</template>
<script>
import TableListFactory from "@/components/tableListFactory/TableListFactory.vue";
export default {
  components: {
    TableListFactory,
  },
};
</script>
<style scoped>
.title {
  color: #0daeff;
}
</style>
