<template lang="">
  <div class="bg-white left-0 flex justify-content-end">
    hôm nay:{{ infDay }}
  </div>
</template>
<script>
export default {
  data() {
    return {
      day: new Date().getDate(),
      month: new Date().getMonth() + 1,
      year: new Date().getFullYear(),
      infDay: "",
    };
  },
  created() {
    const day = `${this.year}/${this.month}/${this.day}`;
    this.infDay = day;
    // localStorage.setItem("day", day);
  },
  methods: {
    getday() {},
  },
};
</script>
<style lang=""></style>
