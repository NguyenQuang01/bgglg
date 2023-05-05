<template lang="">
  <div class="container">
    <div class="text-center mt-16 text-3xl font-bold title mb-16">
      Bảng báo cáo chi tiết điện thoai
    </div>
    <div class="max-w-sm m-auto m-0">
      <div class="mb-2 flex">
        <a-button class="btnDay" @click="btnMinus">Ngày trước</a-button>
        <a-date-picker
          v-model="valueDay"
          class="mx-2"
          placeholder="Chọn ngày"
        />
        <a-button class="btnDay" @click="btnPlus">ngày sau</a-button>
      </div>
      <div v-for="(item, index) in data" :key="index">
        <a-collapse>
          <a-collapse-panel :key="item.key" :header="item.name">
            <div class="mb-3">
              Văn phòng:
              <div class="float-right">{{ item.office }}</div>
            </div>
            <div class="mb-3">
              Xí nghiệp:
              <div class="float-right">{{ item.enterprise }}</div>
            </div>
            <div class="mb-3">
              Lao động báo năng suất:
              <div class="float-right">{{ item.laborProductivity }}</div>
            </div>
            <div class="mb-3">
              Số lao động nghỉ:

              <div class="float-right">
                <a-popover trigger="click">
                  <template slot="content">
                    <div v-if="!item.restObjectResponse?.employeeRest">
                      <div
                        class="whitespace-nowrap"
                        v-for="i in item.restObjectResponse?.reason"
                      >
                        {{ i.reasonName }} - {{ i.total }}
                      </div>
                    </div>
                    <div v-if="item.restObjectResponse?.employeeRest">
                      <div
                        class="whitespace-nowrap"
                        v-for="i in item.restObjectResponse?.employeeRest"
                      >
                        {{ i.nameEmployee }} - {{ i.labor }}- {{ i.reasonName }}
                      </div>
                    </div>
                  </template>
                  <b-icon
                    icon="plus-circle"
                    aria-hidden="true"
                    class="mr-2"
                  ></b-icon> </a-popover
                >{{ item.numberLeave }}
              </div>
            </div>
            <div class="mb-3">
              Tỉ lệ %:
              <div class="float-right">{{ item.ratio }}</div>
            </div>
            <div class="mb-3">
              Tổng lao động năng suất:
              <div class="float-right">{{ totalLaborProductivity }}</div>
            </div>
            <div class="mb-3">
              Báo cơm:
              <div class="float-right">{{ item.rice.riceEmp }}</div>
            </div>
            <div v-if="item.children">
              <div v-for="item in item.children">
                <a-collapse>
                  <a-collapse-panel :key="item.key" :header="item.name">
                    <div class="mb-3">
                      Văn phòng:
                      <div class="float-right">{{ item.office }}</div>
                    </div>
                    <div class="mb-3">
                      Xí nghiệp:
                      <div class="float-right">{{ item.enterprise }}</div>
                    </div>
                    <div class="mb-3">
                      Lao động báo năng suất:
                      <div class="float-right">
                        {{ item.laborProductivity }}
                      </div>
                    </div>
                    <div class="mb-3">
                      Số lao động nghỉ:

                      <div class="float-right">
                        <a-popover trigger="click">
                          <template slot="content">
                            <div v-if="!item.restObjectResponse?.employeeRest">
                              <div
                                class="whitespace-nowrap"
                                v-for="i in item.restObjectResponse?.reason"
                              >
                                {{ i.reasonName }} - {{ i.total }}
                              </div>
                            </div>
                            <div v-if="item.restObjectResponse?.employeeRest">
                              <div
                                class="whitespace-nowrap"
                                v-for="i in item.restObjectResponse
                                  ?.employeeRest"
                              >
                                {{ i.nameEmployee }} - {{ i.labor }}-
                                {{ i.reasonName }}
                              </div>
                            </div>
                          </template>
                          <b-icon
                            icon="plus-circle"
                            aria-hidden="true"
                            class="mr-2"
                          ></b-icon> </a-popover
                        >{{ item.numberLeave }}
                      </div>
                    </div>
                    <div class="mb-3">
                      Tỉ lệ %:
                      <div class="float-right">{{ item.ratio }}</div>
                    </div>
                    <div class="mb-3">
                      Tổng lao động năng suất:
                      <div class="float-right">
                        {{ totalLaborProductivity }}
                      </div>
                    </div>
                    <div class="mb-3">
                      Báo cơm:
                      <div class="float-right">{{ item.rice.riceEmp }}</div>
                    </div>
                    <div v-if="item.children">
                      <div v-for="item in item.children">
                        <a-collapse>
                          <a-collapse-panel :key="item.key" :header="item.name">
                            <div class="mb-3">
                              Văn phòng:
                              <div class="float-right">{{ item.office }}</div>
                            </div>
                            <div class="mb-3">
                              Xí nghiệp:
                              <div class="float-right">
                                {{ item.enterprise }}
                              </div>
                            </div>
                            <div class="mb-3">
                              Lao động báo năng suất:
                              <div class="float-right">
                                {{ item.laborProductivity }}
                              </div>
                            </div>
                            <div class="mb-3">
                              Số lao động nghỉ:
                              <div class="float-right">
                                <a-popover trigger="click">
                                  <template slot="content">
                                    <div
                                      v-if="
                                        !item.restObjectResponse?.employeeRest
                                      "
                                    >
                                      <div
                                        class="whitespace-nowrap"
                                        v-for="i in item.restObjectResponse
                                          ?.reason"
                                      >
                                        {{ i.reasonName }} - {{ i.total }}
                                      </div>
                                    </div>
                                    <div
                                      v-if="
                                        item.restObjectResponse?.employeeRest
                                      "
                                    >
                                      <div
                                        class="whitespace-nowrap"
                                        v-for="i in item.restObjectResponse
                                          ?.employeeRest"
                                      >
                                        {{ i.nameEmployee }} - {{ i.labor }}-
                                        {{ i.reasonName }}
                                      </div>
                                    </div>
                                  </template>
                                  <b-icon
                                    icon="plus-circle"
                                    aria-hidden="true"
                                    class="mr-2"
                                  ></b-icon> </a-popover
                                >{{ item.numberLeave }}
                              </div>
                            </div>
                            <div class="mb-3">
                              Tỉ lệ %:
                              <div class="float-right">{{ item.ratio }}</div>
                            </div>
                            <div class="mb-3">
                              Tổng lao động năng suất:
                              <div class="float-right">
                                {{ totalLaborProductivity }}
                              </div>
                            </div>
                            <div class="mb-3">
                              Báo cơm:
                              <div class="float-right">
                                {{ item.rice.riceEmp }}
                              </div>
                            </div>
                            <div v-if="item.children">
                              <div v-for="item in item.children">
                                <a-collapse>
                                  <a-collapse-panel
                                    :key="item.key"
                                    :header="item.name"
                                  >
                                    <div class="mb-3">
                                      Văn phòng:
                                      <div class="float-right">
                                        {{ item.office }}
                                      </div>
                                    </div>
                                    <div class="mb-3">
                                      Xí nghiệp:
                                      <div class="float-right">
                                        {{ item.enterprise }}
                                      </div>
                                    </div>
                                    <div class="mb-3">
                                      Lao động báo năng suất:
                                      <div class="float-right">
                                        {{ item.laborProductivity }}
                                      </div>
                                    </div>
                                    <div class="mb-3">
                                      Số lao động nghỉ:
                                      <div class="float-right">
                                        <a-popover trigger="click">
                                          <template slot="content">
                                            <div
                                              v-if="
                                                !item.restObjectResponse
                                                  ?.employeeRest
                                              "
                                            >
                                              <div
                                                class="whitespace-nowrap"
                                                v-for="i in item
                                                  .restObjectResponse?.reason"
                                              >
                                                {{ i.reasonName }} -
                                                {{ i.total }}
                                              </div>
                                            </div>
                                            <div
                                              v-if="
                                                item.restObjectResponse
                                                  ?.employeeRest
                                              "
                                            >
                                              <div
                                                class="whitespace-nowrap"
                                                v-for="i in item
                                                  .restObjectResponse
                                                  ?.employeeRest"
                                              >
                                                {{ i.nameEmployee }} -
                                                {{ i.labor }}-
                                                {{ i.reasonName }}
                                              </div>
                                            </div>
                                          </template>
                                          <b-icon
                                            icon="plus-circle"
                                            aria-hidden="true"
                                            class="mr-2"
                                          ></b-icon> </a-popover
                                        >{{ item.numberLeave }}
                                      </div>
                                    </div>
                                    <div class="mb-3">
                                      Tỉ lệ %:
                                      <div class="float-right">
                                        {{ item.ratio }}
                                      </div>
                                    </div>
                                    <div class="mb-3">
                                      Tổng lao động năng suất:
                                      <div class="float-right">
                                        {{ totalLaborProductivity }}
                                      </div>
                                    </div>
                                    <div class="mb-3">
                                      Báo cơm:
                                      <div class="float-right">
                                        {{ item.rice.riceEmp }}
                                      </div>
                                    </div>
                                    <div v-if="item.children">
                                      <div v-for="item in item.children"></div>
                                      <a-collapse default-active-key="4">
                                        <a-collapse-panel
                                          key="4"
                                          header="This is panel nest panel"
                                        >
                                          <p>{{ text }}</p>
                                        </a-collapse-panel>
                                      </a-collapse>
                                    </div>
                                  </a-collapse-panel>
                                </a-collapse>
                              </div>
                              <a-collapse default-active-key="4">
                                <a-collapse-panel
                                  key="4"
                                  header="This is panel nest panel"
                                >
                                  <p>{{ text }}</p>
                                </a-collapse-panel>
                              </a-collapse>
                            </div>
                          </a-collapse-panel>
                        </a-collapse>
                      </div>
                    </div>
                  </a-collapse-panel>
                </a-collapse>
              </div>
            </div>
          </a-collapse-panel>
        </a-collapse>
      </div>
      <BtnBack class="h-10 mt-2 float-right mb-10" />
    </div>
    <div class="footer"></div>
  </div>
