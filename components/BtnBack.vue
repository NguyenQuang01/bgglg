<template lang="">
  <b-button
    @click="$router.back()"
    variant="primary"
    class="textBack text-sm mr-2"
    ><b-icon icon="arrow-bar-left" aria-hidden="true"></b-icon>trở lại</b-button
  >
</template>
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
