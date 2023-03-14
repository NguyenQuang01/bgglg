<template lang="">
  <div>
    <b-button @click="btnSKip" variant="primary" class="text-blue-700 ml-2"
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
