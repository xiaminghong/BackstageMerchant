export default {
  data () {
    return {
      rolesList: [],
      isShowEditDialog: false,
      EdmiRole: {
        roleName: '',
        roleDesc: '',
        id: -1
      }
    }
  },
  created () {
    this.getRolesList()
  },
  methods: {
    async getRolesList () {
      const res = await this.$http.get('/roles')
      console.log(res)
      this.rolesList = res.data.data
    },
    async isShowRoleList () {
      try {
        await this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        this.$message({
          type: 'error ',
          message: '该项暂不支持删除!'
        })
      } catch (err) {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      }
    },
    async isShowEditRoleList (scope) {
      this.isShowEditDialog = true
      console.log(scope)
      for (var key in this.EdmiRole) {
        this.EdmiRole[key] = scope[key]
      }
      // const res = await this.$http.put('roles/:id')
      // console.log(res)
    },
    async RoleEditDialog () {
      try {
        // await this.$refs.isEditEmpty.validate()
        const {roleName, roleDesc} = this.EdmiRole
        const res = await this.$http.put(`roles/${this.EdmiRole.id}`, {
          roleName,
          roleDesc
        })
        this.isShowEditDialog = false
        this.getRolesList()
        this.$message({
          type: 'success',
          message: res.data.meta.msg
        })
        console.log(res)
      } catch (err) {}
    }
  }
}