</template>
<script>
import {
  getViewDetail,
  viewDonViLe,
  // getNameAll,
  // viewRoot,
  // searchAllDeleteTm,
} from "@/api/AuthenConnector.js";
import dayjs from "dayjs";
import BtnBack from "@/components/BtnBack.vue";

import { message } from "ant-design-vue";
export default {
  middleware: "auth",
  data() {
    return {
      dataDvl: [],
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      valueDay: null,
      day: new Date().getDate(),
      month: new Date().getMonth() + 1,
      year: new Date().getFullYear(),
      day30: [4, 6, 9, 11],
      day31: [1, 3, 5, 7, 8, 10, 12],
      day28: [2],
      data: [],
      totalLaborProductivity: "",
    };
  },
  watch: {
    valueDay: {
      handler: function (value) {
        this.getData();
        this.getViewDonViLe();
      },
      deep: true,
    },
  },
  created() {
    this.valueDay = new Date().toISOString().substr(0, 10) || "";
    // this.getViewDonViLe();
    setTimeout(() => this.getData(), 0);
  },
  methods: {
    async getViewDonViLe() {
      const getDate = this.valueDay.replaceAll("-", "/");
      const res = await viewDonViLe(getDate);
      if (res && res.code === 201) {
        const valuesToRemove = [2, 93, 94];
        this.dataDvl = res.data.filter(
          (item) => !valuesToRemove.includes(item)
        );
      }
    },
    btnPlus() {
      const newDate = new Date(this.valueDay);
      newDate.setDate(newDate.getDate() + 1);
      this.valueDay = newDate.toISOString().substr(0, 10);
    },
    btnMinus() {
      const newDate = new Date(this.valueDay);
      newDate.setDate(newDate.getDate() - 1);
      this.valueDay = newDate.toISOString().substr(0, 10);
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
  },
};
</script>
<style scoped>
.title {
  color: #045396;
}
.btnDay {
  background-color: #045396;
  color: #ffffff;
}
.footer {
  height: 1px;
  margin: 100px 0;
}
</style>
