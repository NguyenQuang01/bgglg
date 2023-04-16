<template lang="">
  <div class="container">
    <TitleScreen />

    <div class="max-w-sm m-auto m-0">
      <FormReasonAbsent />
    </div>
  </div>
</template>
<script>
import Input from "@/components/input/Input.vue";
import TitleScreen from "@/components/titleScreen/TitleScreen.vue";
import FormReasonAbsent from "@/components/formReasonAbsent/FormReasonAbsent.vue";
import BtnBack from "@/components/BtnBack.vue";

export default {
  // middleware: "auth",
  components: {
    Input,
    TitleScreen,
    FormReasonAbsent,
    BtnBack,
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
