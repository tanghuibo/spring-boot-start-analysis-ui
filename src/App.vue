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
        <template v-slot:default="{ row }">
          <div>
            <div
              class="progress"
              :style="{
                left: `${(row.startTime * 80) / maxEndTime}vw`,
                width: `${(row.costTime * 80) / maxEndTime}vw`,
              }"
            >
              &nbsp;&nbsp;
            </div>
            <div>{{ row.beanName }}</div>
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
    maxCostTime() {
      let maxCostTime = 1;
      this.tableData.forEach((item) => {
        maxCostTime = Math.max(item.costTime, maxCostTime);
      });
      return maxCostTime;
    },
    maxEndTime() {
      let maxEndTime = 1;
      this.tableData.forEach((item) => {
        maxEndTime = Math.max(item.endTime, maxEndTime);
      });
      return maxEndTime;
    },
  },
  methods: {
    timeFormat(time) {
      return utils.timeFormat(time);
    },
    async query() {
      this.data = await server.query();
    },
  },
};
</script>

<style scoped>
.progress {
  background: rgba(255, 0, 0);
  min-width: 1px;
  position: absolute;
  opacity: 0.5;
  z-index: 9999;
  height: 100%;
  top: 0;
  pointer-events: none;
}
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
