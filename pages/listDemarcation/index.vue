<template lang="">
  <div class="container">
    <div class="text-center mt-16 text-3xl font-bold title2">
      Danh Sách Các Tổ và Định Biên
    </div>
    <div class="text-center mt-2 font-semibold mb-10"></div>
    <div class="max-w-2xl m-auto m-0">
      <div>
        <b-form @submit="onSubmit">
          <div class="flex justify-between items-center">
            <b-row class="with100">
              <b-col cols="12"
                ><b-form-group
                  class="title"
                  id="input-group-1"
                  label="Xóa đơn vị:"
                  label-for="input-1"
                >
                  <a-cascader
                    :options="options"
                    expand-trigger="hover"
                    placeholder="chọn"
                    @change="onChange"
                    class="inputLogin"
                  />
                </b-form-group>
              </b-col>
              <b-col class="flex items-center bttAdd float-right">
                <div>
                  <b-button
                    type="submit"
                    class="add-btn w-full borderRadius px-3"
                    >Xóa</b-button
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
            <th class="title">TÊN TỔ ĐƠN VỊ</th>
            <th class="title">SỐ ĐỊNH BIÊN</th>
            <th class="title">HÀNH ĐỘNG</th>
          </tr>
          <tr>
            <td></td>
            <td>
              <b-form-input
                id="input-1"
                class="inputLogin"
                type="text"
                placeholder="Tìm kiếm"
                v-model="groupName"
                @input="searchName"
              ></b-form-input>
            </td>
            <td></td>
            <td></td>
          </tr>
          <tr v-for="(item, index) in data" :key="index">
            <td class="w-5 text-center title">{{ index + 1 }}</td>
            <td class="w-3/5">
              <b-form-input
                v-model="item.name"
                class="w-full h-8"
                v-if="
                  isEdit &&
                  !(item.id === 1) &&
                  !(item.id === 2) &&
                  !(item.id === 3)
                "
              />
              <div v-else>{{ item.name }}</div>
            </td>
            <td class="w-1/5">
              <b-form-input
                v-model="item.demarcationAvailable"
                class="w-full h-8"
                v-if="isEdit"
              />
              <div v-else>{{ item.demarcationAvailable }}</div>
            </td>
            <td style="text-align: center" class="w-40">
              <div class="flex justify-center">
                <div
                  @click="save(item.name, item.demarcationAvailable, item.id)"
                >
                  <a-tooltip placement="topLeft">
                    <template slot="title">
                      <span>lưu</span>
                    </template>
                    <b-icon
                      variant="success"
                      icon="save"
                      aria-hidden="true"
                      class="h-4 w-4"
                    ></b-icon>
                  </a-tooltip>
                </div>
                <div @click="edit" class="mx-2">
                  <a-tooltip placement="topLeft">
                    <template slot="title">
                      <span>sửa</span>
                    </template>
                    <b-icon
                      variant="warning"
                      icon="pencil-square"
                      aria-hidden="true"
                      class="h-4 w-4"
                    ></b-icon>
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
            :defaultPageSize="50"
            :total="total"
            @showSizeChange="onShowSizeChange"
            @change="onPage"
          >
            <template slot="buildOptionText" slot-scope="props">
              <span>{{ props.value }} / trang</span>
            </template>
          </a-pagination>
          <BtnBack class="float-right mb-10 mt-3 mr-0" />
        </div>
        <!-- <BtnBack class="float-right mb-10 mt-3 mr-0" /> -->
      </div>
    </div>
  </div>
</template>
<script>
import {
  getAllDemarcation,
  updateDemarcation,
  groupRoleRoot,
  deleteGroupRole,
} from "@/api/AuthenConnector.js";
import { message } from "ant-design-vue";
import BtnBack from "@/components/BtnBack.vue";

export default {
  components: ["BtnBack"],
  middleware: "auth",
  data() {
    return {
      deleteGroup: "",
      options: [],
      total: "",
      isEdit: false,
      parts: [],
      parts2: [],
      form: {
        // parentId: "",
        demarcation: "",
        id: "",
      },
      data: [],
      page: {
        current: 1,
        pageSize: 50,
      },
      pageSizeOptions: ["5", "10", "20", "30", "40", "50"],
      groupName: "",
    };
  },

  fetch() {
    this.getvalue();
    this.groupRoleRoot();
  },
  methods: {
    async getvalue() {
      const res = await getAllDemarcation(
        this.groupName,
        this.page.current,
        this.page.pageSize
      );
      if (res) {
        this.total = res?.totalElements;
        this.data = res.content.map((item, index) => ({
          SL: index + 1,
          name: item.groupName || "",
          demarcationAvailable: item.demarcationAvailable || 0,
          id: item.id || "",
        }));
      }
    },
    onChange(value) {
      const lastElement = value[value.length - 1];
      this.deleteGroup = lastElement;
    },
    async onSubmit(event) {
      event.preventDefault();
      const res = await deleteGroupRole(this.deleteGroup);
      if (res) {
        message.success("xóa thành công");
        this.groupRoleRoot();
        this.getvalue();
      }
    },
    async groupRoleRoot() {
      const res = await groupRoleRoot();
      if (res) {
        this.options = res.data;
      }
    },
    searchName() {
      this.getvalue();
    },
    onPage(current) {
      this.page.current = current;
      this.getvalue();
    },
    onShowSizeChange(current, pageSize) {
      this.page.current = current;
      this.page.pageSize = pageSize;
      this.getvalue();
    },
    edit() {
      this.isEdit = !this.isEdit;
    },
    async save(name, demarcationAvailable, id) {
      const res = await updateDemarcation(demarcationAvailable, id, name);
      if (res && res.status === 200) {
        message.success("sửa thành công");
      }
      this.isEdit = !this.isEdit;
    },
    async deletes(id) {
      const res = await deleteEmployee([id]);
      if (res && res.status === 201) {
        message.success("xóa thành công");
        getvalue(page.current, page.pageSize);
      }
    },
  },
};
</script>
<style scoped>
.title2 {
  color: #045396;
}
.width48 {
  width: 48%;
}
.inputLogin {
  border-radius: 50px;
}
.btnLogin {
  background-color: #045396;
  color: #ffff;
  margin-bottom: 20px;
  border-radius: 50px;
  margin-left: 5px;
}
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
  background-color: #eb6e6e;
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
    margin-right: -8px;
    margin-top: 5px;
    float: left;
  }
  .ant-pagination-options {
    margin-left: 0;
  }
}
.ant-pagination-options {
  margin-right: -8px;
}
.ant-cascader-input {
  border-radius: 50px;
}
</style>
