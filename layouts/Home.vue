<template lang="">
  <div>
    <Header />
    <Nuxt />
    <Foodter class="fixed bottom-0 right-0 mr-2 py-1" />
  </div>
</template>
<script>
import Header from "@/components/Home/Header.vue";
import Foodter from "@/components/Home/Foodter.vue";

export default {
  components: {
    Header,
    Foodter,
  },
};
</script>
<style lang=""></style>
