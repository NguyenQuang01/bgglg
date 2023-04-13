<template>
  <a-table :columns="columns" :data-source="data" @expand="tet" bordered>
    <template slot="rice" slot-scope="text, row">
      <div>
        <div
          class="whitespace-nowrap"
          v-if="!(row.name === 'Tổng thực tế làm việc')"
        >
          Nhân viên:{{ row.rice.riceEmp }}
        </div>
        <div class="whitespace-nowrap" v-if="row.name === 'Phòng QA'">
          Khách:{{ row.rice.riceCus }}
        </div>
        <div class="whitespace-nowrap" v-if="row.name === 'Phòng QA'">
          Khách Vip:{{ row.rice.riceVip }}
        </div>
      </div>
    </template>
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
      dataName: "",
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
          customRender: (value, row, index) => {
            const obj = {
              children: row.ratio,
              attrs: {},
            };
            const test = [...this.arrChild, 3];
            if (!test.includes(row.key)) {
              obj.attrs.colSpan = 2;
            }

            return obj;
          },
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
              obj.children = this.totalRatioOfOfficeAndDonvile || 0;
            }
            if (this.arrChild.includes(row.key)) {
              obj.attrs.rowSpan = 0;
            }
            const test = [...this.arrChild, 3];
            if (!test.includes(row.key)) {
              obj.attrs.colSpan = 0;
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
              children: this.totalLaborProductivity || 0,
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
      totalLaborProductivity: "",
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
        element.key === record.key && expanded === true
          ? (this.numberRadio += element.totalNum)
          : ""
      );
      this.viewRoot.find((element) =>
        element.key === record.key && expanded === false
          ? (this.numberRadio -= element.totalNum)
          : ""
      );
    },
    async getData() {
      const day = dayjs(this.valueDay).format("YYYY/MM/DD");
      const res = await getViewDetail(day);
      if (res && res.code === 201) {
        const totalAll = {
          key: 0,
          parentId: 0,
          name: "Tổng thực tế làm việc",
          office: res.data[0].office,
          enterprise: res.data
            .map((item) => item.enterprise)
            .reduce(
              (accumulator, currentValue) => accumulator + currentValue,
              0
            ),
          ratio: 100,
          laborProductivity: res.data
            .map((item) => item.laborProductivity)
            .reduce(
              (accumulator, currentValue) => accumulator + currentValue,
              0
            ),
          numberLeave: res.data
            .map((item) => item.numberLeave)
            .reduce(
              (accumulator, currentValue) => accumulator + currentValue,
              0
            ),
          partTimeEmp: null,
          totalRatioOfOfficeAndDonvile: res.data
            .map((item) => item.totalRatioOfOfficeAndDonvile)
            .reduce(
              (accumulator, currentValue) => accumulator + currentValue,
              0
            ),
          rice: {
            riceCus: 0,
            riceVip: 0,
            riceEmp: 0,
          },
          children: null,
        };
        this.data = res.data;
        this.data.push(totalAll);
        this.dataName = this.data.map((item) => item.name);
        this.cusRice = res.data[0].totalRiceCus;
        this.empRice = res.data[0].totalRiceEmp;
        this.empVipRice = res.data[0].totalRiceVip;
        this.totalRatioOfOfficeAndDonvile =
          res.data[0].totalRatioOfOfficeAndDonvile;
        this.totalLaborProductivity = res.data[6].laborProductivity;
      }
      if (res && res.status === 500) {
        message.error("không có dữ liệu");
        this.data = [];
      }
    },

    async viewRoot2() {
      const day = dayjs(this.valueDay).format("YYYY/MM/DD");
      const res = await viewRoot(day);
      if (res && res.code === 201) {
        this.viewRoot = res.data;
      }
    },
    async getChildVpDvl() {
      const res = await searchAllDeleteTm();
      if (res && res.code === 201) {
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
