<template>
  <div class="container">
    <div class="text-center mt-16 text-3xl font-bold title">Welcome back!</div>
    <div class="text-center mt-2 font-semibold mb-10">
      Xin hãy đăng nhập vào tài khoản của bạn.
    </div>
    <div class="max-w-2xl m-auto m-0">
      <div>
        <a-table
          :row-selection="{
            selectedRowKeys: selectedRowKeys,
            onChange: onSelectChange,
          }"
          :columns="columns"
          :data-source="data"
        />
      </div>
    </div>
  </div>
</template>
<script>
import { computed, defineComponent, reactive, toRefs } from "vue";
const columns = [
  {
    title: "lý do nghỉ",
    dataIndex: "name",
  },
];
const data = [
  { key: 1, name: "quang" },
  { key: 2, name: "quang" },
];

export default defineComponent({
  setup() {
    const state = reactive({
      selectedRowKeys: [],
      // Check here to configure the default column
      loading: false,
    });

    const onSelectChange = (selectedRowKeys) => {
      console.log("selectedRowKeys changed: ", selectedRowKeys);
      state.selectedRowKeys = selectedRowKeys;
    };

    return {
      data,
      columns,
      ...toRefs(state),
      onSelectChange,
    };
  },
});
</script>
