import axios from 'axios'

export default {
  data () {
    return {
      // 用户列表数据
      usersList: [],
      total: 0,
      pageSize: 3,
      pagenum: 1,
      // 查询条件
      searchText: '',
      isShowUserAddDialog: false,
      userAddForm: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
      userAddRules: {
        username: [
          {
            required: true,
            message: '请输入用户名',
            trigger: 'blur'
          },
          {
            min: 3,
            max: 5,
            message: '长度在 3 到 5 个字符',
            trigger: 'blur'
          }
        ],
        password: [
          {
            required: true,
            message: '请输入密码',
            trigger: 'blur'
          },
          {
            min: 6,
            max: 12,
            message: '密码长度为6-12个字符',
            trigger: 'blur'
          }
        ],
        email: [{
          /* eslint-disable no-useless-escape */
          pattern: /^([0-9A-Za-z\-_\.]+)@([0-9a-z]+\.[a-z]{2,3}(\.[a-z]{2})?)$/,
          message: '邮箱格式不正确',
          trigger: 'blur'
        }],
        mobile: [{
          pattern: /^1[3|4|5|8]\d{9}$/,
          message: '手机格式不正确',
          trigger: 'blur'
        }]
      },
      // 编辑框是否显示
      isShowUserEditDialog: false,
      userEditForm: {
        username: '',
        email: '',
        mobile: '',
        id: -1
      },
      // 分配角色框是否显示
      isShowUserRoleDialog: false,
      userRoleForm: {
        username: '',
        rid: '',
        id: -1
      },
      // 所有角色列表数据
      rolesList: []
    } // return
  },
  created () {
    // 渲染用户列表
    this.getUsersList()
    this.getRoleList()
  },
  methods: {
    // 获取用户列表数据
    async getUsersList (pagenum = 1, query = '') {
      const url = ('/users')
      const config = {
        params: {
          query,
          pagenum,
          pagesize: 3
        }
        // main.js设置了判断token可以省略
        // ,
        // // 添加请求头，判断是否有token
        // headers: {
        //   Authorization: localStorage.getItem('token')
        // }
      }
      const res = await axios.get(url, config)
      // console.log(res)
      // 判断状态码是否等于200
      if (res.data.meta.status === 200) {
        this.usersList = res.data.data.users
        this.total = res.data.data.total
        this.pagenum = res.data.data.pagenum
      } else {
        // 判断状态码不等于200，移除token，返回登录页
        localStorage.removeItem('token')
        this.$router.push('/login')
      }
    },
    // 页码改变时，获取该页数据
    changePage (curPage) {
      // console.log(curPage)
      // console.log(this.searchText)
      this.getUsersList(curPage, this.searchText)
    },
    // 查询数据
    search () {
      console.log(this.searchText)
      this.getUsersList(1, this.searchText)
    },
    // Switch 开关
    async changeUserState (scope) {
      // console.log(scope)
      const res = await axios.put(`/users/${scope.id}/state/${scope.mg_state}`)
      console.log(res)
      this.getUsersList(1, this.searchText)
    },
    async delUser (id) {
      // console.log(id)
      try {
        await this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        const res = axios.delete(`users/${id}`)
        // console.log(res)
        this.getUsersList(1, this.searchText)
        this.$message({
          type: 'success',
          message: res.data.meta.msg
        })
      } catch (err) {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      }
    },
    showUserAddDialog () {
      // console.log(1111)
      this.isShowUserAddDialog = true
    },
    async addUser () {
      // await this.$refs.userAddFormRef.validate()
      try {
        await this.$refs.userAddFormRef.validate()
        console.log(22222)
        const res = await axios.post('/users', this.userAddForm)
        if (res.data.meta.status === 201) {
          // 添加成功
          // 1 关闭对话框
          this.getUsersList(1, this.searchText)
          // 2 刷新列表数据
          this.isShowUserAddDialog = false
          // 3 提示
          this.$message({
            type: 'success',
            message: res.data.meta.msg
          })
          // console.log(res)
        }
      } catch (err) {}
    },
    closeUserAddDialog () {
      this.$refs.userAddFormRef.resetFields()
      // this.$refs.userAddFormRef.resetFields()
    },
    // 显示编辑对话框
    isShowEdit (scope) {
      this.isShowUserEditDialog = true
      // console.log(scope)
      // this.userEditForm.username = scope.username
      // this.userEditForm.email = scope.email
      // this.userEditForm.mobile = scope.mobile
      for (var key in this.userEditForm) {
        this.userEditForm[key] = scope[key]
      }
    },
    // 编辑对话框
    async editUser () {
      // console.log(this.userEditForm.id)

      const {email, mobile} = this.userEditForm
      const res = await axios.put(`/users/${this.userEditForm.id}`, {
        email,
        mobile
      })
      this.isShowUserEditDialog = false
      this.getUsersList(1, this.searchText)
      this.$message({
        type: 'success',
        message: res.data.meta.msg
      })
    },
    // 分配角色
    async showUserRole (scope) {
      this.isShowUserRoleDialog = true
      const res = await this.$http.get(`users/${scope.id}`)
      this.userRoleForm.rid = res.data.data.rid === -1 ? '' : res.data.data.rid
      console.log(res)
      this.userRoleForm = res.data.data
    },
    async getRoleList () {
      const res = await this.$http.get('/roles')
      this.rolesList = res.data.data
      // console.log(this.rolesList)
    },
    async assignRole () {
      // console.log(11)
      const {id, rid} = this.userRoleForm
      const res = await this.$http.put(`users/${id}/role`, {
        rid
      })
      console.log(res)
      this.isShowUserRoleDialog = false
      this.getUsersList()
      this.$message({
        type: 'success',
        message: res.data.meta.msg
      })
    }
  } // 方法 methods
}
