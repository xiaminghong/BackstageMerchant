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
       <el-button type="text" @click="logout">
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
        :unique-opened='true'
        :default-active="$route.path.slice(1)"
        class="el-menu-vertical-demo"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b">
        <!-- 用户管理 -->
        <el-submenu :index="level1.id + ''" v-for="level1 in menus" :key="level1.id">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>{{level1.authName}}</span>
          </template>
          <!-- 二级菜单 -->
          <el-menu-item :index="level2.path" v-for='level2 in level1.children' :key="level2.id">
            <i class="el-icon-menu"></i>
            <span slot="title">{{level2.authName}}</span>
          </el-menu-item>
        </el-submenu>
        <!-- 权限管理 -->
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
  created () {
    this.getMenus()
  },
  data () {
    return {
      menus: []
    }
  },
  methods: {
    logout () {
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
    },
    async getMenus () {
      const res = await this.$http.get('menus')
      console.log(res)
      this.menus = res.data.data
      console.log(this.menus)
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
