<template>
  <div class="">
    <b-form @submit="onSubmit">
      <b-form-group id="input-group-2" :label="label.name" label-for="input-2">
        <b-form-input
          required
          type="number"
          v-model="quantityPeople"
          :placeholder="label.placeholder"
        ></b-form-input>
      </b-form-group>
      <div class="flex">
        <b-button variant="primary" class="text-blue-700" @click="onSubmit"
          >xác nhận
        </b-button>
        <BtnSkip :skip="skip" />
      </div>
    </b-form>
    <!-- <b-card class="mt-3" header="Form Data Result">
      <pre class="m-0">{{ quantityPeople }}</pre>
    </b-card> -->
  </div>
</template>
<script>
import { mapMutations } from "vuex";
import BtnSkip from "@/components/buttonSkip";

export default {
  components: {
    BtnSkip,
  },
  props: {
    label: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      quantityPeople: "",
      skip: "/reasonAbsent",
    };
  },

  methods: {
    ...mapMutations({
      SET_STATE_LABOR: "SET_STATE_LABOR",
    }),
    onSubmit(event) {
      event.preventDefault();
      this.SET_STATE_LABOR(this.quantityPeople);
      this.$router.push("/reasonAbsent");
    },
  },
};
</script>
