<template>
  <a-table :columns="columns" :data-source="data" bordered />
</template>
<script>
import { defineComponent } from "vue";
const columns = [
  {
    title: "Bộ phận",
    dataIndex: "name",
    key: "name",
  },

  {
    title: "Văn phòng",
    dataIndex: "age",
    key: "age",
    // width: "12%",
  },
  {
    title: "Xí nghiệp",
    dataIndex: "address",
    // width: "30%",
    key: "address",
  },
  {
    title: "Lao động báo năng suất",
    dataIndex: "address",
    // width: "30%",
    key: "address",
  },
  {
    title: "Số lao động nghỉ",
    dataIndex: "address",
    // width: "30%",
    key: "address",
  },
  {
    title: "Tỉ lệ %",
    dataIndex: "address",
    // width: "30%",
    key: "address",
  },
  {
    title: "Tổng lao động báo năng suất",
    dataIndex: "address",
    // width: "30%",
    key: "address",
  },
  {
    title: "Báo cơm",
    dataIndex: "address",
    // width: "30%",
    key: "address",
  },
];
const data = [
  {
    key: 1,
    name: "văn phòng",
    age: 60,
    address: "New York No. 1 Lake Park",
    children: [
      {
        key: 11,
        name: "Lãnh đạo",
        age: 42,
        address: "New York No. 2 Lake Park",
      },
      {
        key: 12,
        name: "Phòng TCHC",
        age: 30,
        address: "New York No. 3 Lake Park",
      },
      {
        key: 13,
        name: "Kế Toán",
        age: 72,
        address: "London No. 1 Lake Park",
      },
    ],
  },
  {
    key: 2,
    name: "Đơn vị lẻ",
    age: 32,
    address: "Sidney No. 1 Lake Park",
    children: [
      {
        key: 11,
        name: "XN1",
        age: 42,
        address: "New York No. 2 Lake Park",
        children: [
          {
            key: 11,
            name: "Vệ Sinh 1",
            age: 42,
            address: "New York No. 2 Lake Park",
          },
        ],
      },
      {
        key: 12,
        name: "XN2",
        age: 42,
        address: "New York No. 2 Lake Park",
      },
    ],
  },
  {
    key: 2,
    name: "Tổ May	",
    age: 32,
    address: "Sidney No. 1 Lake Park",
  },
];
const rowSelection = {};
export default defineComponent({
  setup() {
    return {
      data,
      columns,
      rowSelection,
    };
  },
});
</script>
<style>
.ant-table-thead > tr > th {
  background-color: #0daeff;
  color: #ffff;
}
/* .ant-table-tbody > tr > td {
  background-color: tomato;
} */
.red {
  color: red;
}
.ant-table-tbody > tr > td:first-child {
  background-color: #0daeff;
  color: #ffff;
  white-space: nowrap;
}

.ant-table-tbody > tr.ant-table-row:hover > td {
  /* background: none !important; */
  color: rgba(0, 0, 0, 0.65);
}
</style>
