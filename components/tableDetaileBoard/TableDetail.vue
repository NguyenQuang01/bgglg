<template>
  <a-table :columns="columns" :data-source="data" @expand="tet" bordered>
    <span slot="rice" slot-scope="rice">
      <div>
        <div class="whitespace-nowrap">Nhân viên:{{ rice.riceCus }}</div>
        <div class="whitespace-nowrap">Khách:{{ rice.riceEmp }}</div>
        <div class="whitespace-nowrap">Khách Vip:{{ rice.riceVip }}</div>
      </div>
    </span>
  </a-table>
</template>
<script>
import {
  getViewDetail,
  getNameAll,
  viewRoot,
  searchAllDeleteTm,
} from "@/api/AuthenConnector.js";
import dayjs from "dayjs";
import { message } from "ant-design-vue";

export default {
  props: ["valueDay"],

  data() {
    return {
      viewRoot: [],
      arrChild: [],
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
            console.log(row);
            const obj = {
              children: "",
              attrs: {},
            };
            if (row.name === "Văn phòng") {
              obj.attrs.rowSpan = this.numberRadio;
              obj.children = this.totalRatioOfOfficeAndDonvile || 0;
            }
            if (this.arrChild.includes(row.key)) {
              obj.attrs.rowSpan = 0;
            }

            // if (row.name === "Đơn vị lẻ") {
            //   obj.attrs.rowSpan = 0;
            // }

            return obj;
          },
        },
        {
          title: "TỔNG LAO ĐỘNG BÁO NĂNG SUẤT",
          dataIndex: "totalLaborProductivity",
          className: "totalLaborProductivity right",
          customRender: (value, row, index) => {
            const obj = {
              children: value || 1,
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
          dataIndex: "rice",
          scopedSlots: { customRender: "rice" },
        },
      ],
      cusRice: "",
      empRice: "",
      empVipRice: "",
    };
  },
  created() {
    this.getData();
    // this.getNameAll();
    this.viewRoot2();
    this.getChildVpDvl();
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
      this.viewRoot.find((element) =>
        element.id === record.key && expanded === true
          ? (this.numberRadio += element.numberChild)
          : ""
      );
      this.viewRoot.find((element) =>
        element.id === record.key && expanded === false
          ? (this.numberRadio -= element.numberChild)
          : ""
      );
      // console.log(found, 9999);
      // if (found) {
      // }
      // if (record.name === "Văn phòng" && expanded === true) {
      //   this.numberRadio += this.data[0].children.length;
      // }
      // if (record.name === "Đơn vị lẻ" && expanded === true) {
      //   this.numberRadio += this.data[1].children.length;
      // }

      // if (record.name === "Văn phòng" && expanded === false) {
      //   this.numberRadio -= this.data[0].children.length;
      // }
      // if (record.name === "Đơn vị lẻ" && expanded === false) {
      //   this.numberRadio -= Number(this.data[1].children.length);
      // }
      // if (record.name === "Đơn vị lẻ" && expanded === true) {
      //   this.numberRadio = 5;
      // } else {
      //   this.numberRadio = 2;
      // }
    },
    async getData() {
      const day = dayjs(this.valueDay).format("YYYY/MM/DD");
      const res = await getViewDetail(day);
      if (res && res.code === 201) {
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
    },
    // async getNameAll() {
    //   const res = await getNameAll();
    //   if (res && res.code === 201) {
    //     res.data.shift();
    //     // this.arrChild = res.data;
    //     this.arrChild = [
    //       "Đơn vị lẻ",
    //       "Lãnh đạo",
    //       "VPXN1",
    //       "XN2",
    //       "Tài chính hành chính",
    //       "Kế Toán",
    //       "Kế hoạch - xuất nhập khẩu",
    //       "Kĩ thuật",
    //       "QA",
    //       "Tổ Kho NPL",
    //       "Tổ Cơ Điện vòng ngoài",
    //       "Xí nghiệp 1",
    //       "Xí nghiệp 2",
    //       "Tổ may 21",
    //       "Tổ may 22",
    //       "Tổ may 23",
    //       "Tổ may 24",
    //       "Tổ may 25",
    //       "Tổ may 26",
    //       "Tổ may 27",
    //       "Tổ may 28",
    //       "Tổ may 29",
    //       "Tổ may 30",
    //     ];
    //   }
    // },
    async viewRoot2() {
      const day = dayjs(this.valueDay).format("YYYY/MM/DD");
      const res = await viewRoot(day);
      if (res) {
        this.viewRoot = res;
      }
    },
    async getChildVpDvl() {
      const res = await searchAllDeleteTm();
      if (res && res.code === 201) {
        console.log(res);
        this.arrChild = res.data.filter((item) => item !== 3);
      }
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
