<template>
  <div class="container mb-20">
    <div class="text-center mt-16 text-3xl font-bold title">Welcome back!</div>
    <div class="text-center mt-2 font-semibold mb-10"></div>
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
            <b-button type="submit" class="add-btn">thêm</b-button>
            <!-- <b-button
              variant="danger"
              class="text-rose-700 mx-2"
              @click="deletes"
              >xóa</b-button
            >
            <b-button
              variant="warning"
              class="text-yellow-700 mx-2"
              @click="edit"
              >sửa</b-button
            > -->
          </div>
        </b-form>
      </div>
      <div>
        <!-- <a-table
          class="mb-10"
          :row-selection="{
            selectedRowKeys: selectedRowKeys,
            onChange: onSelectChange,
          }"
          :columns="columns"
          :data-source="data.value"
        /> -->
        <!-- <b-table striped :items="data.value"></b-table> -->
        <table id="customers">
          <tr>
            <th>Sl</th>
            <th>Lý do</th>
            <th></th>
          </tr>
          <tr v-for="(item, index) in data.value" :key="index">
            <td>{{ index + 1 }}</td>
            <td class="w-40">
              <b-form-input
                v-model="item.name"
                class="w-full h-8"
                v-if="isEdit.value"
              />
              <div v-else>{{ item.name }}</div>
            </td>
            <td style="text-align: center">
              <div>
                <b-button class="save" @click="save(item.name, item.id)"
                  >lưu</b-button
                >
                <b-button class="edit" @click="edit">sửa</b-button
                ><b-button class="delete" @click="deletes(item.id)"
                  >xóa</b-button
                >
              </div>
            </td>
          </tr>
        </table>
      </div>
    </div>
    <div class="py-10"></div>
  </div>
</template>
<script>
import {
  reason,
  deleteLeave,
  addLeave,
  editLeave,
} from "@/api/AuthenConnector.js";
import {
  useRoute,
  computed,
  defineComponent,
  onMounted,
  reactive,
  toRefs,
} from "vue";
// const columns = ;
import { message } from "ant-design-vue";

export default defineComponent({
  middleware: "auth",
  setup() {
    const isEdit = reactive({ value: false });
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
      // console.log(
      //   "selectedRowKeys changed: ",
      //   (idItem.value = selectedRowKeys)
      // );
      state.selectedRowKeys = selectedRowKeys;
    };
    const getvalue = async () => {
      const res = await reason();
      data.value = res.data.map((item, index) => ({
        SL: index + 1,
        name: item.name,
        id: item.id,
      }));
    };
    const deletes = async (id) => {
      const res = await deleteLeave(id);
      if (res && res.code === 200) {
        message.success("xóa thành công");
        getvalue();
      }
    };
    const onSubmit = async (event) => {
      event.preventDefault();
      const res = await addLeave([{ name: form.name }]);
      if (res && res.code === 201) {
        form.name = "";
        message.success("thêm thành công");
        getvalue();
      }
    };
    const edit = () => {
      isEdit.value = !isEdit.value;
    };
    const save = async (name, id) => {
      const res = await editLeave(name, id);
      if (res.code === 200 && res) {
        message.success("sửa thành công");
      }
      isEdit.value = !isEdit.value;
    };
    onMounted(() => {
      getvalue();
    });
    return {
      isEdit,
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
      save,
    };
  },
});
</script>
<style scoped>
.save {
  background-color: rgba(0, 201, 0, 0.8);
  margin-right: 5px;
  padding: 2px 7px;
  border: none;
}
.edit {
  background-color: rgba(201, 198, 0, 0.8);
  margin-right: 5px;
  padding: 2px 5px;
  border: none;
}
.delete {
  background-color: rgba(201, 74, 0, 0.8);
  padding: 2px 8px;
  border: none;
}
.add-btn {
  background-color: #1890ff;
  border: none;
}
</style>
