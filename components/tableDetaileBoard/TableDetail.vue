<template>
  <a-table :columns="columns" :data-source="data" bordered @expand="tet">
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
import { getViewDetail } from "@/api/AuthenConnector.js";
import dayjs from "dayjs";
import { message } from "ant-design-vue";

export default {
  props: ["valueDay"],

  data() {
    return {
      arrChild: ["to1", "to2", "to3", "admin1", "admin2", "admin3"],
      numberRadio: 2,
      data: [],
      totalRatioOfOfficeAndDonvile: "",
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
          colSpan: 2,
          // customRender: renderContent,
        },
        {
          title: "Tỉ lệ %",
          dataIndex: "ratio",
          colSpan: 0,
          customRender: (value, row, index) => {
            const obj = {
              children: "",
              attrs: {},
            };
            if (row.name === "Văn phòng") {
              obj.attrs.rowSpan = this.numberRadio;
              obj.children = this.totalRatioOfOfficeAndDonvile;
            }
            if (this.arrChild.includes(row.name)) {
              obj.attrs.rowSpan = 0;
            }
            if (row.name === "Đơn vị lẻ") {
              obj.attrs.rowSpan = 0;
            }

            return obj;
          },
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
  watch: {
    valueDay: {
      handler: function (value) {
        this.getData();
      },
      deep: true,
    },
  },
  methods: {
    tet(expanded, record) {
      console.log(expanded, record);
      if (
        (record.name === "Văn phòng" || record.name === "Đơn vị lẻ") &&
        expanded === true
      ) {
        this.numberRadio += 2;
      }
      if (record.name === "Văn phòng" && expanded === false) {
        this.numberRadio -= 3;
      }
      if (record.name === "Đơn vị lẻ" && expanded === false) {
        this.numberRadio -= 3;
      }
      // if (record.name === "Đơn vị lẻ" && expanded === true) {
      //   this.numberRadio = 5;
      // } else {
      //   this.numberRadio = 2;
      // }
    },
    async getData() {
      const day = dayjs(this.valueDay).format("YYYY/MM/DD");
      const res = await getViewDetail(day);
      if (res && res.status === 200) {
        this.data = res.data;
        this.cusRice = res.data[0].totalRiceCus;
        this.empRice = res.data[0].totalRiceEmp;
        this.empVipRice = res.data[0].totalRiceVip;
        this.totalRatioOfOfficeAndDonvile =
          res.data[0].totalRatioOfOfficeAndDonvile;
      }
      if (res && res.status === 500) {
        message.error("không có dữ liệu");
        this.data = [];
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
