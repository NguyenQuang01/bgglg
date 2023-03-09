<template lang="">
  <div>hôm nay: {{ day }}/{{ month }}/{{ year }}</div>
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
