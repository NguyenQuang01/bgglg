<template>
  <div class="container mb-20">
    <div class="text-center my-16 text-3xl font-bold title flex justify-center">
      Quản lý danh sách nhân viên
    </div>
    <div class="text-center mt-2 font-semibold mb-10"></div>
    <div class="max-w-2xl m-auto m-0">
      <div>
        <b-form @submit="onSubmit">
          <div class="flex justify-between items-center">
            <b-row class="with100">
              <b-col cols="12">
                <b-row>
                  <b-col cols="6">
                    <b-form-group
                      id="input-group-1"
                      label="Tên nhân viên mới:"
                      label-for="input-1"
                    >
                      <b-form-input
                        id="input-1"
                        class="borderRadius"
                        v-model="form.name"
                        type="text"
                        placeholder="Nhập"
                        required
                      ></b-form-input> </b-form-group
                  ></b-col>
                  <b-col cols="6"
                    ><b-form-group
                      id="input-group-1"
                      label="Mã nhân viên mới:"
                      label-for="input-1"
                    >
                      <b-form-input
                        id="input-1"
                        class="borderRadius"
                        v-model="form.laborCode"
                        type="text"
                        placeholder="Nhập"
                        required
                      ></b-form-input> </b-form-group
                  ></b-col>
                </b-row>
              </b-col>
              <b-col class="flex items-center bttAdd float-right">
                <div>
                  <b-button
                    type="submit"
                    class="add-btn w-full borderRadius px-3"
                    >Thêm</b-button
                  >
                </div></b-col
              >
            </b-row>
          </div>
        </b-form>
      </div>
      <div class="mt-6">
        <table id="customers " class="w-full">
          <tr class="bg-slate-100">
            <th class="title">STT</th>
            <th class="title">Tên Nhân Viên</th>
            <th class="title">Mã nhân viên</th>
            <th class="title">HÀNH ĐỘNG</th>
          </tr>
          <tr v-for="(item, index) in data.value" :key="index">
            <td class="w-5 text-center title">{{ index + 1 }}</td>
            <td class="w-2/5">
              <b-form-input
                v-model="item.name"
                class="w-full h-8"
                v-if="isEdit.value"
              />
              <div v-else>{{ item.name }}</div>
            </td>
            <td class="w-1/5">
              <b-form-input
                v-model="item.laborCode"
                class="w-full h-8"
                v-if="isEdit.value"
              />
              <div v-else>{{ item.laborCode }}</div>
            </td>
            <td style="text-align: center" class="w-40">
              <div>
                <b-button
                  class="save"
                  @click="save(item.name, item.id, item.laborCode)"
                  >Lưu</b-button
                >
                <b-button class="edit" @click="edit">Sửa</b-button
                ><b-button class="delete" @click="deletes(item.id)"
                  >Xóa</b-button
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
  addEmployee,
  getAllEmployee,
  deleteEmployee,
  editEmployee,
} from "@/api/AuthenConnector.js";
import { defineComponent, onMounted, reactive, toRefs } from "vue";
// const columns = ;
import { message } from "ant-design-vue";

export default defineComponent({
  //   middleware: "auth",
  setup() {
    const isEdit = reactive({ value: false });
    const form = reactive({
      name: "",
      laborCode: "",
    });

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
      state.selectedRowKeys = selectedRowKeys;
    };
    const getvalue = async () => {
      const groupId = localStorage.getItem("groupId");
      const res = await getAllEmployee(groupId);
      console.log(res, 999);
      if (res && res.code === 201) {
        data.value = res.data.map((item, index) => ({
          SL: index + 1,
          name: item.employeeName,
          laborCode: item.laborCode,
          id: item.employeeId,
        }));
      }
    };
    const deletes = async (id) => {
      const res = await deleteEmployee([id]);
      if (res && res.status === 201) {
        message.success("xóa thành công");
        getvalue();
      }
    };
    const onSubmit = async (event) => {
      event.preventDefault();
      const res = await addEmployee([
        {
          groupId: localStorage.getItem("groupId"),
          laborCode: form.laborCode,
          name: form.name,
        },
      ]);
      if (res && res.status === 201) {
        form.name = "";
        form.laborCode = "";
        message.success("thêm thành công");
        getvalue();
      }
    };
    const edit = () => {
      isEdit.value = !isEdit.value;
    };
    const save = async (name, id, laborCode) => {
      const res = await editEmployee([
        {
          groupId: localStorage.getItem("groupId"),
          laborCode: laborCode,
          name: name,
          id: id,
        },
      ]);
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
td,
th {
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
}
.with100 {
  width: 104%;
}
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
.wFull {
  width: 100% !important;
}
</style>
