<template>
  <div class="">
    <b-form @submit="onSubmit">
      <b-form-group id="input-group-2" :label="label.name" label-for="input-2">
        <b-form-input
          id="input-2"
          type="number"
          v-model="quantityPeople"
          :placeholder="label.placeholder"
          required
        ></b-form-input>
      </b-form-group>

      <b-button variant="primary" class="text-blue-700" @click="onSubmit"
        >xác nhận
      </b-button>
    </b-form>
    <!-- <b-card class="mt-3" header="Form Data Result">
      <pre class="m-0">{{ quantityPeople }}</pre>
    </b-card> -->
  </div>
</template>

<script>
export default {
  props: {
    label: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      quantityPeople: "",
    };
  },
  methods: {
    onSubmit(event) {
      this.$router.push("/reasonAbsent");
    },
  },
};
</script>
