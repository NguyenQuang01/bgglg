<template lang="">
  <div class="container">
    <TitleScreen />

    <div class="max-w-2xl m-auto m-0">
      <b-button   @click="$router.back()"  class="text-blue-500 border-none"
          ><b-icon icon="arrow-bar-left" aria-hidden="true"></b-icon>trở lại</a
        ></b-button>
      <FormReasonAbsent />
    </div>
  </div>
</template>
<script>
import Input from "@/components/input/Input.vue";
import TitleScreen from "@/components/titleScreen/TitleScreen.vue";
import FormReasonAbsent from "@/components/formReasonAbsent/FormReasonAbsent.vue";

export default {
  components: {
    Input,
    TitleScreen,
    FormReasonAbsent,
  },
  data() {
    return {
      label: {
        name: "Nhập số lao động nghỉ :",
        placeholder: "số lao động nghỉ",
      },
    };
  },
};
</script>
<style scoped></style>
