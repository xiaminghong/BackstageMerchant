<template>
 <el-container class="home">
  <el-header class="header">
    <el-row type="flex" class="row-bg" justify="space-around">
  <el-col :span="6">
    <img src="@/assets/images/logo.png" alt="">
  </el-col>
  <el-col :span="12">
    <h3>电商后台管理系统</h3>
  </el-col>
  <el-col :span="6">
    <div class="out">
      <span>欢迎上海前端28期星曜会员</span>
      <a href="javascript:;">退出</a>
    </div>
  </el-col>
</el-row>
  </el-header>
  <el-container>
    <el-aside width="200px" class="left">Aside</el-aside>
    <el-main class="right">Main</el-main>
  </el-container>
</el-container>
</template>

<script>
export default {};
</script>

<style>
.home {
  height: 100%;
}
.header {
  padding-left: 0;
  background-color: #b3c1cd;
}
.header img{
  width: 200px;
}
.header h3 {
  text-align: center;
  color: #fff;
  font-weight: bold;
  font-size: 28px;
  height: 60px;
  line-height: 60px;
}
.header .out{
  text-align: right;
  height: 60px;
  line-height: 60px;
  font-weight: bold;
}
.header .out a{
  color: orange;
}
.left {
  background-color: #545c64;
}
.right {
  background-color: #eaeef1;
}
</style>
