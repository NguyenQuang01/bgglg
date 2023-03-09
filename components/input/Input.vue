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

      <button-submit />
    </b-form>
    <!-- <b-card class="mt-3" header="Form Data Result">
      <pre class="m-0">{{ quantityPeople }}</pre>
    </b-card> -->
  </div>
</template>

<script>
import ButtonSubmit from "../buttonSubmit/ButtonSubmit.vue";
export default {
  components: { ButtonSubmit },
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
      event.preventDefault();
      alert(JSON.stringify(this.quantityPeople));
    },
  },
};
</script>
