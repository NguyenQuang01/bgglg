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
                  <b-col cols="6"
                    ><b-form-group
                      id="input-group-1"
                      label="Chọn tổ đơn vị:"
                      label-for="input-1"
                    >
                      <a-cascader
                        :options="options.value"
                        expand-trigger="hover"
                        placeholder="chọn"
                        @change="onChange"
                        class="inputLogin"
                      /> </b-form-group
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
            <th class="title">Tổ</th>
            <th class="title">Hành Động</th>
          </tr>
          <tr>
            <td></td>
            <td>
              <b-form-input
                id="input-1"
                class="inputLogin"
                type="text"
                placeholder="Tìm kiếm"
                v-model="search.employeeName"
                @input="searchName"
              ></b-form-input>
            </td>
            <td>
              <b-form-input
                id="input-1"
                class="inputLogin"
                type="text"
                placeholder="Tìm kiếm"
                v-model="search.laborCode"
                @input="searchCode"
              ></b-form-input>
            </td>
            <td>
              <!-- <b-form-input
                id="input-1"
                class="h-7"
                type="text"
                placeholder="Nhập"
                v-model="search.groupId"
                @input="searchGroup"
              ></b-form-input> -->
              <a-cascader
                :options="options.value"
                expand-trigger="hover"
                placeholder="Tìm kiếm"
                @change="onChangeSearch"
              />
            </td>
            <td></td>
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
            <td class="w-1/5">
              <b-form-input
                v-model="item.groupName"
                class="w-full h-8"
                v-if="isEdit.value"
              />
              <div v-else>{{ item.groupName }}</div>
            </td>
            <td style="text-align: center">
              <div class="flex justify-center">
                <div @click="save(item.name, item.id, item.laborCode)">
                  <a-tooltip placement="topLeft">
                    <template slot="title">
                      <span>lưu</span>
                    </template>
                    <b-icon icon="save" aria-hidden="true"></b-icon>
                  </a-tooltip>
                </div>
                <div @click="edit" class="mx-2">
                  <a-tooltip placement="topLeft">
                    <template slot="title">
                      <span>sửa</span>
                    </template>
                    <b-icon icon="pencil-square" aria-hidden="true"></b-icon>
                  </a-tooltip>
                </div>
                <div @click="deletes(item.id)">
                  <a-tooltip placement="topLeft">
                    <template slot="title">
                      <span>xóa</span>
                    </template>
                    <b-icon icon="trash" aria-hidden="true"></b-icon>
                  </a-tooltip>
                </div>
              </div>
            </td>
          </tr>
        </table>
        <div class="my-2 float-right">
          <a-pagination
            show-size-changer
            :page-size-options="pageSizeOptions"
            :total="data.total"
            @showSizeChange="onShowSizeChange"
            @change="onPage"
          >
            <template slot="buildOptionText" slot-scope="props">
              <span>{{ props.value }} / trang</span>
            </template>
          </a-pagination>
          <BtnBack class="float-right mb-10 mt-3 mr-0" />
        </div>
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
  groupRoleRoot,
} from "@/api/AuthenConnector.js";
import { defineComponent, onMounted, reactive, toRefs, watch } from "vue";
// const columns = ;
import { message } from "ant-design-vue";

export default defineComponent({
  //   middleware: "auth",
  setup() {
    const isEdit = reactive({ value: false });
    const options = reactive({ value: [] });
    const search = reactive({ employeeName: "", laborCode: "", groupId: "" });
    const form = reactive({
      name: "",
      laborCode: "",
      groupName: "",
      groupId: "",
    });
    const page = reactive({
      current: 1,
      pageSize: 10,
    });
    const pageSizeOptions = reactive(["10", "20", "30", "40", "50"]);
    const columns = reactive([
      {
        title: "lý do nghỉ",
        dataIndex: "name",
      },
    ]);
    const data = reactive({
      value: [],
      total: 0,
    });
    const state = reactive({
      selectedRowKeys: [],
      // Check here to configure the default column
      loading: false,
    });
    const onShowSizeChange = (current, pageSize) => {
      page.current = current;
      page.pageSize = pageSize;
      getvalue(page.current, page.pageSize);
    };
    const onPage = (current) => {
      page.current = current;
      getvalue(page.current, page.pageSize);
    };
    const onSelectChange = (selectedRowKeys) => {
      state.selectedRowKeys = selectedRowKeys;
    };
    const getvalue = async (current, pageSize) => {
      const payload = search;
      const res = await getAllEmployee(current, pageSize, payload);
      console.log(res, 999);
      if (res && res.code === 201) {
        data.total = res.data.totalElements;
        data.value = res.data.content.map((item, index) => ({
          SL: index + 1,
          name: item.employeeName,
          laborCode: item.laborCode,
          id: item.employeeId,
          groupName: item.groupName,
        }));
      }
    };
    const deletes = async (id) => {
      const res = await deleteEmployee([id]);
      if (res && res.status === 201) {
        message.success("xóa thành công");
        getvalue(page.current, page.pageSize);
      }
    };
    const onSubmit = async (event) => {
      event.preventDefault();
      const res = await addEmployee([
        {
          groupId: form.groupId,
          laborCode: form.laborCode,
          name: form.name,
        },
      ]);
      if (res && res.status === 201) {
        form.name = "";
        form.laborCode = "";
        message.success("thêm thành công");
        getvalue(page.current, page.pageSize);
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
    const groupRoleRoot1 = async () => {
      const res = await groupRoleRoot();
      if (res) {
        options.value = res.data;
      }
    };
    const onChange = (value) => {
      const lastElement = value[value.length - 1];
      form.groupId = lastElement;
    };
    const onChangeSearch = (value) => {
      const lastElement = value[value.length - 1];
      search.groupId = lastElement;
      searchGroup();
    };
    const searchName = async () => {
      getvalue(page.current, page.pageSize, search);
    };
    const searchCode = async () => {
      getvalue(page.current, page.pageSize, search);
    };
    const searchGroup = async () => {
      getvalue(page.current, page.pageSize, search);
    };
    onMounted(() => {
      getvalue(page.current, page.pageSize);
      groupRoleRoot1();
    });

    return {
      page,
      isEdit,
      form,
      getvalue,
      data,
      columns,
      options,
      search,
      pageSizeOptions,
      ...toRefs(state),
      onSelectChange,
      onPage,
      onSubmit,
      deletes,
      edit,
      save,
      onShowSizeChange,
      onChange,
      onChangeSearch,
      groupRoleRoot1,
      searchName,
      searchCode,
      searchGroup,
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
.inputLogin {
  border-radius: 50px;
  height: 32px;
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
<style>
@media only screen and (max-width: 576px) {
  .ant-pagination-options {
    display: block;
    margin: 5px 0;
    margin-right: -8px;
  }
}
.ant-pagination-options {
  margin-right: -8px;
}
</style>
