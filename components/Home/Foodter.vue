<template lang="">
  <div class="bg-white left-0 flex justify-content-end">
    hôm nay: {{ day }}/{{ month }}/{{ year }}
  </div>
</template>
<script>
export default {
  data() {
    return {
      day: new Date().getDate(),
      month: new Date().getMonth() + 1,
      year: new Date().getFullYear(),
    };
  },
};
</script>
<style lang=""></style>
