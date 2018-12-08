<template>
 <div>
   <!-- 面包屑导航 -->
  <el-breadcrumb class="crumbs" separator-class="el-icon-arrow-right" >
      <el-breadcrumb-item :to="{ path: '/Home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>权限列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-table
    :data="rightsList"
    style="width: 100%">
    <el-table-column
      type="index"
      :index="indexMethod">
    </el-table-column>
    <el-table-column
      prop="authName"
      label="权限名称"
      width="180">
    </el-table-column>
    <el-table-column
      prop="path"
      label="路径"
      width="180">
    </el-table-column>
    <el-table-column
      prop="level"
      label="层级">
      <template slot-scope="scope">
        <span v-if="scope.row.level === '0'">一级</span>
        <span v-else-if="scope.row.level === '1'">二级</span>
        <span v-else>三级</span>
      </template>
    </el-table-column>
  </el-table>
 </div>
</template>
<script>
// import axios from 'axios'
export default {
  data () {
    return {
      rightsList: []
    }
  },
  created () {
    this.getRights()
  },
  methods: {
    async getRights () {
      const res = await this.$http.get('rights/list')
      console.log(res)
      this.rightsList = res.data.data
    },
    indexMethod (index) {
      return index
    }
  }
}
</script>

<style scoped>
.crumbs {
  height: 50px;
  line-height: 50px;
  background: #d4dae0;
  font-size: 16px;
  padding-left: 10px;
}
</style>
