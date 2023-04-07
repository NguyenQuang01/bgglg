<template lang="">
  <div>
    <b-button @click="btnSKip" variant="primary" class="textBack mx-2 mb-2"
      >bỏ qua
    </b-button>
  </div>
</template>
<script>
export default {
  props: ["skip"],
  methods: {
    btnSKip() {
      this.$router.push(`${this.skip}`);
    },
  },
};
</script>
<style scoped>
.textBack {
  color: #045396;
  border-color: #045396;
  border-radius: 50px;
}
.btn:hover {
  color: #ffff;
}
</style>
