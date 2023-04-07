<template>
  <div class="container mb-20">
    <div class="text-center my-16 text-3xl font-bold title flex justify-center">
      Setup lý do nghỉ
    </div>
    <div class="text-center mt-2 font-semibold mb-10"></div>
    <div class="max-w-2xl m-auto m-0">
      <div>
        <b-form @submit="onSubmit">
          <div class="flex justify-between items-center">
            <b-row class="w-full">
              <b-col cols="10"
                ><b-form-group
                  id="input-group-1"
                  label="Thêm tài lý do nghỉ:"
                  label-for="input-1"
                >
                  <b-form-input
                    id="input-1"
                    class="borderRadius"
                    v-model="form.name"
                    type="text"
                    placeholder="lý do"
                    required
                  ></b-form-input>
                </b-form-group>
              </b-col>
              <b-col class="flex items-center bttAdd">
                <div>
                  <b-button
                    type="submit"
                    class="add-btn w-full borderRadius px-3"
                    >thêm</b-button
                  >
                </div></b-col
              >
            </b-row>
          </div>
        </b-form>
      </div>
      <div class="mt-6">
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
          <tr class="bg-slate-100">
            <th class="title">STT</th>
            <th class="title">LÝ DO</th>
            <th class="title">HÀNH ĐỘNG</th>
          </tr>
          <tr v-for="(item, index) in data.value" :key="index">
            <td class="w-5 text-center title">{{ index + 1 }}</td>
            <td class="w-2/3">
              <b-form-input
                v-model="item.name"
                class="w-full h-8"
                v-if="isEdit.value"
              />
              <div v-else>{{ item.name }}</div>
            </td>
            <td style="text-align: center" class="w-40">
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
        <BtnBack class="float-right mb-10 mt-3 mr-0" />
      </div>
    </div>
    <div class="mb-10 h-40">*</div>
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
  background-color: #069d72;
  margin-right: 5px;
  padding: 2px 10px;
  border: none;
  border-radius: 20px;
}
.edit {
  background-color: #f2c34a;
  margin: 2px 0;
  margin-right: 5px;
  padding: 2px 8px;
  border: none;
  border-radius: 20px;
}
.delete {
  background-color: #eb6e6e;
  padding: 2px 10px;
  border-radius: 20px;
  border: none;
}
.add-btn {
  background-color: #045396;
  border: none;
}
.title {
  color: #045396;
}
.bttAdd {
  margin-bottom: -13px;
}
.borderRadius {
  border-radius: 50px;
}
</style>
