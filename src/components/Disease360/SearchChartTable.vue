<template>
  <div class="chart-table-wrap">
     <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        prop="name"
        label="姓名"
        width="180">
      </el-table-column>
      <el-table-column
        prop="id"
        label="ID"
        width="180">
      </el-table-column>
      <el-table-column
        prop="disease"
        label="临床分期"
        width="180">
      </el-table-column>
      <el-table-column
        prop="abnormal"
        label="疾病诊断"
        width="180">
      </el-table-column>
      <el-table-column
        prop="judgment"
        label="症状">
      </el-table-column>
      <el-table-column
        prop="xs"
        label="相似度">
      </el-table-column>
      <el-table-column
        label="治疗方案">
        <template slot-scope="scope"><span class="detail-span" @click="onDetail(scope.row)">查看</span></template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'searchChartTable',
  props: {
    tableData: {
      type: Array
    }
  },
  methods: {
    onDetail (row) {
      this.$emit('onDetail', row)
    }
  }
}
</script>

<style lang="scss" scoped>
.chart-table-wrap {
  width: 100%;
  .detail-span {
    color: #409EFF;
    cursor: pointer;
  }
}
</style>
