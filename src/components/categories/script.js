import ElTreeGrid from 'element-tree-grid'
// Vue.component(ElTreeGrid.name,ElTreeGrid)
export default {
  components: {
    // 'el-table-tree-column': ElTreeGrid

    // 属性名表达式
    // 计算表达式 ElTreeGrid.name 的值，再作为对象的键，作用与上面的语法相同
    [ElTreeGrid.name]: ElTreeGrid
  },
  data () {
    return {
      cateList: [],
      total: 0,
      pagenum: 1,
      isShowCateDialog: false,
      cateForm: {
        cat_name: '',
        cat_pid_arr: []
      },
      // 联级选择器
      cateAddList: []
      // cateAddList: [{
      //   value: 'zhinan',
      //   label: '指南',
      //   children: [{
      //     value: 'shejiyuanze',
      //     label: '设计原则'
      //    },
      //   {
      //     value: 'jiaohu',
      //     label: '组件交互文档'
      //   }]
      // },
    // ]
    }
  },
  created () {
    // 渲染商品列表
    this.getCategoriesList()
    // 渲染添加分类列表
    this.getCateAddList()
  },
  methods: {
    // 渲染商品列表
    async getCategoriesList (pagenum = 1) {
      const res = await this.$http.get('categories', {
        params: {
          type: 3,
          pagenum,
          pagesize: 5
        }
      })
      // console.log(res)
      // Es6提取res.data.data里面的属性
      const { result, total, pagenum: curPage } = res.data.data
      this.cateList = result
      this.total = total
      this.pagenum = curPage + 1
    },
    // 分页点击
    changePage (curPage) {
      this.getCategoriesList(curPage)
    },
    isShowAddDialog () {
      this.isShowCateDialog = true
    },
    async getCateAddList () {
      const res = await this.$http.get('categories', {
        params: {
          type: 2
        }
      })
      this.cateAddList = res.data.data
      // console.log(res)
    },
    async addCate () {
      // cat_id分类 ID
      // cat_name分类名称
      // cat_pid分类父 ID
      // cat_level分类当前层级
      // console.log(this.cateForm)
      /* eslint-disable camelcase */
      const {cat_name, cat_pid_arr} = this.cateForm
      // console.log(cat_name)
      // console.log(cat_pid_arr)
      // console.log(cat_pid_arr[cat_pid_arr.length - 1])
      // 添加分类
      const res = await this.$http.post('categories', {
        cat_name,
        cat_pid: cat_pid_arr[cat_pid_arr.length - 1],
        cat_level: cat_pid_arr.length
      })
      // console.log(res)
      // 关闭对话框
      this.isShowCateDialog = false
      // 刷新数据
      this.getCategoriesList()
      // 提示成功
      this.$message({
        type: 'success',
        message: res.data.meta.msg
      })
    }
  }
}
