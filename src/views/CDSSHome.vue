<template>
  <div class="cdss-h-wrap" v-loading="$store.state.disease360.diseaseInfoSelectData.fullscreenLoading" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading" element-loading-color = '#fff' element-loading-background="rgba(0, 0, 0, 0.3)">
    <div class="fir-toast-wrap">
      <RecommendedTreatment @onClickChild ='onClickChild'></RecommendedTreatment>
      <el-dialog :title="dialogTitle" :visible="$store.state.disease360.dialogShow" v-on:update:visible="$emit('update:visible ',false)"   :fullscreen= 'true' :class="{height100:currentComponent==='Literature'}" @close = 'CLOSEDIALOG'>
        <el-tabs v-model="$store.state.disease360.activeName" @tab-click="handleClick" v-if = "currentComponent === 'EditDieaseMessage'">
          <el-tab-pane :label="tab.disease_info_title" :name="''+index" v-for="(tab, index) in this.$store.state.disease360.diseaseInfoSelectData.diseaseInfoModel" :key="tab.id">
            <EditDieaseMessage :submitLoading = 'submitLoading'></EditDieaseMessage>
          </el-tab-pane>
        </el-tabs>
        <CDSSChart v-else-if = "currentComponent === 'CDSSChart'"></CDSSChart>
        <Literature v-else-if = "currentComponent === 'Literature'"></Literature>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import RecommendedTreatment from '@/components/CDSS/RecommendedTreatment'
import EditDieaseMessage from '@/components/CDSS/EditDieaseMessage'
import CDSSChart from '@/components/CDSS/CDSSChart'
import Literature from '@/components/CDSS/Literature'

import { mapMutations } from 'vuex'
export default {
  components: {
    RecommendedTreatment,
    EditDieaseMessage,
    CDSSChart,
    Literature
  },
  data () {
    return {
      currentComponent: '',
      dialogTitle: '',
      submitLoading: false
    }
  },
  watch: {
    '$store.state.disease360.dialogShow' (n, o) {
      if (!n) {
        window.parent.postMessage({ data: '30' }, '*')
      } else {
        window.parent.postMessage({ data: this.currentComponent }, '*')
      }
    }
  },
  created () {
    this.$store.dispatch('disease360/apiGetDiseaseInfoSelectHCForm', {})
  },
  methods: {
    ...mapMutations({
      ONSHOWTOAST: 'disease360/ONSHOWTOAST',
      CLOSEDIALOG: 'disease360/CLOSEDIALOG'
    }),
    handleClick (v) {
      this.ONSHOWTOAST({ parentIndex: 1, childIndex: v.index, isParent: false, isSearch: false })
    },
    close () {
      this.CLOSEDIALOG()
    },
    onClickChild (v) {
      this.dialogShow = true
      switch (v) {
        case 'edit':
          this.dialogTitle = '编辑患者信息'
          this.currentComponent = 'EditDieaseMessage'
          break
        case 'same':
          this.dialogTitle = '相似病例'
          this.currentComponent = 'CDSSChart'
          break
        case 'literature':
          this.dialogTitle = '文献检索'
          this.currentComponent = 'Literature'
          break
        default:
          break
      }
    }

  }
}
</script>

<style lang="scss" scoped>
.cdss-h-wrap {
  height: 100%;
  position: relative;
  background: #fff;
  .fir-toast-wrap {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
    box-shadow: 0 4px 12px 0 #ccc;
    // width: 30%;
    // height: 80%;
    border-radius: 4px;
    .height100 {
      /deep/ .el-dialog{
        height: 100%;
      }
    }
  }
  /deep/ .el-dialog__body{
    padding: 10px 30px;
  }
  /deep/ .el-loading-spinner {
    p ,i{
    color: #23354b;
    font-size: 14px;
    }
}
}
</style>
