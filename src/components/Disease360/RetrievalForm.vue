<template>
  <div class="re-form-wrap">
    <div class="seatch-filter-sub-wrap">
      <!-- <el-form ref="form" :model="form" label-width="100px" :inline="true" >
        <p class="search-title">关键词搜索</p>
        <el-form-item label="">
          <el-input v-model="form.name" clearable ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">立即搜索</el-button>
        </el-form-item>
      </el-form> -->
      <div class="gj-search-wrap">
        <!-- <p class="search-title">高级搜索</p> -->
        <div class="seatch-filter-wrap">
          <p v-for = '(item, index) in filtersData' :key="index">{{item}}</p>
        </div>
        <div class="seatch-filter-wrap seatch-filter-content-wrap" style="padding-bottom:10px" v-for="(fliter, index) in searchFilters" :key="index">
          <div class="seatch-filter-sub-wrap">
            <div style="min-width:100px">
              <el-select v-model="fliter.relation"  placeholder="或者" style="width:90px"
                size = 'small' v-if = 'index'>
                <el-option
                  v-for="item in relationFilter"
                  :key="item"
                  :label="item"
                  :value="item">
                </el-option>
              </el-select>
            </div>
            <el-input
              style="width:130px;"
              placeholder="搜索项"
              size = 'small'
              @focus="ONSHOWTOAST({parentIndex:index,childIndex:null,isParent:true,isSearch:true})"
              suffix-icon="el-icon-plus"
              v-model="fliter.theme">
            </el-input>
            <el-select v-model="fliter.condition"  placeholder="关系" style="width:130px"
                size = 'small'
                :disabled = '!fliter.theme'
                >
              <el-option
                v-for="item in relaOptions"
                :key="item"
                :label="item"
                :value="item">
              </el-option>
            </el-select>
            <el-select v-model="fliter.range"  placeholder="请选择" style="width:130px"
                size = 'small'
                :disabled="!fliter.condition"
                >
              <el-option
                v-for="item in range"
                :key="item"
                :label="item"
                :value="item">
              </el-option>
            </el-select>
            <div style="padding-left: 20px"><el-button type="primary" size="mini" icon="el-icon-s-data" @click="ONADDChILDFILTER(index)"></el-button></div>
            <div style="padding-left: 20px"><el-button type="success" size="mini" icon="el-icon-plus" @click="ONADDFLITER"></el-button></div>
            <div v-if="index" style="padding-left: 20px"><el-button type="info" size="mini" icon="el-icon-close" @click="ONDELFLITER(index)"></el-button></div>

          </div>
          <div class="seatch-filter-sub-child-wrap" v-for="(child, idx) in fliter.children" :key="idx">
              <div class="input-line-wrap">
                <span></span>
                <el-input
                  class="child-input"
                  style="width:130px;margin-left:0px;"
                  placeholder="搜索项"
                  size = 'small'
                  @focus="ONSHOWTOAST({parentIndex:index,childIndex:idx,isParent:false,isSearch:true})"
                  suffix-icon="el-icon-plus"
                  v-model="child.theme">
                </el-input>
              </div>
              <el-select v-model="child.condition"  placeholder="关系" style="width:130px"
                  size = 'small'
                  :disabled="!child.theme"
                  >
                <el-option
                  v-for="item in relaOptions"
                  :key="item"
                  :label="item"
                  :value="item">
                </el-option>
              </el-select>
              <el-select v-model="child.range"  placeholder="请选择" style="width:130px"
                  size = 'small'
                  :disabled="!child.condition"
                  >
                <el-option
                  v-for="item in range"
                  :key="item"
                  :label="item"
                  :value="item">
                </el-option>
              </el-select>
              <div style="padding-left: 20px"><el-button type="info" size="mini" icon="el-icon-close" @click="ONDELCHILDFLITER({index,idx})"></el-button></div>
          </div>
        </div>
        <div class='gj-search-btn'>
          <el-button type="primary" @click="onSubmit" size="mini">立即搜索</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  props: {
    form: {
      type: Object
    },
    filtersData: {
      type: Array
    },
    searchFilters: {
      type: Array
    },
    relaOptions: {
      type: Array
    },
    relationFilter: {
      type: Array
    },
    range: {
      type: Array
    },
    searchDialogForm: {
      type: Object
    }
  },
  methods: {
    ...mapMutations(
      {
        ONSHOWTOAST: 'disease360/ONSHOWTOAST',
        ONADDFLITER: 'disease360/ONADDFLITER',
        ONADDChILDFILTER: 'disease360/ONADDChILDFILTER',
        ONDELFLITER: 'disease360/ONDELFLITER',
        ONDELCHILDFLITER: 'disease360/ONDELCHILDFLITER'
      }
    ),
    onSubmit () {
      this.$emit('onSubmit')
    }
  }

}
</script>

<style lang="scss" scoped>
.re-form-wrap {
  padding-top: 10px;
  width: 100%;
  position: relative;
  .search-title {
      padding: 20px 0;
      font-size: 16px;
      font-weight: 700;
      padding-top: 0px;
    }
  .gj-search-wrap {
     /deep/ .el-form-item {
        width: 30%;
      }
      /deep/ .el-form-item__content {
        width: 100%;
      }
      .seatch-filter-wrap {
        display: flex;
        p {
          width: 150px;
          height: 30px;
          font-size: 14px;
          flex-wrap: 700;
          &:first-of-type {
            width: 100px;
          }
        }
        /deep/ .el-select{
          margin-left: 20px;
          &:first-of-type {
            margin-left: 0;
          }
        }
      }
      .gj-search-btn {
        width: 100%;
        display: flex;
        justify-content: center;
        padding-top: 20px;
      }
      .seatch-filter-content-wrap {
        flex-direction: column;
        padding-top: 10px;
      }
      .seatch-filter-sub-wrap {
        display: flex;
        position: relative;
        z-index: 2;
      }
      .seatch-filter-sub-child-wrap {
        display: flex;
        width: 100%;
        padding-left: 160px;
        padding-top: 20px;
        position: relative;
        .input-line-wrap {
          position: relative;
          &::before {
            content: '';
            position: absolute;
            left: -20px;
            top: -36px;
            width: 1px;
            height: 53px;
            background-color: #409EFF;
          }
        }
        .child-input {
          position: relative;
          &::before {
            content: '';
            position: absolute;
            left: -20px;
            top: 50%;
            width: 20px;
            height: 1px;
            background-color: #409EFF;
          }
        }
      }
    }
  .search-wrap {
      min-height: 40px;
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 10px 20px;
      border-bottom: 1px solid #fff;
      box-sizing: border-box;
      i ,span{
        font-size: 18px;
        font-weight: 900;
      }
    }
}
</style>
