<template>
  <a-table :columns="columns" :data-source="data" bordered />
</template>
<script>
import { getViewDetail } from "@/api/AuthenConnector.js";
export default {
  data() {
    return {
      data: [],
      // data: [
      //   {
      //     key: 1,
      //     name: "văn phòng",
      //     office: 60,
      //     enterprise: "88",
      //     laborProductivity: 33,
      //     NumberLeave: 22,
      //     Ratio: 99,
      //     totalLaborProductivity: 55,
      //     NumberRice: 11,
      //     children: [
      //       {
      //         key: 11,
      //         name: "Lãnh đạo",
      //         office: 42,
      //         enterprise: "99",
      //         laborProductivity: 33,
      //         NumberLeave: 22,
      //         Ratio: 99,
      //         totalLaborProductivity: 55,
      //         NumberRice: 11,
      //       },
      //       {
      //         key: 12,
      //         name: "Phòng TCHC",
      //         office: 30,
      //         enterprise: "5",
      //         laborProductivity: 33,
      //         NumberLeave: 22,
      //         Ratio: 99,
      //         totalLaborProductivity: 55,
      //         NumberRice: 11,
      //       },
      //       {
      //         key: 13,
      //         name: "Kế Toán",
      //         office: 72,
      //         enterprise: "8",
      //         laborProductivity: 33,
      //         NumberLeave: 22,
      //         Ratio: 99,
      //         totalLaborProductivity: 55,
      //         NumberRice: 11,
      //       },
      //     ],
      //   },
      //   {
      //     key: 2,
      //     name: "Đơn vị lẻ",
      //     office: 32,
      //     enterprise: "77",
      //     laborProductivity: 33,
      //     NumberLeave: 22,
      //     Ratio: 99,
      //     totalLaborProductivity: 55,
      //     NumberRice: 11,
      //     children: [
      //       {
      //         key: 131,
      //         name: "XN1",
      //         office: 42,
      //         enterprise: "99",
      //         laborProductivity: 33,
      //         NumberLeave: 22,
      //         Ratio: 99,
      //         totalLaborProductivity: 55,
      //         NumberRice: 11,
      //         children: [
      //           {
      //             key: 111,
      //             name: "Vệ Sinh 1",
      //             office: 42,
      //             enterprise: "99",
      //             laborProductivity: 33,
      //             NumberLeave: 22,
      //             Ratio: 99,
      //             totalLaborProductivity: 55,
      //             NumberRice: 11,
      //           },
      //         ],
      //       },
      //       {
      //         key: 1222,
      //         name: "XN2",
      //         office: 42,
      //         enterprise: "99",
      //         laborProductivity: 33,
      //         NumberLeave: 22,
      //         Ratio: 99,
      //         totalLaborProductivity: 55,
      //         NumberRice: 11,
      //       },
      //     ],
      //   },
      //   {
      //     key: 2212,
      //     name: "Tổ May	",
      //     office: 32,
      //     enterprise: "77",
      //     laborProductivity: 33,
      //     NumberLeave: 22,
      //     Ratio: 99,
      //     totalLaborProductivity: 55,
      //     NumberRice: 11,
      //   },
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
        },
        {
          title: "Tổng lao động báo năng suất",
          dataIndex: "totalLaborProductivity",
        },
        {
          title: "Báo cơm",
          dataIndex: "numberRice",
        },
      ],
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
/* .ant-table-tbody > tr > td {
  background-color: tomato;
} */

.ant-table-tbody > tr > td:first-child {
  background-color: #0daeff !important;
  color: #ffff !important;
  white-space: nowrap !important;
}

.ant-table-tbody > tr.ant-table-row:hover > td {
  /* background: none !important; */
  color: rgba(0, 0, 0, 0.65) !important;
}
</style>
