<template lang="">
  <div class="container">
    <div class="text-center mt-16 text-3xl font-bold title2">
      Danh Sách Tài Khoản
    </div>
    <div class="text-center mt-2 font-semibold mb-10"></div>
    <div class="max-w-2xl m-auto m-0">
      <div class="mt-6">
        <table id="customers " class="w-full">
          <tr class="bg-slate-100">
            <th class="title">STT</th>
            <th class="title">TÀI KHOẢN</th>
            <th class="title">MẬT KHẨU</th>
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
                v-model="userName"
                @input="searchName"
              ></b-form-input>
            </td>
            <td></td>
            <td></td>
          </tr>
          <tr v-for="(item, index) in data" :key="index">
            <td class="w-5 text-center title">{{ index + 1 }}</td>
            <td class="w-3/5">
              <div>{{ item.name }}</div>
            </td>
            <td class="w-1/5">
              <b-form-input
                v-model="item.password"
                class="w-full h-8"
                v-if="isEdit"
              />
              <div v-else>*******</div>
            </td>
            <td style="text-align: center" class="w-40">
              <div class="flex justify-center">
                <div @click="save(item.id, item.password)">
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
                <a-popconfirm
                  placement="topRight"
                  ok-text="Có"
                  cancel-text="Không"
                  @confirm="confirm(item.id)"
                >
                  <template slot="title">
                    <p>{{ textDelete }}</p>
                  </template>
                  <!-- <div @click="deletes(item.id)"> -->
                  <b-icon
                    variant="danger"
                    icon="trash"
                    aria-hidden="true"
                    class="h-4 w-4"
                  ></b-icon>
                  <!-- </div> -->
                </a-popconfirm>
              </div>
            </td>
          </tr>
        </table>
        <div class="my-2 float-right">
          <a-pagination
            show-size-changer
            :page-size-options="pageSizeOptions"
            :defaultPageSize="5"
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
import { getAllAcc, deleteAcc, updateAcc } from "@/api/AuthenConnector.js";
import { message } from "ant-design-vue";
import BtnBack from "@/components/BtnBack.vue";

export default {
  components: ["BtnBack"],
  middleware: "auth",
  data() {
    return {
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
        pageSize: 5,
      },
      pageSizeOptions: ["5", "10", "20", "30", "40", "50"],
      search: { employeeName: "", laborCode: "", groupId: "" },
      textDelete: "Bạn có chắc chắn xóa ",
      userName: "",
    };
  },

  fetch() {
    this.getvalue();
  },
  methods: {
    async getvalue() {
      const res = await getAllAcc(this.page.current, this.page.pageSize, {
        userName: this.userName,
      });
      if (res) {
        this.total = res.totalElements;
        this.data = res.content.map((item, index) => ({
          SL: index + 1,
          name: item.userName || "",
          password: item.password || 0,
          id: item.userId || "",
        }));
      }
    },
    searchName() {
      this.getvalue();
    },
    confirm(id) {
      this.deletes(id);
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
      this.data.map((item) => (item.password = ""));
    },
    async save(id, password) {
      const res = await updateAcc(id, password);
      if (res.code === 200 && res) {
        message.success("sửa thành công");
      }
      this.isEdit = !this.isEdit;
    },
    async deletes(id) {
      const res = await deleteAcc(id);
      if (res && res.status === 200) {
        message.success("xóa thành công");
        this.getvalue();
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
</style>
