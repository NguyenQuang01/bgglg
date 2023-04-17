<template lang="">
  <div class="container">
    <div class="text-center mt-16 text-3xl font-bold title2">Định Biên</div>
    <div class="text-center mt-2 font-semibold mb-10"></div>
    <div class="max-w-sm m-auto m-0">
      <b-form @submit="onSubmit">
        <b-form-group
          id="input-group-2"
          label="SỐ định biên theo tổ:"
          label-for="input-2"
        >
          <b-form-input
            v-model="form.demarcation"
            placeholder="Nhập "
            required
            class="inputLogin"
            type="number"
          ></b-form-input>
          <b-form-group id="input-group-3" label="Chọn tổ:" label-for="input-3">
            <a-cascader
              :options="parts"
              expand-trigger="hover"
              placeholder="chọn"
              @change="onChange"
            />
          </b-form-group>
        </b-form-group>

        <div class="flex float-right">
          <BtnBack class="h-10" />
          <b-button type="submit" class="btnLogin mb-24">Xác nhận</b-button>
        </div>
      </b-form>
      <div class="mt-6">
        <table id="customers " class="w-full">
          <tr class="bg-slate-100">
            <th class="title">STT</th>
            <th class="title">LÝ DO</th>
            <th class="title">HÀNH ĐỘNG</th>
          </tr>
          <tr v-for="(item, index) in data" :key="index">
            <td class="w-5 text-center title">{{ index + 1 }}</td>
            <td class="w-3/5">
              <b-form-input
                v-model="item.name"
                class="w-full h-8"
                v-if="isEdit.value"
              />
              <div v-else>{{ item.name }}</div>
            </td>
            <td style="text-align: center" class="w-40">
              <div class="flex justify-center">
                <div @click="save(item.name, item.id)">
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
                <div @click="deletes(item.id)">
                  <a-tooltip placement="topLeft">
                    <template slot="title">
                      <!-- <span>xóa</span> -->
                    </template>
                    <b-icon
                      variant="danger"
                      icon="trash"
                      aria-hidden="true"
                      class="h-4 w-4"
                    ></b-icon>
                  </a-tooltip>
                </div>
              </div>
            </td>
          </tr>
        </table>
        <BtnBack class="float-right mb-10 mt-3 mr-0" />
      </div>
    </div>
  </div>
</template>
<script>
import {
  groupRoleRoot,
  groupRoleDetails,
  updateDemarcation,
  getDemarcation,
  getAllEmployee,
} from "@/api/AuthenConnector.js";
import { message } from "ant-design-vue";
import BtnBack from "@/components/BtnBack.vue";

export default {
  components: ["BtnBack"],
  // middleware: "auth",
  data() {
    return {
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

      search: { employeeName: "", laborCode: "", groupId: "" },
    };
  },

  fetch() {
    this.groupRoleRoot();
    this.getvalue();
  },
  methods: {
    onChange(value) {
      const lastElement = value[value.length - 1];

      this.form.id = lastElement;
    },
    async groupRoleRoot() {
      const res = await groupRoleRoot();
      this.parts = res.data;
    },
    async groupRoleDetails(param) {
      const res = await groupRoleDetails(param);
      this.parts2 = res.map((item) => ({
        text: item.id,
        value: item.id,
      }));
    },
    async onSubmit(event) {
      event.preventDefault();

      const res = await updateDemarcation(this.form.demarcation, this.form.id);
      if (res && res.status === 200) {
        message.success("cập nhật thành công");
      }
    },
    async getvalue() {
      const payload = this.search;
      const res = await getAllEmployee(
        this.page.current,
        this.page.pageSize,
        payload
      );
      console.log(res, 999);
      if (res && res.code === 201) {
        // this.data.total = res.data.totalElements;
        this.data = res.data.content.map((item, index) => ({
          SL: index + 1,
          name: item.employeeName,
          laborCode: item.laborCode,
          id: item.employeeId,
          groupName: item.groupName,
        }));
      }
    },
    edit() {
      isEdit.value = !isEdit.value;
    },
    async save(name, id, laborCode) {
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
