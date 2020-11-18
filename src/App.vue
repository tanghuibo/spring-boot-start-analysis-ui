<template>
  <div id="app">
    <el-table border :data="tableData">
      <el-table-column type="index" width="50"> </el-table-column>
      <el-table-column prop="beanName" label="bean name">
        <template v-slot:header>
          <div class="title-box">
            <span class="title-text"> bean name </span>
            <el-input
              v-model="quertForm.beanName"
              size="mini"
              class="title-input"
            />
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="className" label="class name">
        <template v-slot:header>
          <div class="title-box">
            <span class="title-text"> class name </span>
            <el-input
              v-model="quertForm.className"
              size="mini"
              class="title-input"
            />
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="startTime" sortable label="启动时间" width="120">
        <template v-slot:default="{ row }">
          {{ `${timeFormat(row.startTime)}` }}
        </template>
      </el-table-column>
      <el-table-column prop="endTime" sortable label="结束时间" width="120">
        <template v-slot:default="{ row }">
          {{ `${timeFormat(row.endTime)}` }}
        </template>
      </el-table-column>
      <el-table-column prop="costTime" sortable label="花费时间" width="300">
        <template v-slot:default="{ row }">
          {{ `${timeFormat(row.costTime)}` }}
          <el-progress
            :show-text="false"
            :percentage="parseInt((row.costTime * 100) / this.maxCostTime)"
          ></el-progress>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import server from "@/js/server.js";
import utils from "@/js/utils.js";
export default {
  name: "App",
  components: {},
  data: () => ({
    quertForm: {
      beanName: "",
      className: "",
    },
    data: [],
    maxCostTime: 1,
  }),
  mounted() {
    this.query();
  },
  computed: {
    tableData() {
      return this.data.filter((item) => {
        if (this.quertForm.beanName != null && this.quertForm.beanName != "") {
          if (item.beanName.indexOf(this.quertForm.beanName) < 0) {
            return false;
          }
        }
        if (
          this.quertForm.className != null &&
          this.quertForm.className != ""
        ) {
          if (item.className.indexOf(this.quertForm.className) < 0) {
            return false;
          }
        }
        return true;
      });
    },
  },
  methods: {
    timeFormat(time) {
      return utils.timeFormat(time);
    },
    async query() {
      this.data = await server.query();
      this.maxCostTime = 1;
      this.data.forEach((item) => {
        if (item.costTime > this.maxCostTime) {
          this.maxCostTime = item.costTime;
        }
      });
    },
  },
};
</script>

<style scoped>
.title-box {
  display: flex;
}
.title-text {
  align-self: center;
  font-size: 16px;
}
.title-input {
  width: 100%;
}
</style>
