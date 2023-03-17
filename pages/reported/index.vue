<template lang="">
  <div class="container">
    <div class="text-center mt-16 text-3xl font-bold title mb-16">Báo cáo</div>

    <div class="max-w-2xl m-auto m-0">
      <!-- <b-button @click="$router.back()" class="text-blue-500 border-none"
        ><b-icon icon="arrow-bar-left" aria-hidden="true"></b-icon>trở lại
        ></b-button
      > -->
      <div
        class="flex justify-center text-xl border-dotted border-2 border-blue-700 p-3 mb-5"
      >
        Xin chào (tên tài khoản) <br />- bạn đã báo cáo lao động cho ngày hôm
        nay, xin cảm ơn
      </div>
      <div class="flex">
        <b-button variant="primary" class="text-blue-700"
          >Xem lại lịch sử báo cáo
        </b-button>
        <b-button variant="primary" class="text-blue-700 ml-2"
          >Sửa báo cáo
        </b-button>
      </div>
    </div>
  </div>
</template>
<script>
import TitleScreen from "@/components/titleScreen/TitleScreen.vue";

export default {
  components: {
    TitleScreen,
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
