<template>
  <a-table :columns="columns" :data-source="data" @expand="tet">
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

      columns: [
        {
          title: "BỘ PHẬN",
          dataIndex: "name",
          key: "name",
        },

        { className: "right", title: "VĂN PHÒNG", dataIndex: "office" },
        { className: "right", title: "XÍ NGHIỆP", dataIndex: "enterprise" },
        {
          className: "right",
          title: "LAO ĐỘNG BÁO NĂNG SUẤT",
          dataIndex: "laborProductivity",
        },
        {
          className: "right",
          title: "SỐ LAO ĐỘNG NGHỈ",
          dataIndex: "numberLeave",
        },
        {
          className: "right",
          title: "TỈ LỆ %",
          dataIndex: "ratio",

          colSpan: 2,
          // customRender: renderContent,
        },
        {
          className: "right",
          dataIndex: "ratio2",
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
          title: "TỔNG LAO ĐỘNG BÁO NĂNG SUẤT",
          dataIndex: "totalLaborProductivity",
          className: "totalLaborProductivity right",
          customRender: (value, row, index) => {
            const obj = {
              children: value,
              attrs: {},
            };
            if (row.name === "Văn phòng") {
              obj.attrs.rowSpan = 10000;
            }
            if (row.name !== "Văn phòng") {
              obj.attrs.rowSpan = 0;
            }
            return obj;
          },
        },
        {
          title: "BÁO CƠM",
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
        this.numberRadio += this.data[0].children.length;
      }
      if (record.name === "Văn phòng" && expanded === false) {
        this.numberRadio -= this.data[0].children.length;
      }
      if (record.name === "Đơn vị lẻ" && expanded === false) {
        this.numberRadio -= this.data[1].children.length;
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
      console.log(res);
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
  color: #045396 !important;
  font-weight: 700;
}

.ant-table-tbody > tr > td:first-child {
  color: #045396 !important;
  font-weight: 700;
}

.ant-table-tbody > tr.ant-table-row:hover > td {
  color: #045396 !important;
}
.ant-table-body {
  font-size: 12px !important;
}
td.totalLaborProductivity {
  font-size: 20px;
}
td.right {
  text-align: right !important;
}
th.right {
  text-align: center !important;
}
</style>
