<template>
  <div>
    <img
      src="@/assets/imge/background.jpg"
      alt=""
      srcset=""
      class="w-full rounded-b-lg avatar"
    />
    <div class="container">
      <div
        class="text-center mt-5 text-3xl font-bold title flex justify-center hidden2"
      >
        <img src="@/assets/imge/bgglg.jpg" alt="" srcset="" class="w-32 mr-2" />
      </div>
      <div
        class="text-center mt-16 text-3xl font-bold title flex justify-center flex items-center textOff hidden2"
      >
        Lạng Giang
      </div>
      <div class="text-center mt-2 font-semibold mb-10 hidden2">
        HỆ THỐNG BÁO CÁO LAO ĐỘNG
      </div>
      <div class="text-center mt-16 font-semibold mb-10 my-10 h-32">
        <b-button
          variant="primary"
          class="menuBtn rounded-full btnLogin px-5 button"
          @click="page"
          >Bắt đầu</b-button
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: "empty",
  name: "Index",
  methods: {
    page() {
      this.$router.push("/login");
    },
  },
};
</script>
<style scoped>
.title {
  color: #045396;
}
.avatar {
  border-radius: 0 0 50px 50px;
}
.menuBtn {
  background-color: #045396;
}
.button {
  min-width: 150px;
  min-height: 50px;
  font-family: "Nunito", sans-serif;
  font-size: 14px;
  text-transform: uppercase;
  letter-spacing: 1.3px;
  font-weight: 700;
  color: #f1f1f1;
  background: #045396;
  background: linear-gradient(90deg, #045396 0%, #d61a1f 100%);
  border: none;
  border-radius: 1000px;
  box-shadow: 12px 12px 24px #045396;
  transition: all 0.3s ease-in-out 0s;
  cursor: pointer;
  outline: none;
  position: relative;
  padding: 10px;
}

button::before {
  content: "";
  border-radius: 1000px;
  min-width: calc(300px + 12px);
  min-height: calc(60px + 12px);
  /* border: 6px solid #045396; */
  /* box-shadow: 0 0 60px #045396; */
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  opacity: 0;
  transition: all 0.3s ease-in-out 0s;
}

.button:hover,
.button:focus {
  color: #ffffff;
  transform: translateY(-6px);
}

button:hover::before,
button:focus::before {
  opacity: 1;
}

button::after {
  content: "";
  width: 30px;
  height: 30px;
  border-radius: 100%;
  border: 6px solid #045396;
  position: absolute;
  z-index: -1;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  animation: ring 1.5s infinite;
}

button:hover::after,
button:focus::after {
  animation: none;
  display: none;
}

@keyframes ring {
  0% {
    width: 30px;
    height: 30px;
    opacity: 1;
  }
  100% {
    width: 300px;
    /* height: 300px; */
    opacity: 0;
  }
}

@media only screen and (min-width: 1024px) {
  .container {
    position: absolute;
    top: 41%;

    margin-left: auto;
    margin-right: auto;
    right: 0;
    left: 0;
    text-align: center;
  }
  .textOff {
    color: #045396;
  }
  .avatar {
    position: fixed;
    /* visibility: hidden2; */
  }
  .hidden2 {
    visibility: hidden;
  }
  .container {
    margin-top: 40px;
  }
}
</style>
