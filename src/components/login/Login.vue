<template>
 
<el-row class="login" type="flex" justify='center' align='middle'>
  <el-col :xs="14" :sm="12" :md="10" :lg="8" :xl="6">
     <el-form :model="ruleForm" label-position='top' :rules="rules" ref="ruleForm" label-width="100px" class="login-form">
  <el-form-item  label="用户名：" prop="username">
    <el-input v-model="ruleForm.username"></el-input>
  </el-form-item>
  <el-form-item label="密码：" prop="password">
    <el-input type="password" v-model="ruleForm.password"></el-input>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
    <el-button @click="resetForm('ruleForm')">重置</el-button>
  </el-form-item>
</el-form>
  </el-col>
</el-row>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      ruleForm: {
        username: "admin",
        password: "123456"
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          {
            min: 3,
            max: 5,
            message: "用户名长度在 3 到 5 个字符",
            trigger: "blur"
          }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, max: 12, message: "密码长度在 6 -- 12位", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        // if (valid) {
        //   alert('submit!');
        // } else {
        //   console.log('error submit!!');
        //   return false;
        // }
        // console.log(this.ruleForm);

        if (!valid) {
          return;
        }
        axios
          .post("http://localhost:8888/api/private/v1/login", this.ruleForm)
          .then(res => {
            console.log(res);
            if (res.data.meta.status == 200) {
              console.log(res.data);
              // 添加本地令牌
              localStorage.setItem("token", res.data.data.token);
              this.$router.push("home");
              this.$message({
                message: res.data.meta.msg,
                type: "success",
                duration: "800"
              });
            } else {
              this.$message({
                message: res.data.meta.msg,
                type: "error",
                duration: "1000"
              });
            }
          });
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>

<style>
.login{
  height: 100%;
  background-color: #2D434C;
}
.login-form{
  background-color: #fff;
  padding: 25px;
  border-radius: 15px;
}
</style>