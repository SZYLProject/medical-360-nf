<template>
  <el-form ref="searchDialogForm" :model="searchDialogForm" label-width="80px">
    <el-form-item label="临床分期">
      <el-radio-group v-model="searchDialogForm.theme">
        <el-radio label="TNM"></el-radio>
        <el-radio label="转移"></el-radio>
        <el-radio label="BP"></el-radio>
        <el-radio label="HR"></el-radio>
        <el-radio label="T"></el-radio>
        <el-radio label="P"></el-radio>
      </el-radio-group>
    </el-form-item>
    <el-button type="success" @click="ONADDSEARCHITEM('search')">确定</el-button>
  </el-form>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

export default {
  computed: {
    ...mapState({
      searchDialogForm: state => state.disease360.searchDialogForm
    })
  },
  methods: {
    ...mapMutations({
      ONADDSEARCHITEM: 'disease360/ONADDSEARCHITEM'
    })
  }
}
</script>

<style lang="scss" scoped>

</style>
