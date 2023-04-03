<template>
  <a-table :columns="columns" :data-source="data" bordered>
    <span slot="numberRice" slot-scope="text, row">
      <div v-if="row.name === 'Văn phòng'">
        <div class="whitespace-nowrap">Nhân viên:{{ cusRice }}</div>
        <div class="whitespace-nowrap">Khách:{{ empRice }}</div>
        <div class="whitespace-nowrap">Khách Vip:{{ empVipRice }}</div>
      </div>
    </span>
  </a-table>
</template>
<script>
// const renderContent = (value, row, index) => {
//   console.log(value, row, index);
//   const obj = {
//     children: value,
//     attrs: {},
//   };
// if (row.name === "Văn phòng") {
//   console.log(value, row.key, 999);
//   obj.attrs.rowSpan = 10;
// }
// if (index === 1) {
//   obj.attrs.rowSpan = 0;
// }

// if (index === 2) {
//   obj.attrs.rowSpan = 0;
// }
// if (index === 3) {
//   obj.attrs.rowSpan = 0;
// }
// if (index === 4) {
//   obj.attrs.rowSpan = 0;
// }
// if (index === 5) {
//   obj.attrs.rowSpan = 0;
// }
// if (index === 6) {
//   obj.attrs.rowSpan = 0;
// }
// if (index === 7) {
//   obj.attrs.rowSpan = 0;
// }
// if (index === 8) {
//   obj.attrs.rowSpan = 0;
// }
// if (index === 9) {
//   obj.attrs.rowSpan = 0;
// }
// if (index === 10) {
//   obj.attrs.rowSpan = 0;
// }
// if (index === 11) {
//   obj.attrs.rowSpan = 0;
// }
// if (row.key === 24) {
//   obj.attrs.rowSpan = 0;
// }
// if (row.name === "XN1") {
//   obj.attrs.rowSpan = 0;
// }
// if (row.name === "Vệ Sinh 1") {
//   obj.attrs.rowSpan = 0;
// }

//   return obj;
// };
import { getViewDetail } from "@/api/AuthenConnector.js";
export default {
  data() {
    return {
      data: [],
      // data: [
      // {
      //   key: 1,
      //   name: "văn phòng",
      //   office: 60,
      //   enterprise: "88",
      //   laborProductivity: 33,
      //   NumberLeave: 22,
      //   Ratio: 99,
      //   totalLaborProductivity: 55,
      //   NumberRice: 11,
      //   children: [
      //     {
      //       key: 11,
      //       name: "Lãnh đạo",
      //       office: 42,
      //       enterprise: "99",
      //       laborProductivity: 33,
      //       NumberLeave: 22,
      //       Ratio: 99,
      //       NumberRice: 11,
      //     },
      //     {
      //       key: 12,
      //       name: "Phòng TCHC",
      //       office: 30,
      //       enterprise: "5",
      //       laborProductivity: 33,
      //       NumberLeave: 22,
      //       Ratio: 99,
      //       NumberRice: 11,
      //     },
      //     {
      //       key: 13,
      //       name: "Kế Toán",
      //       office: 72,
      //       enterprise: "8",
      //       laborProductivity: 33,
      //       NumberLeave: 22,
      //       Ratio: 99,
      //       NumberRice: 11,
      //     },
      //   ],
      // },
      // {
      //   key: 2,
      //   name: "Đơn vị lẻ",
      //   office: 32,
      //   enterprise: "77",
      //   laborProductivity: 33,
      //   NumberLeave: 22,
      //   Ratio: 99,
      //   NumberRice: 11,
      //   children: [
      //     {
      //       key: 131,
      //       name: "XN1",
      //       office: 42,
      //       enterprise: "99",
      //       laborProductivity: 33,
      //       NumberLeave: 22,
      //       Ratio: 99,
      //       NumberRice: 11,
      //       children: [
      //         {
      //           key: 111,
      //           name: "Vệ Sinh 1",
      //           office: 42,
      //           enterprise: "99",
      //           laborProductivity: 33,
      //           NumberLeave: 22,
      //           Ratio: 99,
      //           NumberRice: 11,
      //         },
      //       ],
      //     },
      //     {
      //       key: 1222,
      //       name: "XN2",
      //       office: 42,
      //       enterprise: "99",
      //       laborProductivity: 33,
      //       NumberLeave: 22,
      //       Ratio: 99,
      //       NumberRice: 11,
      //     },
      //   ],
      // },
      // {
      //   key: 2212,
      //   name: "Tổ May	",
      //   office: 32,
      //   enterprise: "77",
      //   laborProductivity: 33,
      //   NumberLeave: 22,
      //   Ratio: 99,
      //   NumberRice: 11,
      // },
      // ],
      columns: [
        {
          title: "Bộ phận",
          dataIndex: "name",
          key: "name",
        },

        {
          title: "Văn phòng",
          dataIndex: "office",
          // width: "12%",
        },
        {
          title: "Xí nghiệp",
          dataIndex: "enterprise",
        },
        {
          title: "Lao động báo năng suất",
          dataIndex: "laborProductivity",
        },
        {
          title: "Số lao động nghỉ",
          dataIndex: "numberLeave",
        },
        {
          title: "Tỉ lệ %",
          dataIndex: "ratio",
          // customRender: renderContent,
        },
        {
          title: "Tổng lao động báo năng suất",
          dataIndex: "totalLaborProductivity",
          customRender: (value, row, index) => {
            const obj = {
              children: value,
              attrs: {},
            };
            if (row.name === "Văn phòng") {
              obj.attrs.rowSpan = 1000;
            }
            if (row.name !== "Văn phòng") {
              obj.attrs.rowSpan = 0;
            }
            return obj;
          },
        },
        {
          title: "Báo cơm",
          dataIndex: "numberRice",
          scopedSlots: { customRender: "numberRice" },
        },
      ],
      cusRice: "",
      empRice: "",
      empVipRice: "",
    };
  },
  created() {
    this.getData();
  },
  methods: {
    async getData() {
      const res = await getViewDetail();
      if (res && res.status === 200) {
        this.data = res.data;
        this.cusRice = res.data[0].totalRiceCus;
        this.empRice = res.data[0].totalRiceEmp;
        this.empVipRice = res.data[0].totalRiceVip;
      }
      console.log(res, 3333);
    },
  },
};
</script>
<style>
.ant-table-thead > tr > th {
  background-color: #0daeff !important;
  color: #ffff !important;
}

.ant-table-tbody > tr > td:first-child {
  background-color: #0daeff !important;
  color: #ffff !important;
  white-space: nowrap !important;
}

.ant-table-tbody > tr.ant-table-row:hover > td {
  color: rgba(0, 0, 0, 0.65) !important;
}
</style>
