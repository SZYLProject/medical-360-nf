<template>
  <div class="h-list-wrap">
    <div class="table-top-wrap">
        <span>{{listInfo.title}}</span>
        <div class="table-right-wrap">
            <el-input
                placeholder="搜索名字或者ID"
                suffix-icon="el-icon-search"
                v-model="searchForm.search">
            </el-input>
            <div class="dropdowm-wrap">
                <el-dropdown>
                    <span class="el-dropdown-link">
                        {{listInfo.dropdownName}}<i class="el-icon-arrow-down el-icon--right"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item>Excel</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </div>
        </div>
    </div>
    <Empty v-if = '!loading && !tableData.length' ></Empty>
    <div class="table-ctn-wrap">
      <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        :default-sort = "{prop: 'date',order: 'descending'}"
        style="width:100%;"
        >
            <el-table-column
            prop="tpatname"
            sortable
            label="姓名"
            >
            </el-table-column>

            <el-table-column
            label="PatientID"
            prop="patient_id"
            sortable
            >
            <template slot-scope="scope">{{ scope.row.patient_id }}</template>
            </el-table-column>

            <el-table-column
            prop="age"
            label="年龄"
            >
            </el-table-column>

            <el-table-column
            label="性别"
            prop="gender"
            sortable
            >
            <template slot-scope="scope">{{ scope.row.gender }}</template>
            </el-table-column>

            <el-table-column
            prop="admit_diagnosis"
            label="入院诊断"
            >
            <template slot-scope="scope">{{ scope.row.admit_diagnosis }}</template>
            </el-table-column>

            <el-table-column
            label="入院时间"
            prop="visit_time"
            sortable
            >
            <template slot-scope="scope">{{ scope.row.visit_time }}</template>
            </el-table-column>
            <el-table-column
            label="主管医生"
            prop="doctor_name"
            sortable
            >
            <template slot-scope="scope">{{ scope.row.doctor_name }}</template>
            </el-table-column>

            <el-table-column label="详情" >
              <template slot-scope="scope">
                <span class="detail-span" @click="onPushDetail(scope.row)">查看详情</span>
              </template>
            </el-table-column>
    </el-table>
    <div class="pagination-wrap">
      <el-pagination
        background
        :page-size="10"
        @current-change = 'onCurrentChange'
        layout="prev, pager, next"
        :total="tableDataAll.length">
      </el-pagination>
    </div>
    </div>
  </div>
</template>

<script>
import { Table, Input, Dropdown, Button, Pagination } from 'element-ui'
import { mapState, mapMutations } from 'vuex'
export default {
  components: {
    [Table.name]: Table,
    [Input.name]: Input,
    [Button.name]: Button,
    [Pagination.name]: Pagination,
    [Dropdown.name]: Dropdown
  },
  props: {
    listInfo: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data () {
    return {
      searchForm: {}
    }
  },
  computed: {
    ...mapState({
      tableDataAll: state => state.diseaseEntry.tableDataAll,
      tableData: state => state.diseaseEntry.tableData,
      loading: state => state.diseaseEntry.loading
    })
  },
  methods: {
    ...mapMutations({
      SETPAGELIST: 'diseaseEntry/SETPAGELIST'
    }),
    onCurrentChange (val) {
      this.SETPAGELIST({ currentPage: val })
    },
    onPushDetail (item) {
      this.$emit('onPushDetail', item)
    }
  }
}
</script>

<style lang="scss" scoped>
$theme-clor:#2b86b2;
$font-clor:rgb(30, 38, 50);
.h-list-wrap {
  padding: 0 20px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  .detail-span {
    color: #409EFF;
    cursor: pointer;
  }
  .table-top-wrap {
      display: flex;
      align-items: center;
      padding: 10px;
      font-weight: 900;
      border-bottom: 1px solid #ddd;
      justify-content: space-between;
      span {
        font-weight: 600;
        font-size: 14px;
      }
      .table-right-wrap {
          display: flex;
          align-items: center;
          .dropdowm-wrap {
              min-width: 140px;
              text-align: center;
          }
          .add-wrap {
              min-width: 100px;
              padding-right: 30px;
              button {
                background-color: $theme-clor;
                border-color: $theme-clor;
              }
          }
      }
  }
  .pagination-wrap {
    text-align: right;
    height: 80px;
    display: flex;
    align-items: center;
    /deep/ .el-pagination.is-background .el-pager li:not(.disabled).active {
      background-color: $theme-clor;
    }
    /deep/ .el-pager li:hover{
      color: $theme-clor;
    }
    /deep/ .el-pagination.is-background .el-pager li:not(.disabled).active:hover{
      color: #fff;
    }
  }
  .table-ctn-wrap {
    flex: 1;
    overflow-y: scroll;
  }

}
</style>
