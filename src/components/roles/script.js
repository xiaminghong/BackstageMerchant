export default {
  data () {
    return {
      // 渲染树状列表
      rightsTree: [],
      defaultProps: {
        // children: 'children',
        label: 'authName'
      },
      // 角色授权列表
      rolesList: [],
      isShowEditDialog: false,
      EdmiRole: {
        roleName: '',
        roleDesc: '',
        id: -1
      },
      isShowRoleDialog: false,
      // 角色授权id
      roleId: -1
    }
  },
  created () {
    // 拿到角色列表
    this.getRolesList()
    // 渲染树状
    this.getRightsTree()
  },
  methods: {
    async getRolesList () {
      const res = await this.$http.get('/roles')
      // console.log(res)
      this.rolesList = res.data.data
    },
    async isShowRoleList () {
      try {
        // 是否删除角色
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
    // 编辑（更新）角色
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
    },
    // 分配对话框显示
    async getRightsTree (scope) {
      const res = await this.$http.get('rights/tree')
      // console.log(res)
      this.rightsTree = res.data.data
    },
    // 显示角色对话框
    async showRoleDialog (scope) {
      // 将当前点击的角色id赋值给data（）里面 下一步aioxs好使用
      this.roleId = scope.id
      // console.log(scope.id)
      this.isShowRoleDialog = true
      // $nextTick() 获取到更新后的DOM内容
      this.$nextTick(() => {
        const checkedKeys = []
        // 遍历一节节点
        scope.children.forEach(level1 => {
          // 遍历二节节点
          level1.children.forEach(level2 => {
            // 遍历三节节点
            level2.children.forEach(level3 => {
              // console.log(level3.id)
              // 将最后一节节点的id添加到checkedKeys数组里
              checkedKeys.push(level3.id)
            })
          })
        })
        // 默认选中
        this.$refs.tree.setCheckedKeys(checkedKeys)
      })
    },
    async assignRights () {
      console.log(1)
      // console.log('获取选中节点：', this.$refs.tree.getCheckedKeys())
      // console.log('获取半选中节点：', this.$refs.tree.getHalfCheckedKeys())
      const getCheckedKeys = this.$refs.tree.getCheckedKeys()
      const getHalfCheckedKeys = this.$refs.tree.getHalfCheckedKeys()
      const allkeys = [...getCheckedKeys, ...getHalfCheckedKeys]
      console.log(allkeys)
      const res = await this.$http.post(`roles/${this.roleId}/rights`, {
        rids: allkeys.join(',')
      })
      // console.log(res)
      this.isShowRoleDialog = false
      this.getRolesList()
      this.$message({
        type: 'success',
        message: res.data.meta.msg
      })
    }
  }
}
