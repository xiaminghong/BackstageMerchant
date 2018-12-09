<template>
 <el-container class="home">
  <el-header class="header">
    <el-row type="flex" class="row-bg" justify="space-around">
  <el-col :span="5">
    <img src="@/assets/images/logo.png" alt="">
  </el-col>
  <el-col :span="12">
    <h3>电商后台管理系统</h3>
  </el-col>
  <el-col :span="7">
    <div class="out">
      <span>欢迎上海前端28期星曜会员</span>
       <el-button type="text" @click="open7">
         <a href="javascript:;">退出</a>
       </el-button>
         <!-- <el-button type="text" @click="open6"><a href="javascript:;">退出</a></el-button> -->
    </div>
  </el-col>
</el-row>
  </el-header>
  <el-container>
    <el-aside width="200px" class="left">
      <!-- 左侧导航 -->
      <el-menu
        :router='true'
        default-active="2"
        class="el-menu-vertical-demo"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b">
        <!-- 用户管理 -->
        <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>用户管理</span>
          </template>
          <el-menu-item index="/users">
            <i class="el-icon-menu"></i>
            <span slot="title">用户列表</span>
          </el-menu-item>
        </el-submenu>
        <!-- 权限管理 -->
        <el-submenu index="2">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>权限管理</span>
          </template>
          <el-menu-item index="/roles">
            <i class="el-icon-menu"></i>
            <span slot="title">角色列表</span>
          </el-menu-item>
          <el-menu-item index="/rights">
            <i class="el-icon-menu"></i>
            <span slot="title">权限列表</span>
          </el-menu-item>
        </el-submenu>
        <!-- 商品管理 -->
        <el-submenu index="3">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>商品管理</span>
          </template>
          <el-menu-item index="/goods">
            <i class="el-icon-menu"></i>
            <span slot="title">商品列表</span>
          </el-menu-item>
          <el-menu-item index="/params">
            <i class="el-icon-menu"></i>
            <span slot="title"> 分类参数</span>
          </el-menu-item>
          <el-menu-item index="/categories">
            <i class="el-icon-menu"></i>
            <span slot="title">商品分类</span>
          </el-menu-item>
        </el-submenu>
        <!-- 订单管理 -->
        <el-submenu index="4">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>订单管理</span>
          </template>
          <el-menu-item index="1-7">
            <i class="el-icon-menu"></i>
            <span slot="title">订单列表</span>
          </el-menu-item>
        </el-submenu>
        <!-- 数据统计 -->
        <el-submenu index="5">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>数据统计</span>
          </template>
          <el-menu-item index="1-8">
            <i class="el-icon-menu"></i>
            <span slot="title">数据报表</span>
          </el-menu-item>
        </el-submenu>
      </el-menu>
    </el-aside>

    <el-main class="right">
     <router-view></router-view>
    </el-main>
  </el-container>
</el-container>
</template>

<script>
export default {

  methods: {
    open7 () {
      this.$confirm('您确定退出吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: false
      })
        .then(() => {
          this.$message({
            type: 'success',
            message: '退出成功!'
          })
          localStorage.removeItem('token')
          this.$router.push('/login')
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消退出'
          })
        })
    }
  }
}
</script>

<style>
.home {
  height: 100%;
}
.header {
  padding-left: 0;
  background-color: #b3c1cd;
}
.header img {
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
.header .out {
  text-align: right;
  height: 60px;
  line-height: 60px;
  font-weight: bold;
}
.header .out a {
  color: orange;
}
.left {
  background-color: #545c64;
}
.right {
  background-color: #eaeef1;
}
</style>
