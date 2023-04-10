<template>
  <a-cascader :options="options" change-on-select @change="onChange" />
</template>
<script>
export default {
  data() {
    return {
      options: [
        {
          value: "1",
          label: "Zhejiang",
          children: [
            {
              value: "2",
              label: "Hangzhou",
              children: [
                {
                  value: "3",
                  label: "West Lake",
                },
              ],
            },
          ],
        },
        {
          value: "4",
          label: "Jiangsu",
          children: [
            {
              value: "5",
              label: "Nanjing",
              children: [
                {
                  value: "6",
                  label: "Zhong Hua Men",
                },
              ],
            },
          ],
        },
      ],
    };
  },
  methods: {
    onChange(value) {
      console.log(value);
    },
  },
};
</script>
