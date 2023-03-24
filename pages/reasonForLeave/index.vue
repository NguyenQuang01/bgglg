<template>
  <div class="container mb-20">
    <div class="text-center mt-16 text-3xl font-bold title">Welcome back!</div>
    <div class="text-center mt-2 font-semibold mb-10">
      Xin hãy đăng nhập vào tài khoản của bạn.
    </div>
    <div class="max-w-2xl m-auto m-0">
      <div>
        <b-form @submit="onSubmit">
          <b-form-group
            id="input-group-1"
            label="Thêm tài lý do nghỉ:"
            label-for="input-1"
          >
            <b-form-input
              id="input-1"
              v-model="form.name"
              type="text"
              placeholder="lý do"
              required
            ></b-form-input>
          </b-form-group>

          <div class="mb-2 flex">
            <b-button type="submit" variant="primary text-black "
              >thêm</b-button
            >
            <b-button variant="danger" class="text-black mx-2" @click="deletes"
              >xóa</b-button
            >
            <b-button variant="danger" class="text-black mx-2" @click="edit"
              >sửa</b-button
            >
          </div>
        </b-form>
      </div>
      <div>
        <a-table
          class="mb-10"
          :row-selection="{
            selectedRowKeys: selectedRowKeys,
            onChange: onSelectChange,
          }"
          :columns="columns"
          :data-source="data.value"
        />
      </div>
    </div>
    <div></div>
  </div>
</template>
<script>
import { reason, deleteLeave, addLeave } from "@/api/AuthenConnector.js";
import {
  useRoute,
  computed,
  defineComponent,
  onMounted,
  reactive,
  toRefs,
} from "vue";
// const columns = ;

export default defineComponent({
  setup() {
    const form = reactive({
      name: "",
    });
    const idItem = reactive([
      {
        value: "",
      },
    ]);
    const columns = reactive([
      {
        title: "lý do nghỉ",
        dataIndex: "name",
      },
    ]);
    const data = reactive({
      value: [],
    });
    const state = reactive({
      selectedRowKeys: [],
      // Check here to configure the default column
      loading: false,
    });

    const onSelectChange = (selectedRowKeys) => {
      console.log(
        "selectedRowKeys changed: ",
        (idItem.value = selectedRowKeys)
      );
      state.selectedRowKeys = selectedRowKeys;
    };
    const getvalue = async () => {
      const res = await reason();
      data.value = res.data.map((item) => ({ key: item.id, name: item.name }));
    };
    getvalue();
    const deletes = async () => {
      const res = await deleteLeave(idItem.value);
      console.log(res);
    };
    const onSubmit = async (event) => {
      event.preventDefault();
      const res = await addLeave([{ name: form.name }]);
      console.log(res);
    };
    const edit = () => {
      window.location.href = `/reasonForLeave/${idItem.value}`;
    };
    onMounted(() => {
      getvalue();
    });
    return {
      form,
      getvalue,
      data,
      columns,
      idItem,
      ...toRefs(state),
      onSelectChange,
      onSubmit,
      deletes,
      edit,
    };
  },
});
</script>
